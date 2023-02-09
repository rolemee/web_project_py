from fastapi import Depends, APIRouter, Form
from dependencies import *
from models import pgsql, mlsearch
from fastapi import File, UploadFile
from typing import List
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.responses import HTMLResponse
import hashlib
from flask import Flask
# smtplib 用于邮件的发信动作
import smtplib
# email 用于构建邮件内容
from email.mime.text import MIMEText
# 构建邮件头
import ssl
import random
from email.message import EmailMessage
import traceback,os
router = APIRouter()
class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []
        self.active_connections_dict: dict = {}
    async def connect(self, websocket: WebSocket,userId:str='jrm'):
        await websocket.accept()
        self.active_connections.append(websocket)
        self.active_connections_dict[userId] = websocket
    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def send_personal_message(self, message: str, websocket: WebSocket):
        await websocket.send_text(message)

    async def broadcast(self, message: str):
        for connection in self.active_connections:
            await connection.send_text(message)
            

manager = ConnectionManager()
@router.post('/api/register', response_model=Response)
async def register(userId=Form(),username=Form(),password=Form()): 
    if len(await pgsql.check_register(userId)) !=0:
        return {'code':401,'message':'当前用户Id已存在','data':{}}
    try:
        await pgsql.register(userId,username,password)
        return {'code':200,'message':'注册成功','data':{'userId':userId, 'username':username}}
    except:
        traceback.print_exc()
        return {'code':500,'message':'未知错误！','data':{}}
@router.post('/api/login', response_model=Response)
async def login(userId=Form(),password=Form()):
    res =await pgsql.login(userId)
    if len(res) == 0:
        return {'code':401,'message':'当前用户或密码错误','data':{}}
    password_hashed = res[0].get('password')
    rights = res[0].get('rights')
    if not await verify_password(password, password_hashed):
        return {'code':401,'message':'当前用户或密码错误','data':{}}
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"userId": userId, "rights":rights}, expires_delta=access_token_expires
    )
    return {'code':200,'message':'登陆成功','data':{'token':access_token}}

@router.get('/api/selfinfo',response_model=Response)
async def self_info(user:User=Depends(get_current_active_user)):
    userId = user.get('userId')
    return {'code':200,'message':'获取成功','data':{'info': (await pgsql.self_info(userId))[0]}}
@router.get('/api/getuserinfo',response_model=Response)
async def getUserInfo(user:User = Depends(get_current_active_user),sort:str='starquiz'):
    sort_list = ['starquiz','quiz','answer']
    if sort not in sort_list:
        raise ErrorOwn("请正确输入",408)
    userId = user.get('userId')
    if sort == 'starquiz':
        quiz_list = await pgsql.star_quiz(userId=userId)
    elif sort == 'quiz':
        quiz_list = await pgsql.user_quiz(userId=userId)
    elif sort == 'answer':
        quiz_list = await pgsql.user_answer(userId=userId)
    return {'code':200,'message':'查询成功','data':{'quiz_list':quiz_list}}

@router.get('/api/like',response_model=Response)
async def like(qid:int=0, aid:int =0,user:User=Depends(get_current_active_user)):
    if qid == 0 and aid == 0:
            return {'code':400,'message':'参数缺失','data':{}}
    return await pgsql.like(qid,aid,user.get('userId'))

@router.get('/api/star', response_model=Response)
async def star(qid:int = 0 ,user:User=Depends(get_current_active_user)):
    if qid == 0:
        raise ErrorOwn("参数缺失",400)
    return await pgsql.star(qid,user.get('userId'))

@router.get('/api/removelike',response_model=Response)
async def remove_like(qid:int=0, aid:int =0,user:User =Depends(get_current_active_user)):
    if qid == 0 and aid == 0:
        return {'code':400,'message':'参数缺失','data':{}}
    return await pgsql.remove_like(qid,aid,user.get('userId'))

@router.get('/api/removestar', response_model=Response)
async def remove_str(qid:int=0,user:User=Depends(get_current_active_user)):
    if qid == 0:
        raise ErrorOwn('参数缺失',400)
    return await pgsql.remove_star(qid,user.get('userId'))

@router.post('/api/postquiz',response_model=Response)
async def post_question(user:User =Depends(get_current_active_user),title:str=Form(),content:str=Form(),keywords:str=Form()):
    try:
        qid = await pgsql.post_quiz(user.get('userId'),title,content,keywords.split(','))
        await mlsearch.insert(qid,title,keywords.split(','))
        return {'code':200,'message':'发表问题成功','data':{"qid":qid}}
    except:
        return {'code':500,'message':'服务器错误','data':{}}

@router.post('/api/delquiz',response_model=Response)
async def del_quiz(user:User =Depends(get_current_active_user),qid:int=Form()):
    try:
        userId = await pgsql.check_user(qid)
        if user.get('userId') != userId:
            return {'code':400,'message':'请勿违规操作','data':{}}
        await pgsql.del_quiz(qid)
        await mlsearch.delete(qid)
        return {'code':200,'message':'删除成功','data':{}}
    except:
        return {'code':500,'message':'服务器错误','data':{}}

@router.post('/api/postanswer',response_model=Response)
async def post_answer(user:User =Depends(get_current_active_user),content:str=Form(),qid:int=Form()):
    try:
        aid = await pgsql.post_answer(user.get('userId'),content,qid)
        star_list,title,userId = await pgsql.get_star_id(qid)
    except:
        traceback.print_exc()
        return {'code':500,'message':'服务器错误','data':{}}
    try:
        for i in star_list:
            if i in manager.active_connections_dict and i != user.get('userId'):
                await manager.active_connections_dict[i].send_text("您关注的问题:“"+title+"“有新的回答了，快去看看吧。")
        if userId in manager.active_connections_dict and user.get('userId') != userId:
            await manager.active_connections_dict[userId].send_text("您发表的问题:“"+title+"“有新的回答了，快去看看吧。")
    except:
        pass
    return {'code':200,'message':'发表回答成功','data':{"aid":aid}}
    
@router.post('/api/delanswer',response_model=Response)
async def del_answer(user:User =Depends(get_current_active_user),aid:int=Form()):
    try:
        userId = await pgsql.check_user(aid,'answer','id')
        if user.get('userId') != userId:
            return {'code':400,'message':'请勿违规操作','data':{}}
        await pgsql.del_answer(aid)

        return {'code':200,'message':'删除成功','data':{}}
    
    except:
        return {'code':500,'message':'服务器错误','data':{}}

@router.post('/api/editpassword',response_model=Response)
async def edit_password(user:User=Depends(get_current_active_user),oldpassword:str=Form(),newpassword:str=Form()):
    if oldpassword =='' or newpassword =='':
        raise ErrorOwn("请正确输入")
    userId = user.get('userId')
    res =await pgsql.login(userId)
    if not await verify_password(oldpassword,res[0].get('password')):
        return {'code':400,'message':'密码错误','data':{}}
    await pgsql.edit_password(userId,pwd_context.encrypt(newpassword))
    return {'code':200,'message':'修改密码成功','data':{}}
@router.post('/api/edituserid',response_model=Response)
async def edit_userId(user:User=Depends(get_current_active_user),newuserid:str=Form()):
    if newuserid =='':
        raise ErrorOwn("请正确输入")
    try:
        userId = user.get('userId')
        await pgsql.edit_userId(userId,newuserId=newuserid)
        return {'code':200,'message':'修改账号成功','data':{}}
    except:
        return {'code':400,'message':'用户存在','data':{}}



@router.post("/api/uploadfile",response_model=Response)
async def create_upload_file(file: Union[UploadFile, None] = None,user:User=Depends(get_current_active_user),type:str='image'):
    type_list = ['image','avatar']
    if type not in type_list:
        raise ErrorOwn("请正确输入")
    if not file:
        return {"message": "No upload file sent"}
    else:
        filename = hashlib.sha256(file.filename.encode()).hexdigest()
        if type == 'avatar':
            filename = user.get('userId') + filename
        with open('image/'+filename,'wb') as f:
            f.write(file.file.read())
        if type == 'avatar':

            await pgsql.edit_avatar(userId=user.get("userId"),avatar_url='/image/'+filename)
    return {'code':200,'message':'上传成功','data':{'imageurl':'/image/'+filename}}

@router.websocket("/ws/{userId}")
async def websocket_endpoint(websocket: WebSocket, userId: str):
    await manager.connect(websocket,str(userId))
    try:
        while True:
            data = await websocket.receive_text()
    except WebSocketDisconnect:
        manager.disconnect(websocket)

# @router.get("/test/{userId}")
# async def test(userId: str):
#     await manager.active_connections_dict[userId].send_text('我是'+userId)

def sms(num:int,receiver:str):

    key = 'xxx'  # 换成你的QQ邮箱SMTP的授权码(QQ邮箱设置里)
    EMAIL_ADDRESS = '1556444893@qq.com'  # 换成你的邮箱地址
    EMAIL_PASSWORD = key
    smtp = smtplib.SMTP('smtp.qq.com', 25)
    context = ssl.create_default_context()
    sender = EMAIL_ADDRESS  # 发件邮箱
    #receiver = ['1556444893@qq.com']
    # 收件邮箱
 
    subject = "验证码"
    # 这里我调用了自己的接口，如果不需要直接将body改为 body = '正文'
    #body = random.randint(1000,9999)
    body = num
    msg = EmailMessage()
    msg['subject'] = subject  # 邮件主题
    msg['From'] = sender
    msg['To'] = receiver
    msg.set_content("验证码为:"+str(body))  # 邮件内容
 
    with smtplib.SMTP_SSL("smtp.qq.com", 465, context=context) as smtp:
        smtp.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
        smtp.send_message(msg)

emil_dict={}

@router.post('/api/sendmail',response_model=Response)
async def send_mail(mail:str=Form()):
    if mail =='':
        raise ErrorOwn("请正确输入")
    try:    
        num = random.randint(1000,9999)
        sms(num,mail)
        emil_dict[mail]=num
        return {'code':200,'message':'发送验证码成功','data':{}}
    except:  
        return {'code':200,'message':'邮箱错误','data':{}}

@router.post('/api/checkmail',response_model=Response)
async def check_mail(user:User=Depends(get_current_active_user),mail:str=Form(),checknum:str=Form()):
    
    userId = user.get('userId')
    #print(checknum)
    #print(emil_dict)
    try:
        if int(emil_dict[mail])==int(checknum):
            await pgsql.edit_mail(userId,mail)
            return {'code':200,'message':'验证码正确','data':{}}
        else :
            return {'code':400,'message':'验证码错误','data':{}}  
    except:  
        return {'code':200,'message':'邮箱错误','data':{}} 

@router.post('/api/forgetpassword',response_model=Response)
async def forget_password(mail:str=Form(),newpassword:str=Form(),checknum:str=Form()):
    if newpassword =='':
        raise ErrorOwn("请正确输入")
    try:
        if int(emil_dict[mail])==int(checknum):
            await pgsql.forget_password(mail,pwd_context.encrypt(newpassword))
            return {'code':200,'message':'修改密码成功','data':{}}
        else :
            return {'code':400,'message':'验证码错误','data':{}}  
    except:  
        return {'code':200,'message':'邮箱错误','data':{}}     





from fastapi import Depends, FastAPI, APIRouter, Form
from dependencies import *
from models import pgsql, mlsearch


import traceback
router = APIRouter()

@router.post('/api/register', response_model=Response)
async def register(form_data: User): 
    if len(await pgsql.check_register(form_data.userId)) !=0:
        return {'code':401,'message':'当前用户Id已存在','data':{}}
    try:
        await pgsql.register(form_data.userId,form_data.username,form_data.password)
        return {'code':200,'message':'注册成功','data':{'userId':form_data.userId, 'username':form_data.username}}
    except:
        traceback.print_exc()
        return {'code':500,'message':'未知错误！','data':{}}
@router.post('/api/login', response_model=Response)
async def login(form_data: User):
    res =await pgsql.login(form_data.userId)
    if len(res) == 0:
        return {'code':401,'message':'当前用户或密码错误','data':{}}
    password = res[0].get('password')
    rights = res[0].get('rights')
    if not await verify_password(form_data.password, password):
        return {'code':401,'message':'当前用户或密码错误','data':{}}
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"userId": form_data.userId, "rights":rights}, expires_delta=access_token_expires
    )
    return {'code':200,'message':'登陆成功','data':{'token':access_token}}
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
        return {'code':200,'message':'发表问题成功','data':{"aid":aid}}
    except:
        return {'code':500,'message':'服务器错误','data':{}}

@router.post('/api/delanswer',response_model=Response)
async def del_answer(user:User =Depends(get_current_active_user),aid:int=Form()):
    # try:
        userId = await pgsql.check_user(aid,'answer','id')
        if user.get('userId') != userId:
            return {'code':400,'message':'请勿违规操作','data':{}}
        await pgsql.del_answer(aid)

        return {'code':200,'message':'删除成功','data':{}}
    # except:
    #     return {'code':500,'message':'服务器错误','data':{}}
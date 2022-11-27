from fastapi import Depends, FastAPI, APIRouter
from dependencies import *
from models import pgsql


import traceback
router = APIRouter()

@router.post('/register', response_model=Response)
async def register(form_data: User): 
    if len(await pgsql.check_register(form_data.userId)) !=0:
        return {'code':401,'message':'当前用户Id已存在','data':{}}
    try:
        await pgsql.register(form_data.userId,form_data.username,form_data.password)
        return {'code':200,'message':'注册成功','data':{'userId':form_data.userId, 'username':form_data.username}}
    except:
        traceback.print_exc()
        return {'code':500,'message':'未知错误！','data':{}}
@router.post('/login', response_model=Response)
async def login(form_data: User):
    password =await pgsql.login(form_data.userId)
    if len(password) == 0:
        return {'code':401,'message':'当前用户或密码错误','data':{}}
    password = password[0].get('password')
    if not await verify_password(form_data.password, password):
        return {'code':401,'message':'当前用户或密码错误','data':{}}
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": form_data.userId}, expires_delta=access_token_expires
    )
    return {'code':200,'message':'登陆成功','data':{'token':access_token}}
@router.post('/getuserinfo',response_model=Response)
async def getUserInfo(form_data:User = Depends(get_current_active_user)):
    return {'code':0,'message':'查询成功','data':{'userId':form_data['userId'],'username':form_data['username']}}

@router.get('/like',response_model=Response)
async def like(qid:int=0, aid:int =0,user:User=Depends(get_current_active_user)):
    if qid == 0 and aid == 0:
            return {'code':400,'message':'参数缺失','data':{}}
    return await pgsql.like(qid,aid,user.get('userId'))

@router.get('/removelike',response_model=Response)
async def remove_like(qid:int=0, aid:int =0,user:User =Depends(get_current_active_user)):
    if qid == 0 and aid == 0:
            return {'code':400,'message':'参数缺失','data':{}}
    return await pgsql.remove_like(qid,aid,user.get('userId'))

# @router.get('/postquestion',response_model=Response)
# async def post_question():

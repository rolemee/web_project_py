from fastapi import Depends, FastAPI, APIRouter
from dependencies import *
from models import pgsql


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
@router.post('/api/getuserinfo',response_model=Response)
async def getUserInfo(form_data:User = Depends(get_current_active_user)):
    return {'code':0,'message':'查询成功','data':{'userId':form_data['userId'],'username':form_data['username']}}

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

# @router.get('/postquestion',response_model=Response)
# async def post_question():

from fastapi import Depends, FastAPI, APIRouter, Request
from dependencies import *
from models import pgsql
from models import mlsearch
import traceback
router = APIRouter()

@router.get('/popularanswer', response_model=Response)
async def popular_answer():
    quiz_list = await pgsql.popular_quiz()
    # quiz_list = await make_dict(quiz_list=quiz_list)
    return {'code':200,'message':'查询成功','data':{'quiz_list':quiz_list}}

@router.get('/search',response_model=Response)
async def search(q:str = ''):
    quiz_list,search_time,total_num = await mlsearch.search(query_text=q)
    try:
        return {'code':200,'message':'查询成功','data':{'quiz_list':quiz_list,'search_time':str(search_time)+'ms','total_num':total_num}}
    except:
        {'code':500,'message':'服务器错误','data':{}}

@router.get('/quizinfo',response_model=Response)
async def quiz_info(request:Request,qid:int = 0,userId:str=""):
    if userId != "":
        token = OAuth2PasswordBearer('token')
        token = await token(request)
        userId = (await get_current_user(token=token)).get('userId')
    if qid == 0:
        return {'code':400,'message':'请输入qid','data':{}}
    quiz =await pgsql.quiz_info(qid,userId)
    if len(quiz) == 0:
        return {'code':401,'message':'问题不存在','data':{}}
    # quiz = await make_dict(quiz)
    return {'code':200,'message':'查询成功','data':{'quiz_list':quiz}}

@router.get('/search_answer',response_model=Response)
async def search_answer(request:Request,aid:int=0,qid:int=0,userId:str=""):
    if userId != "":
        token = OAuth2PasswordBearer('token')
        token = await token(request)
        userId = (await get_current_user(token=token)).get('userId')
    sql = 'select id, "userId", qid, time, content, "like", dislike,(select $1=any(like_id::text[])) is_like from web_project.answer where qid = $2'
    id = qid
    if qid == 0:
        if aid == 0:
           return {'code':401,'message':'参数缺失','data':{}}
        sql = 'select id, "userId", qid, time, content, "like", dislike,(select $1=any(like_id::text[])) is_like from web_project.answer where id = $2'
        id = aid
    try:
        res = await pgsql.search_answer(sql,id,userId)
        return {'code':200,'message':'查询成功','data':{'answer_list':res}}
    except:
        traceback.print_exc()
        return {'code':500,'message':'服务器错误','data':{}}



@router.get('/abtest')
async def abtest():
    return ''

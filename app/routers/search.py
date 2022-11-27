from fastapi import Depends, FastAPI, APIRouter
from dependencies import *
from models import pgsql
from models import mlsearch
router = APIRouter()

@router.get('/popularanswer', response_model=Response)
async def popular_answer():
    quiz_list = await pgsql.popular_quiz()
    # quiz_list = await make_dict(quiz_list=quiz_list)
    return {'code':200,'message':'查询成功','data':{'quiz_list':quiz_list}}

@router.get('/search',response_model=Response)
async def search(q:str = ''):
    quiz_list,search_time = await mlsearch.search(query_text=q)
    try:
        return {'code':'200','message':'查询成功','data':{'quiz_list':quiz_list,'search_time':str(search_time)+'ms'}}
    except:
        {'code':'500','message':'服务器错误','data':{}}

@router.get('/quizinfo',response_model=Response)
async def quiz_info(qid:int = 0):
    if qid == 0:
        return {'code':'400','message':'请输入qid','data':{}}
    quiz =await pgsql.quiz_info(qid)
    if len(quiz) == 0:
        return {'code':'401','message':'问题不存在','data':{}}
    # quiz = await make_dict(quiz)
    return {'code':'200','message':'查询成功','data':{'quiz_list':quiz}}

@router.get('/abtest')
async def abtest():
    return ''

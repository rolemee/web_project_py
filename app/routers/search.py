from fastapi import Depends, FastAPI, APIRouter
from dependencies import *
from models import pgsql

router = APIRouter()
# async def make_dict(quiz_list:list):
#     quiz_info = {}
#     data_list = []
#     for i in quiz_list:
#         i_keys = list(i.keys())
#         i_values = list(i.values())
#         for _ in range(len(i_keys)):
#             quiz_info[i_keys[_]] = i_values[_]
#         data_list.append(quiz_info)
#         quiz_info.clear()
#     return data_list

@router.get('/popularanswer', response_model=Response)
async def popular_answer():
    quiz_list = await pgsql.popular_quiz()
    # quiz_list = await make_dict(quiz_list=quiz_list)
    return {'code':200,'message':'查询成功','data':{'quiz_list':quiz_list}}

@router.get('/search',response_model=Response)
async def search(text:str = ''):
    return ''

@router.get('/quizinfo',response_model=Response)
async def quiz_info(qid:int = 0):
    if qid == 0:
        return {'code':'400','message':'请输入qid','data':{}}
    quiz =await pgsql.quiz_info(qid)
    if len(quiz) == 0:
        return {'code':'401','message':'问题不存在','data':{}}
    # quiz = await make_dict(quiz)
    return {'code':'200','message':'查询成功','data':{'quiz_list':quiz}}


import cProfile, pstats, io
from fastapi import Depends, FastAPI, APIRouter, Request
from dependencies import *
from models import pgsql
from models import mlsearch
from datetime import datetime,date,timedelta
import asyncio




async def search(q:str = '', start_time:date=date(1970,1,1),end_time:date=date(date.today().year,date.today().month,date.today().day)+timedelta(days=1),offset:int = 0,limit:int = 10):
    quiz_list,search_time,total_num = await mlsearch.search(start_time,end_time,query_text=q,offset=offset,limit=limit)
    try:
        return {'code':200,'message':'查询成功','data':{'quiz_list':quiz_list,'search_time':str(search_time)+'ms','total_num':total_num}}
    except:
        {'code':500,'message':'服务器错误','data':{}}
pr = cProfile.Profile()
pr.enable()
for i in range(100):
    loop = asyncio.get_event_loop()
    loop.run_until_complete(search(str(i)))


pr.disable()
s = io.StringIO()
sortby = "cumtime"  # 仅适用于 3.6, 3.7 把这里改成常量了
ps = pstats.Stats(pr, stream=s).sort_stats(sortby)
ps.print_stats()
pr.dump_stats("search_optimize.prof")
# print(s.getvalue())
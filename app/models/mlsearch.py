import os
from meilisearch_python_async import Client
from models import pgsql
from pypinyin import pinyin, lazy_pinyin, Style
from datetime import date,timedelta
async def search(start_time:date,end_time:date,query_text:str = "", offset:int = 0,limit:int = 10,userId:str=''):
    async with Client('http://127.0.0.1:7700') as client:
        client =client.index('web_project') 
        res = await client.search(query_text,attributes_to_retrieve=['id'],offset=offset,limit=limit)
        qid_list = list(map(lambda i:i['id'], res.hits))
        search_time = res.processing_time_ms
        totle_num = res.estimated_total_hits
        res = await pgsql.search(start_time,end_time,qid_list,userId)
        if start_time != date(1970,1,1) or end_time != date(date.today().year,date.today().month,date.today().day) + timedelta(days=1):
            totle_num = (await pgsql.search_num(start_time,end_time))[0].get('num')
        return res,search_time,totle_num

async def insert(qid:int,title:str,keywords:list):
    async with Client('http://127.0.0.1:7700') as client:
        client =client.index('web_project')
        res = await client.add_documents([{
            'id':qid,
            'title':title,
            'TITLE_PINYIN': ''.join(lazy_pinyin(title)),
            'title_pinyin_space': ' '.join(lazy_pinyin(title)),
            'title_pinyin_firstLetter' : ''.join(lazy_pinyin(title,style=Style.FIRST_LETTER)),
            'keyWords':' '.join(keywords)
            
        }])
async def delete(qid:int):
    async with Client('http://127.0.0.1:7700') as client:
        client =client.index('web_project')
        await client.delete_document(qid)
        # print(res)
# import asyncio
# loop = asyncio.get_event_loop()
# loop.run_until_complete(search('wo'))
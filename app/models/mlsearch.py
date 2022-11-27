import os
from meilisearch_python_async import Client
from models import pgsql
async def search(query_text:str = ""):
    async with Client('http://127.0.0.1:7700') as client:
        client =client.index('web_project') 
        res = await client.search(query_text,attributes_to_retrieve=['id'],)
        qid_list = list(map(lambda i:i['id'], res.hits))
        search_time = res.processing_time_ms
        totle_num = res.estimated_total_hits
        res = await pgsql.search(qid_list)
        return res,search_time,totle_num

# import asyncio
# loop = asyncio.get_event_loop()
# loop.run_until_complete(search('wo'))
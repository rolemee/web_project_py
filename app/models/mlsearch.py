import os
from meilisearch_python_async import Client
from models import pgsql
async def search(query_text:str = ""):
    async with Client('http://127.0.0.1:7700') as client:
        client =client.index('web_project') 
        res = await client.search(query_text,attributes_to_retrieve=['id'],)
        qid_list = list(map(lambda i:i['id'], res.hits))
        search_time = res.processing_time_ms
        res = await pgsql.search(qid_list)
        return res,search_time
        
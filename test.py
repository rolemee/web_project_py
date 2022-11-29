# from passlib.context import CryptContext
# pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# print(pwd_context.encrypt('secret'))


import asyncio
import asyncpg
from datetime import datetime
async def run():
    conn = await asyncpg.connect(user='rolemee', password='',
                                 database='web-project' ,host='127.0.0.1')
    values = await conn.execute(
       """INSERT INTO web_project.test (test, test_time)
VALUES (1::integer, $1::timestamp);
""",
       
    )
    # sql = 'INSERT INTO web_project."user" ("userId", username, password) VALUES ($1, $2, $3);'
    # values = await conn.execute(
    #     sql,"1234","312","444"
    # )
    # print(values)
    
    await conn.close()
    # print(values[0].get('password'))
    for i in values:
        for j in i:
            print(j)
        print()
    return values


# loop = asyncio.get_event_loop()
# loop.run_until_complete(run())[0]


# from app.models import pgsql


# 
from datetime import datetime,date
import time

# Date = date(date.today())
print(date.day)
# print(Date)

import os
from meilisearch_python_async import Client
from models import pgsql
from datetime import date
# async def search(query_text:str = ""):
#     async with Client('http://127.0.0.1:7700') as client:
#         client =client.index('web_project') 
#         res = await client.search('shifu', {
#   'attributesToCrop': ['overview'],
#   'cropMarker': '[…]'
# })
#         print(res)
import meilisearch
client = meilisearch.Client('http://127.0.0.1:7700')
print(client.index('web_project').search('百度', {
  'attributesToCrop': ['title'],
  'cropMarker': '',
  'cropLength': 3
}))
# loop = asyncio.get_event_loop()
# loop.run_until_complete(search('百度'))
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


import meilisearch
client = meilisearch.Client('http://localhost:7700')
# print(client.index('movies').delete())

print(client.index('web_project').search('1',opt_params={"offset":20}))

import chardet
with open('data/yyj/html/82089.html','rb') as f:
    f = f.read()

print(chardet.detect(f)['encoding'])
# from passlib.context import CryptContext
# pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# print(pwd_context.encrypt('secret'))


import asyncio
import asyncpg

async def run():
    conn = await asyncpg.connect(user='rolemee', password='',
                                 database='web-project' ,host='127.0.0.1')
    values = await conn.fetch(
       'SELECT like_id FROM web_project."answer"',
       
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


loop = asyncio.get_event_loop()
loop.run_until_complete(run())[0]


# from app.models import pgsql


# import meilisearch
# client = meilisearch.Client('http://localhost:7700')
# print(client.index('movies').search('1'))



# from pypinyin import pinyin, lazy_pinyin, Style


# print(''.join(lazy_pinyin(u',./\n中啊啥的啊啥的啊啥的啊啥的啊啥的犬瘟热去拉萨前往俄欧日u前往哦i恶评如心')))
# print(''.join(lazy_pinyin(u'啊啥的aa,./?a11',style=Style.FIRST_LETTER)))
# # print(lambda pinyin_list[0]: ''.)
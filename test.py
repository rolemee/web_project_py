# from passlib.context import CryptContext
# pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# print(pwd_context.encrypt('secret'))


import asyncio
import asyncpg

async def run():
    conn = await asyncpg.connect(user='rolemee', password='',
                                 database='web-project' ,host='127.0.0.1')
    values = await conn.fetch(
       'SELECT password FROM web_project."user" where "userId"=\'1\'',
       
    )
    # sql = 'INSERT INTO web_project."user" ("userId", username, password) VALUES ($1, $2, $3);'
    # values = await conn.execute(
    #     sql,"1234","312","444"
    # )
    # print(values)
    await conn.close()
    print(values[0].get('password'))
    return values


loop = asyncio.get_event_loop()
print(loop.run_until_complete(run())[0])


# from app.models import pgsql





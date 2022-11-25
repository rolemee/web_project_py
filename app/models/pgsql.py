import asyncio
import asyncpg
from passlib.context import CryptContext
from functools import wraps
conn = None
pwd_context = None
def check_conn(func):
    @wraps(func)
    async def decorated(*args, **argv):
        global conn
        if conn is None:
            await init()
        return await func(*args,**argv)
    return decorated


async def init():
    global conn
    global pwd_context
    pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
    conn = await asyncpg.connect(user='rolemee', password='',
        database='web-project' ,host='127.0.0.1')
async def run(sql,*args):
    values = await conn.fetch(
        sql,*args
    )
    print(len(values))
    return values
@check_conn
async def check_register(userId:str):
    global conn
    sql = 'select "userId" from web_project."user" where "userId" = $1;'
    values = await conn.fetch(
        sql, userId
    )
    return values
@check_conn
async def register(userId:str,username:str,password:str):
    global conn
    sql = 'INSERT INTO web_project."user" ("userId", username, password) VALUES ($1, $2, $3);'
    values = await conn.execute(
        sql, userId, username, pwd_context.encrypt(password)
    )
    print(values)


import asyncio
import asyncpg
from passlib.context import CryptContext
from functools import wraps

import traceback
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
    return values

@check_conn
async def login(userId:str):
    global conn
    sql = 'select password from web_project."user" where "userId" = $1'
    values = await conn.fetch(
        sql, userId
    )
    return values
@check_conn
async def jwt_get_info(userId:str):
    global conn
    sql = 'select "userId","username" from web_project."user" where "userId" = $1'
    values = await conn.fetch(
        sql,userId
    )
    return values

@check_conn
async def popular_quiz():
    global conn
    sql = 'select qid, "userId", time, title, content, "keyOne", "keyTwo", "like", dislike, max_like_reply_id, ans_num from web_project.quiz order by "like",ans_num DESC limit 10;'
    values = await conn.fetch(
        sql
    )
    return values

@check_conn
async def quiz_info(qid:int):
    global conn
    sql = 'select qid, "userId", time, title, content, "keyOne", "keyTwo", "like", dislike, max_like_reply_id, ans_num from web_project.quiz where qid=$1;'
    values = await conn.fetch(
        sql,qid
    )
    return values

@check_conn
async def like(qid:int,aid:int,uid:str):
    table = 'answer'
    query = 'id'
    id = aid
    if qid != 0:
        table = 'quiz'
        query = 'qid'
        id = qid
    sql = f'select like_id from web_project.{table} where {query} = $1'
    values = await conn.fetch(
        sql, id
    )
    if len(values) == 0:
        return {'code':'400','message':'未找到该问题','data':{}}
    if uid in values[0].get('like_id'):
        return {'code':'401','message':'你已经点赞过该问题','data':{}}
    sql = 'update web_project.%s set "like"="like"+1, like_id = like_id || $1 where %s=%s' %(table,query,id)
    try:
        async with conn.transaction():
            values = await conn.execute(
                sql , [uid]
            )
            print(values)
            return {'code':'200','message':'点赞成功','data':{}}
    except:
        traceback.print_exc()
        return {'code':'500','message':'系统错误','data':{}}

@check_conn
async def remove_like(qid:int,aid:int,uid:str):
    table = 'answer'
    query = 'id'
    id = aid
    if qid != 0:
        table = 'quiz'
        query = 'qid'
        id = qid
    sql = f'select like_id from web_project.{table} where {query} = $1'
    values = await conn.fetch(
        sql, id
    )
    if len(values) == 0:
        return {'code':'400','message':'未找到该问题','data':{}}
    if uid not in values[0].get('like_id'):
        return {'code':'401','message':'你还未点赞该问题','data':{}}
    sql = 'update web_project.%s set "like"="like"-1, like_id = array_remove(like_id,$1) where %s=%s' %(table,query,id)
    try:
        async with conn.transaction():
            values = await conn.execute(
                sql , uid
            )
            print(values)
            return {'code':'200','message':'取消点赞成功','data':{}}
    except:
        traceback.print_exc()
        return {'code':'500','message':'系统错误','data':{}}
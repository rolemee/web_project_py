import asyncio
import asyncpg
from passlib.context import CryptContext
from functools import wraps

import traceback
pool = None
pwd_context = None
def check_conn(func):
    @wraps(func)
    async def decorated(*args, **argv):
        global pool
        if pool is None:
            await init()
        
        return await func(*args,**argv)
    return decorated


async def init():
    global pool
    global pwd_context
    pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
    pool = await asyncpg.create_pool(user='rolemee', password='',
        database='web-project' ,host='127.0.0.1',max_size=100)
@check_conn
async def check_register(userId:str):
    global pool
    async with pool.acquire() as connection:
        sql = 'select "userId" from web_project."user" where "userId" = $1;'
        values = await connection.fetch(
            sql, userId
        )
        return values
@check_conn
async def register(userId:str,username:str,password:str):
    global pool
    async with pool.acquire() as connection:
        sql = 'INSERT INTO web_project."user" ("userId", username, password) VALUES ($1, $2, $3);'
        values = await connection.execute(
            sql, userId, username, pwd_context.encrypt(password)
        )
        return values

@check_conn
async def login(userId:str):
    global pool
    async with pool.acquire() as connection:
        sql = 'select password from web_project."user" where "userId" = $1'
        values = await connection.fetch(
            sql, userId
        )
        return values
@check_conn
async def jwt_get_info(userId:str):
    global pool
    async with pool.acquire() as connection:
        sql = 'select "userId","username" from web_project."user" where "userId" = $1'
        values = await connection.fetch(
            sql,userId
        )
        return values

@check_conn
async def popular_quiz():
    global pool
    async with pool.acquire() as connection:
        sql = 'select qid, "userId", time, title, content, "keyOne", "keyTwo", "like", dislike, max_like_reply_id, ans_num from web_project.quiz order by "like",ans_num DESC limit 10;'
        values = await connection.fetch(
            sql
        )
        return values

@check_conn
async def quiz_info(qid:int):
    global pool
    async with pool.acquire() as connection:
        sql = 'select qid, "userId", time, title, content, "keyOne", "keyTwo", "like", dislike, max_like_reply_id, ans_num from web_project.quiz where qid=$1;'
        values = await connection.fetch(
            sql,qid
        )
        return values

@check_conn
async def like(qid:int,aid:int,uid:str):
    global pool
    async with pool.acquire() as connection:
        table = 'answer'
        query = 'id'
        id = aid
        if qid != 0:
            table = 'quiz'
            query = 'qid'
            id = qid
        sql = f'select like_id from web_project.{table} where {query} = $1'
        values = await connection.fetch(
            sql, id
        )
        if len(values) == 0:
            return {'code':'400','message':'未找到该问题','data':{}}
        if uid in values[0].get('like_id'):
            return {'code':'401','message':'你已经点赞过该问题','data':{}}
        sql = 'update web_project.%s set "like"="like"+1, like_id = like_id || $1 where %s=%s' %(table,query,id)
        try:
            async with connection.transaction():
                values = await connection.execute(
                    sql , [uid]
                )
                return {'code':'200','message':'点赞成功','data':{}}
        except:
            traceback.print_exc()
            return {'code':'500','message':'系统错误','data':{}}

@check_conn
async def remove_like(qid:int,aid:int,uid:str):
    global pool
    async with pool.acquire() as connection:
        table = 'answer'
        query = 'id'
        id = aid
        if qid != 0:
            table = 'quiz'
            query = 'qid'
            id = qid
        sql = f'select like_id from web_project.{table} where {query} = $1'
        values = await connection.fetch(
            sql, id
        )
        if len(values) == 0:
            return {'code':'400','message':'未找到该问题','data':{}}
        if uid not in values[0].get('like_id'):
            return {'code':'401','message':'你还未点赞该问题','data':{}}
        sql = 'update web_project.%s set "like"="like"-1, like_id = array_remove(like_id,$1) where %s=%s' %(table,query,id)
        try:
            async with connection.transaction():
                values = await connection.execute(
                    sql , uid
                )
                return {'code':'200','message':'取消点赞成功','data':{}}
        except:
            traceback.print_exc()
            return {'code':'500','message':'系统错误','data':{}}


@check_conn
async def search(id_list:list=[]):
    global pool
    async with pool.acquire() as conn:
        sql = 'select qid, "userId", time, title, content, "keyOne", "keyTwo", "like", dislike, max_like_reply_id, ans_num from web_project.quiz where qid=any($1);'
        values = await conn.fetch(
            sql, id_list
        )
        return values
@check_conn
async def search_answer(sql:str = '' ,id:int = 0,userId:str=""):
    global pool
    async with pool.acquire() as conn:
        values = await conn.fetch(
            sql, userId,id
        )
    return values
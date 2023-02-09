import meilisearch
import json
import time
import tqdm
json_content = ""
import asyncio
import asyncpg
global conn
async def connect():
    global conn
    conn = await asyncpg.connect(user='postgres', password='root',
                                    database='postgres' ,host='127.0.0.1')
async def start():
    global conn
    sql = 'truncate table web_project.answer,web_project.quiz,web_project."user";'
    async with conn.transaction():
        values = await conn.execute(
            sql
        )
    sql = 'TRUNCATE web_project.quiz,web_project.answer,web_project."user" RESTART IDENTITY CASCADE;'
    async with conn.transaction():
        values = await conn.execute(
            sql
        )
        
async def insert_username(userId,username,password):
    global conn
    sql = 'INSERT INTO web_project."user" ("userId", username, password) VALUES ($1, $2, $3) ON CONFLICT ("userId") DO NOTHING ;'
    async with conn.transaction():
        values = await conn.execute(
            sql,userId,username,password
        )
    return values
async def insert_quiz(qid,userId,time,title,conntent,like,dislike,answer_num,keyWords):
    global conn
    sql = """INSERT INTO web_project.quiz (qid, "userId", time, title, content, "keyWords", "like", dislike,
                              max_like_reply_id, ans_num, like_id,star_id)
VALUES ($8, $1::varchar(20), $2::timestamp, $3::varchar(255), $4::text,
        $9 ,$5::integer, $6::integer, DEFAULT, $7::integer, DEFAULT,DEFAULT);
"""
    async with conn.transaction():
        values = await conn.execute(
            sql,userId,time,title,conntent,like,dislike,answer_num,qid,keyWords
        )
    return values
async def insert_answer(aid,userId,qid,time,content,like,dislike):
    global conn
    sql = """INSERT INTO web_project.answer (id, "userId", qid, time, content, "like", dislike, like_id)
VALUES ($1::integer, $2::varchar(20), $3::integer, $4::timestamp, $5::text, $6::integer,
        $7::integer, DEFAULT);
    """
    async with conn.transaction():
        values = await conn.execute(
            sql,aid,userId,qid,time,content,like,dislike
        )

async def finish_set():
    sql = """
    select setval('web_project.answer_id_seq',(select max(id) from web_project.answer))
    """
    async with conn.transaction():
        values = await conn.fetch(
            sql
        )

    sql = """
    select setval('web_project.quiz_qid_seq',(select max(qid) from web_project.quiz));"""
    async with conn.transaction():
        values = await conn.fetch(
            sql
        )

    sql="""
    create or replace  function max_like_reply_id_fun() returns trigger
    language plpgsql
as
$$
   BEGIN
      update web_project.quiz set max_like_reply_id=(select "id" from web_project.answer where qid=new.qid order by "like" DESC limit 1 ) where qid=new.qid;
      return new;
   END
$$;"""
    async with conn.transaction():
            values = await conn.fetch(
                sql
            )

    sql="""
alter function max_like_reply_id_fun() owner to postgres;"""
    async with conn.transaction():
            values = await conn.fetch(
                sql
            )

    sql="""
create or replace  trigger max_like_count
    after insert or update
        of "like"
    on web_project.answer
    for each row
execute procedure max_like_reply_id_fun();
"""
    async with conn.transaction():
        values = await conn.fetch(
            sql
        )

    sql="""
create or replace  function sum_reply() returns trigger
    language plpgsql
as
$$
    BEGIN
        UPDATE web_project.quiz set ans_num = (select count(id) from web_project.answer where answer.qid=new.qid) where qid=new.qid;
        RETURN new;
    end;
    $$;"""
    async with conn.transaction():
        values = await conn.fetch(
            sql
        )

    sql="""alter function sum_reply() owner to postgres;"""
    async with conn.transaction():
        values = await conn.fetch(
            sql
        )

    sql="""create or replace  trigger ans_sum_t
    after insert
    on web_project.answer
    for each row
execute procedure sum_reply();


    """
    async with conn.transaction():
        values = await conn.fetch(
            sql
        )
loop = asyncio.get_event_loop()

import traceback
from datetime import datetime
with open('data.json','r',encoding='utf-8') as f:
    json_content = json.load(f)
loop.run_until_complete(connect())
qid = 1
aid = 1
loop.run_until_complete(start())
for i in tqdm.tqdm(json_content):
    loop.run_until_complete(insert_username(i['userId'],i['userId'],"imported_user"))
    try:
        Time = i['time']
        if i['time'].find('-') ==-1:
            Time = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime(int(i['time'])))
        try:
            loop.run_until_complete(insert_quiz(qid,i['userId'],datetime.strptime(Time,'%Y-%m-%d %H:%M:%S'),i['questionTitle'],i['query_text'],0,0,len(i['reply']),i['keyWords']))
        except:
            loop.run_until_complete(insert_username(i['userId'],i['userId'],"imported_user"))
            loop.run_until_complete(insert_quiz(qid,i['userId'],datetime.strptime(Time,'%Y-%m-%d %H:%M:%S'),i['questionTitle'],i['query_text'],0,0,len(i['reply']),i['keyWords']))
        qid+=1
        if len(i['reply']) == 0:
            continue
    except:
        traceback.print_exc()
        print()
        pass
    for j in i['reply']:
        

        loop.run_until_complete(insert_username(j['userId'],j['userId'],"imported_user"))

        try:

            Time = j['time']
            if Time is not None:
                if j['time'].find('-') ==-1:
                    Time = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime(int(i['time'])))
                elif j['time'].find(':') ==-1:
                    Time = Time + " 00:00:00"
                try:
                    loop.run_until_complete(insert_answer(aid,j['userId'],qid-1,datetime.strptime(Time,'%Y-%m-%d %H:%M:%S'),j['content'],int(j['like']),int(j['unlikes'])))
                except:
                    loop.run_until_complete(insert_username(i['userId'],i['userId'],"imported_user"))
                    loop.run_until_complete(insert_answer(aid,j['userId'],qid-1,datetime.strptime(Time,'%Y-%m-%d %H:%M:%S'),j['content'],int(j['like']),int(j['unlikes'])))
            else:
                try:
                    loop.run_until_complete(insert_answer(aid,j['userId'],qid-1,None,j['content'],int(j['like']),int(j['unlikes'])))
                except:
                    loop.run_until_complete(insert_username(i['userId'],i['userId'],"imported_user"))
                    loop.run_until_complete(insert_answer(aid,j['userId'],qid-1,None,j['content'],int(j['like']),int(j['unlikes'])))
            aid+=1
        except:
            traceback.print_exc()
            print()
            pass
    
loop.run_until_complete(finish_set())




# conn.close()
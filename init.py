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
    conn = await asyncpg.connect(user='rolemee', password='',
                                    database='web-project' ,host='127.0.0.1')
async def insert_username(userId,username,password):
    global conn
    sql = 'INSERT INTO web_project."user" ("userId", username, password) VALUES ($1, $2, $3);'
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
        conn.commitsql = """
    select setval('web_project.quiz_qid_seq',(select max(qid) from web_project.quiz))
    """
    async with conn.transaction():
        values = await conn.fetch(
            sql
        )
loop = asyncio.get_event_loop()

import traceback
from datetime import datetime
with open('data.json','r') as f:
    json_content = json.load(f)
loop.run_until_complete(connect())
qid = 1
aid = 1

for i in tqdm.tqdm(json_content):

    try:
        loop.run_until_complete(insert_username(i['userId'],i['userId'],"imported_user"))
    except:
        # traceback.print_exc()
        # print()
        pass
    try:
        Time = i['time']
        if i['time'].find('-') ==-1:
            Time = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime(int(i['time'])))
        try:
            loop.run_until_complete(insert_quiz(qid,i['userId'],datetime.strptime(Time,'%Y-%m-%d %H:%M:%S'),i['questionTitle'],i['query_text'],0,0,len(i['reply']),i['keyWords']))
        except:
            time.sleep(0.01)
            loop.run_until_complete(insert_quiz(qid,i['userId'],datetime.strptime(Time,'%Y-%m-%d %H:%M:%S'),i['questionTitle'],i['query_text'],0,0,len(i['reply']),i['keyWords']))
        qid+=1
        if len(i['reply']) == 0:
            continue
    except:
        traceback.print_exc()
        print()
        pass
    for j in i['reply']:
        
        try:
            loop.run_until_complete(insert_username(j['userId'],j['userId'],"imported_user"))
        except:
            # traceback.print_exc()
            # print()
            pass
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
                    time.sleep(0.01)
            else:
                try:
                    loop.run_until_complete(insert_answer(aid,j['userId'],qid-1,None,j['content'],int(j['like']),int(j['unlikes'])))
                except:
                    time.sleep(0.01)
                    loop.run_until_complete(insert_answer(aid,j['userId'],qid-1,None,j['content'],int(j['like']),int(j['unlikes'])))
            aid+=1
        except:
            traceback.print_exc()
            print()
            pass
    
loop.run_until_complete(finish_set())




# conn.close()
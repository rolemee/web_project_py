import json
import os
from bs4 import BeautifulSoup
import time 
import re
import traceback
import tqdm
import asyncio
import psycopg2
import multiprocessing
res_list = []
# testnum = 1
def connect():
    return psycopg2.connect(user='rolemee', password='',
                                    dbname='web-project' ,host='127.0.0.1')

class Ask(object):
    def __init__(self,qid, questionTitle, userId, time, query_text, reply, keyWords):
        self.id=qid
        self.questionTitle = questionTitle
        self.userId = userId
        self.time = time
        self.query_text = query_text
        self.keyWords = keyWords
        self.reply = reply

class Reply(object):
    def __init__(self, userId, time, content, like, unlikes):
        self.userId = userId
        self.time = time
        self.content = content
        self.like = like
        self.unlikes = unlikes
re_title = re.compile(',title: \'([\W\w]*?)\'')
re_con = re.compile('con: \'([\w\W]*?)\'')
re_userName = re.compile('userName: \'([\w\W]*?)\'')                                                                                                                                                                                                                                                                                                                                                    
re_createTime = re.compile('createTime: \'([\w\W]*?)\'')
re_answer_id = re.compile("type=\"text\/javascript\">[\n ]+?F\.context\('answers'\)\['(\d+?)'")
re_ans_content = re.compile("id=\"(.*?)\" accuse=\"aContent\"")
re_get_tag = re.compile(',tags: \'(.*?)\'')
# (os.listdir('data/jrm/html'))
answer_list = []
sum = 0
sum_total = 0

def init(filename,user='alldata'):
    connection = connect()
    conn = connection.cursor()
    # sum_total.value +=1
    # if sum_total.value %100 == 0:
    #     print(sum_total.value)
    # # try:
    #     with open(f'data/{user}/html/'+filename,'r',encoding='utf-8') as f:
    #         f.read()
    #         pass
    # except:
    #     with open(f'data/{user}/html/'+filename,'r',encoding='gbk') as f:
    #         f = f.read()
    #     with open(f'data/{user}/html/'+filename,'w',encoding='utf-8') as ff:
    #         ff.write(f)
    answer_list = []
    try:
        with open(f'data/{user}/html/'+filename,'r',encoding='utf-8') as f:
                f = f.read()
                soup = BeautifulSoup(f,'lxml')
                ask_title = re.search(re_title,f).group(1)
                ask_content = re.search(re_con,f).group(1)
                try:
                    ask_id = (re.search(re_userName,f).group(1))
                except:
                    ask_id = ("none")
                ask_time = (re.search(re_createTime,f).group(1))
                ans_id = (re.findall(re_answer_id,f))
                ans_content = (re.findall(re_ans_content,f))
                ask_tag = re.search(re_get_tag,f).group(1).split('_')
                num = 0
                Time = ask_time
                if ask_id == "":
                    ask_id = "匿名用户"
                if ask_time.find('-') ==-1:
                    Time = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime(int(ask_time)))
                sql = 'INSERT INTO web_project."user" ("userId", username, password) VALUES (%s, %s, %s) ON CONFLICT ("userId") DO NOTHING ;'
                conn.execute(
                        sql,(ask_id,ask_id,'import_user')
                    )
                sql = '''INSERT INTO web_project.quiz ("userId", time, title, content, "keyWords", "like", dislike,
                max_like_reply_id, ans_num, like_id,star_id)
                VALUES (%s::varchar(100), %s::timestamp, %s::varchar(255), %s::text,
                %s ,0::integer, 0::integer, DEFAULT, DEFAULT, DEFAULT,DEFAULT) RETURNING qid'''
                qid = conn.execute(
                        sql,(ask_id,Time,ask_title,ask_content,ask_tag)
                    )
                qid = conn.fetchall()[0][0]
                for j in range(len(ans_content)-len(ans_id),len(ans_id)):
                    temp = soup.find(attrs={'id': 'best-answer-'+str(ans_id[num])})
                    if temp is None:
                        temp = soup.find(attrs={'id': 'answer-'+str(ans_id[num])})
                    try:
                        rep_name = (temp.find(attrs={'class':'wgt-replyer-all-uname'}).text.strip())
                        rep_time = (temp.find(attrs={'class':'wgt-replyer-all-time'}).text.strip().replace('推荐于',''))
                    except:
                        if f.find('问一问') != -1:
                            rep_name = (temp.find(attrs={'class':'username'}).text.strip())
                            rep_time = (temp.get('data-createtime'))
                            if rep_time is not None:
                                rep_time = rep_time.replace('推荐于','')
                    content = temp.find_all(attrs={'id':ans_content[j]})
                    if content!=0:
                        content = content[0].text.strip()
                    else:
                        content = ''
                    if content[:4] == '展开全部':
                        content = content[4:].strip()
                    rep_content = (content)
                    like_and_dislike = temp.select('span[data-evaluate]')
                    try:
                        rep_like = like_and_dislike[0].get('data-evaluate')
                    except:
                        rep_like = '0'
                    try:
                        rep_dislike = like_and_dislike[1].get('data-evaluate')
                    except:
                        rep_dislike = '0'
                    if rep_name == "":
                        rep_name = "匿名用户"
                    sql = 'INSERT INTO web_project."user" ("userId", username, password) VALUES (%s, %s, %s) ON CONFLICT ("userId") DO NOTHING ;'
                    conn.execute(
                            sql,(rep_name,rep_name,'import_user')
                        )
                    answer_list.append(Reply(rep_name,rep_time,rep_content,rep_like,rep_dislike).__dict__)
                    sql = '''INSERT INTO web_project.answer ("userId", qid, time, content, "like", dislike, like_id)
                        VALUES (%s::varchar(100), %s::integer, %s::timestamp, %s::text, %s::integer,
                        %s::integer, DEFAULT);
                    '''
                    conn.execute(
                        sql,(rep_name,qid,Time,rep_content,rep_like,rep_dislike)
                    )
                    
                    num+=1

                ask = Ask(qid,ask_title,ask_id,ask_time,ask_content,answer_list,ask_tag)
                res_list.append(ask.__dict__)
                connection.commit()
                conn.close()
    except:
        if f.find('知道宝贝找不到问题了') !=-1:
            return
        traceback.print_exc()
        print(filename)

connection = connect()
conn = connection.cursor()
conn.execute('''
    truncate table web_project.answer,web_project.quiz,web_project."user";
    TRUNCATE web_project.quiz,web_project.answer,web_project."user" RESTART IDENTITY CASCADE;
''')
connection.commit()
userlist = os.listdir(f'data/alldata/html/')
res_list = multiprocessing.Manager().list()
sum_total = multiprocessing.Value('i',0)
start_time = time.time()
sum = 0
# for i in tqdm.tqdm(userlist):
#     init(i)
#     if sum >=100:
#         break
#     sum+=1
with multiprocessing.Pool(multiprocessing.cpu_count()) as p:
    for _ in tqdm.tqdm(p.imap(init, (userlist)),total=len(userlist)):
        pass

conn.execute('''
    select setval('web_project.quiz_qid_seq',(select max(qid) from web_project.quiz));
    select setval('web_project.answer_id_seq',(select max(id) from web_project.answer))
''')
connection.commit()
conn.close()
with open('data.json','w') as f:
    f.write(json.dumps(list(res_list),ensure_ascii=False,indent=4))

import json
import os
from bs4 import BeautifulSoup
import time 
import re
import traceback
import tqdm
res_list = []
# testnum = 1
class Ask(object):
    def __init__(self, questionTitle, userId, time, query_text, reply, keyWords):
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
for user in os.listdir('data/'):
    for i in tqdm.tqdm(os.listdir(f'data/{user}/html')):
        try:
            with open(f'data/{user}/html/'+i,'r',encoding='utf-8') as f:
                true_file = f.read()
                pass
        except:
            with open(f'data/{user}/html/'+i,'r',encoding='gbk') as f:
                f = f.read()
            with open(f'data/{user}/html/'+i,'w',encoding='utf-8') as ff:
                ff.write(f)

        answer_list = []
        try:
            with open(f'data/{user}/html/'+i,'r',encoding='utf-8') as f:
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
                            res_dislike = '0'
                        if rep_name == "":
                            rep_name = "匿名用户"
                        answer_list.append(Reply(rep_name,rep_time,rep_content,rep_like,rep_dislike).__dict__)
                        num+=1
                    if ask_id == "":
                        ask_id = "匿名用户"
                    ask = Ask(ask_title,ask_id,ask_time,ask_content,answer_list,ask_tag)
                    res_list.append(ask.__dict__)
                    # testnum -=1
                    # if testnum <=0:
                    #     print(res_list)
                    #     break
        except:
            if f.find('知道宝贝找不到问题了') !=-1:
                continue
            traceback.print_exc()
            print(i)
        # break

with open('data.json','w') as f:
    f.write(json.dumps(res_list,ensure_ascii=False,indent=4))
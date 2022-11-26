import datetime
import json
import os
from bs4 import BeautifulSoup
import time
import re
import traceback
import tqdm
from array import *
print(os.getcwd())      # 返回当前进程的工作目录

print(os.listdir('C:/Users/rql/Desktop/html'))  # 返回指定的文件夹包含的文件或文件夹的名字的列表
sum = 0
ask_list = []
reply_list = []


class ask(object):
    def __init__(self, questionId, userId, time, query_text, reply):
        self.questionId = questionId
        self.userId = userId
        self.time = time
        self.query_text = query_text
        self.reply = reply


class reply(object):
    def __init__(self, userId, time, content, like, unlikes):
        self.userId = userId
        self.time = time
        self.content = content
        self.like = like
        self.unlikes = unlikes

ask_answer_list = []
for i in tqdm.tqdm(os.listdir('C:/Users/rql/Desktop/html')):
    try:
        with open('C:/Users/rql/Desktop/html/'+i, 'r', encoding='utf-8') as f:
            ask_answer = {}
            f = f.read()
            soup = BeautifulSoup(f, 'lxml')
            question = soup.find_all(attrs={'class': 'ask-title'})[0].text  # question
            ask_answer['question'] = question

            answer_list = []
            for list in soup.find_all(attrs={'class': ['bd answer', 'bd answer answer-fold']}):
                answer = {}
                # userId
                userId = soup.find_all(attrs={'class': 'wgt-replyer-all-uname'})[0].text.strip('\n')
                answer['userId'] = userId
                # time
                time_str = str(soup.find_all(attrs={'class': 'wgt-replyer-all-time'})[0].text).strip('\n')
                print(int(time.mktime(time.strptime(time_str, '%Y-%m-%d'))))
                answer['time'] = time.mktime(time.strptime(time_str, '%Y-%m-%d'))

                # content(无法分段、无法获取图片)
                # content = soup.find_all(attrs={'class': 'rich-content-container rich-text-'})[0].text.strip('\n')
                # answer['content'] = content

                # ##########################
                # # 有大问题！好多奇奇怪怪的东西删不掉
                # # content(回复内容中有分段和图片获取实现)
                i = j = k = 0
                for data in soup.find_all(attrs={'class': 'rich-content-container rich-text-'})[0]:
                    # print(data)
                    dataStr = str(data).lstrip('<p>').rstrip('</p>').strip('<br/>')
                    # 图片链接
                    if dataStr.find('ikqb_img_alink') != -1:
                        res = r"(?<=href=\").+?(?=\")|(?<=href=\').+?(?=\')"
                        url = re.findall(res, dataStr, re.I | re.S | re.M)[0]
                        # print(url)
                        answer['url' + str(i)] = url
                        i = i + 1
                    # 图片注释
                    elif dataStr.find('ikqb_image_caption') != -1:
                        tip = dataStr.lstrip('<p class="ikqb_image_caption">').rstrip('</p>')
                        # print(tip)
                        answer['tip' + str(j)] = tip
                        j = j + 1
                    # 文字
                    elif dataStr != '' and dataStr != '\n':
                        answer_str = dataStr
                        # print(answer_str)
                        answer['answer_str' + str(k)] = answer_str
                        k = k + 1
                # print(answer)
                answer_list.append(answer)

                # 设想：在bd-wrap中的F.context('answers')['id']中获取这个用户的id
                # 然后用 id=evaluate-id 中的 class=evaluate-num获取点赞数
                # 再用id=evaluate-bad-id 中的 class=evaluate-num获取踩数
                # 点赞数
                likes = soup.find_all(attrs={'class': 'evaluate-num'})[0].text.strip('\n')
                answer['likes'] = likes
                print('#', likes)
                # 踩数
                unlikes = soup.find_all(attrs={'class': 'evaluate-num'})[0].text.strip('\n')
                answer['unlikes'] = unlikes
                print('#', unlikes)

            print(answer_list)



            # reply
            for j in soup.find_all(attrs={'class': 'wgt-replyer-all-uname'}):
                print(j.text)
                pass
            # name
            time_list = soup.find_all(attrs={'class': 'wgt-replyer-all-time'})
            content_list = soup.find_all(attrs={'class': 'rich-content-container'})
            like_list = re.findall(r"data-evaluate=\"(\d*?)\"", f)
            try:
                ans_len = int(re.findall(r"question-all-answers-title.*?(\d*?)个回答", f)[0])
            except:
                ans_len = 0
            for j in range(len(time_list)):
                print(int(time.mktime(time.strptime(re.findall(r"\d{4}-\d\d-\d\d", time_list[j].text)[0], '%Y-%m-%d'))))
                print(content_list[j].text)
                print(like_list[j*2])
                print(like_list[j*2+1])
                pass
    except:
        traceback.print_exc()
        # if f.find("更多专家") != -1:
        #     sum += 1
        #     continue
        # print(sum)

        # if i == "1052250486299228899.html":
        #     continue
        print(i)
        # print(time_list)
        break
    # break
    print(ask_answer_list)
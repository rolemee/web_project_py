import meilisearch
import json
import tqdm
from pypinyin import pinyin, lazy_pinyin, Style
# print(lambda pinyin_list[0]: ''.)
with open('data.json','r') as f:
    json_data= json.load(f)
meili_json_list = []
num = 1
for i in tqdm.tqdm(json_data):
    meili_json_list.append({
        "id": num,
        "title":i['questionTitle'],
        'title_pinyin': ''.join(lazy_pinyin(i['questionTitle'])),
        'title_pinyin_space': ' '.join(lazy_pinyin(i['questionTitle'])),
        'title_pinyin_firstLetter' : ''.join(lazy_pinyin(i['questionTitle'],style=Style.FIRST_LETTER)),
        'keyWords':' '.join(i['keyWords'])
    })
    num+=1

# print(meili_json_list)
with open('meili.json','w') as a:
    a.write(json.dumps(meili_json_list,ensure_ascii=False,indent=4))
client = meilisearch.Client('http://localhost:7700')
client.index('web_project').delete()
print(client.index('web_project').add_documents(json.load(open('meili.json'))))
client.index('web_project').update_searchable_attributes(['title','title_pinyin','title_pinyin_space','title_pinyin_firstLetter','keyWords'])  
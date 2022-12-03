import parse
import os
import psycopg2
from tqdm import tqdm
import meilisearch
import pickle
import pypinyin
import multiprocessing

f = open("./tags",'rb')
tags = pickle.load(f)
database_ = "QADiscuz"
password_ = ""
host_ = "127.0.0.1"
port_ = "5432"
con = psycopg2.connect(database=database_, host=host_, port=port_)
meili = meilisearch.Client('http://localhost:7700', '123')
cur = con.cursor()

admin_name = "admin"
admin_pw = "admin"
admin_id = "e718123b-f31b-469e-94a7-be6ab5c37e9d"

cur.execute('TRUNCATE TABLE "user", questions, answer')
meili.index('qa').delete()
meili.index('qa').update_searchable_attributes(['title', 'description', "title_py", "description_py", "tag_py","tag"])

# 检测并创建管理员admin
cur.execute("""SELECT uuid FROM "user" WHERE uuid = %s;""", (admin_id,))
res = cur.fetchall()
if len(res) == 0:
    cur.execute("""INSERT INTO "user"(username, password, uuid) VALUES(%s, %s, %s);""", (
        admin_name, admin_pw, admin_id))
cur.close()

umap={}

def import_data(f):
    resp,tag=parse.parse(f),tags[f.split('/')[-1]]
    if resp is None:
        return
    qt, qd, anss = resp  # 提问标题 提问描述, 回答元组
    with con.cursor() as cur:
        print(1)
        cur.execute("""INSERT INTO questions(uid, username, title, description,tag) VALUES(%s, %s, %s, %s,%s) RETURNING qid;""",
                    (admin_id, admin_name, qt, qd,(tag,)))
        qid = cur.fetchone()[0]

        for ansp, anst, ans in anss:  # 回答用户, 回答时间, 回答内容
            if ansp not in umap:
                cur.execute(
                    """INSERT INTO "user"(username, password) VALUES(%s, %s) RETURNING uuid;""", (ansp, ""))
                uid = cur.fetchall()[0][0]
                umap[ansp]=uid
            else:
                uid = umap[ansp]

            cur.execute("""INSERT INTO answer(username, uid, text, time, qid) VALUES(%s, %s, %s, %s, %s);""",
                        (ansp, uid, ans, anst, qid))
        tag_py=' '.join((map(lambda t: ' '.join(pypinyin.lazy_pinyin(t)), tag)))
        meili.index('qa').add_documents({
            "qid":qid,
            "title": qt,
            "description": qd,
            "tag":tag,
            "title_py": ' '.join(pypinyin.lazy_pinyin(qt)),
            "description_py": ' '.join(pypinyin.lazy_pinyin(qd)),
            "tag_py": tag_py
        })


if __name__ == "__main__":
    root = os.path.join(os.getcwd(), "Temp")
    files = [os.path.join(root, f) for f in os.listdir(root)]
    with multiprocessing.Pool(12) as p:
        p.map(import_data, files)

con.commit()
con.close()
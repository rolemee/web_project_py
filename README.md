# Web-Project


## 1.下载项目
```
git clone https://github.com/rolemee/web_project_py.git
```
## 2.环境依赖
**python=3.10.0**
## 3.使用说明
#### 一.环境安装
``` bash
cd web_project_py
pip install -r requirements.txt
mkdir ./app/data
mkdir ./app/data/alldata
```
#### 二.meilisearch安装（docker）
``` bash
docker run -it --rm \
-p 7700:7700 \
-v $(pwd)/meili_data:/meili_data \
getmeili/meilisearch:v0.29
```
#### 三.postgresql
自行安装。安装好后建立rolemee的无密码用户，然后再创建web-project的schema.然后与奴性init.sql
#### 四.数据导入
讲爬取到的百度知道的数据放入data/alldata中。如果为转成utf-8 请将`data.py` 中49-60行注释打开。
#### 五.初始化
``` bash
python data.py
```
``` bash
python data2meili.py
```

## 四.启动
测试环境
``` bash
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```
生产环境
``` bash
uvicorn main:app --host 0.0.0.0 --port 8000 --log-level error --workers 16
```
`--workers` 参数根据自己的cpu自行调整
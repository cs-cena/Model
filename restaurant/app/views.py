# -*-coding:utf-8 -*-
from flask import request, render_template, jsonify
from flask import g
from app import app
import sqlite3
import json


DATABASE = r'C:\Users\Administrator\Desktop\Model\restaurant\restaurant.db'


def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
        db.row_factory = sqlite3.Row
    return db


#在数据库操作结束后，自动关闭链接
@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()


#查询数据接口
def query_db(query, args=(), one=False):
    cur = get_db().execute(query, args)
    rv = cur.fetchall()
    cur.close()
    return (rv[0] if rv else None) if one else rv


#插入数据接口 db是数据库链接可以作提交，cur是游标不能作提交，只能查询和关闭
def save_db(query, args=()):
    db = get_db()
    cur = db.execute(query, args)
    cur.close()
    db.commit()


#查询数据
@app.route('/data', methods=['GET'])
def data():

    if request.method == "GET":

        res = query_db( 
            '''
            SELECT Dname, did
            FROM Dishes
            '''
        )
        
        return jsonify(dname=[i[0] for i in res],
                        did=[i[1] for i in res] )


#渲染主页
@app.route('/menu', methods=['GET'])
def menu():
    return render_template("menu.html")


#flask接收客户端post的json数据
@app.route('/menulist', methods=["POST"])
def menu_list():
    if request.method == "POST":
        rq = json.loads(request.get_data().decode('utf-8')) 
        sql = 'insert into test(meal, amount, total) values(?, ?, ?)'
        for k,v in rq.items():
            save_db(sql, [k, v[0], v[1]])
        return jsonify(rq)


#flask接收客户端的get请求，读取本地json文件并将文件内容返回给客户端
@app.route('/read_json/<json_name>', methods=['GET'])
def test_js(json_name):
    filename = json_name
    path = r"C:/Users/Administrator/Desktop/Model/restaurant/app/"  #json文件所在的目录路径
    with open(path + filename) as f:
        jsonStr = json.load(f)
        return json.dumps(jsonStr)


#flask接收客户端的form数据
@app.route('/diary', methods=["POST"])
def diary():
    date = request.form.get("diary-date")
    restaurant = request.form.get("diary-restaurant")
    context = request.form.get("diary-context")
    info = {
        "date": date,
        "restaurant": restaurant,
        "context": context
    }
    return jsonify(info)


#http://127.0.0.1:5000/menu
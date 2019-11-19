# -*-coding:utf-8 -*-
from flask import request, render_template, jsonify
from flask import g
from app import app
import sqlite3
import json


DATABASE = r'C:\Users\Administrator\Desktop\finance\finance.db'


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

            '''
        )
        
        return jsonify(dname=[i[0] for i in res],
                        did=[i[1] for i in res] )


#渲染主页
@app.route('/finance', methods=['GET'])
def finance():
    return render_template("finance.html")


#flask接收客户端的get请求，查询数据库 并返回json给客户端
@app.route('/dailycost', methods=['GET'])
def dailycost():
    if request.method == "GET":
        res = query_db( 
        '''
            SELECT * FROM dealrecord
            
            LIMIT 2
        '''
        )

        daily_list = []  
        #i就是一行数据    
        for i in res:
            daily_sec = {} 
            daily_sec["date"] = i[0]
            daily_list.append(daily_sec)

    return jsonify(diary_list)
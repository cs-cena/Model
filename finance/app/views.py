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
@app.route('/invest', methods=['GET'])
def invest():
    if request.method == "GET":
        res = query_db( 
        '''
        SELECT strftime("%Y-%m", fdate) AS date, sum(fpay)
        FROM dealRecord
        WHERE fclass in ("P2P投资", "P2P还款")
        GROUP BY date
        ORDER BY date DESC
        LIMIT 12
        '''
        )

    return jsonify(date = [i[0] for i in res],
                    invest = [i[1] for i in res])


@app.route('/debt', methods=['GET'])
def debt():
    if request.method == "GET":
        res = query_db( 
        '''
        SELECT strftime("%Y-%m", fdate) AS date, sum(fpay)
        FROM dealRecord
        WHERE fclass in ("信贷还款", "百度还款")
        GROUP BY date
        ORDER BY date DESC
        LIMIT 12
        '''
        )

    return jsonify(date = [i[0] for i in res],
                    debt = [i[1] for i in res])


@app.route('/gf', methods=['GET'])
def gf():
    if request.method == "GET":
        res = query_db( 
        '''
        SELECT strftime("%Y-%m", fdate) AS date,
        sum(case when fClassDetail LIKE "%雅%" then fpay end) gfPay,
        sum(case when fClassDetail NOT LIKE "%雅%" and fclass = "杂类支出" then fpay end) otherPay
        from dealRecord
        GROUP BY date
        ORDER BY date DESC
        LIMIT 12
        '''
        )

    return jsonify(date = [i[0] for i in res],
                    gfpay = [i[1] for i in res],
                    otherpay = [i[2] for i in res],)


@app.route('/total', methods=['GET'])
def total():
    if request.method == "GET":
        res = query_db( 
        '''
        SELECT strftime("%Y-%m", fdate) AS date, 
        sum(case when fclass in ("工作餐", "周末餐费") then fpay end) meal,
        sum(case when fclass in ("麦当劳") then fpay end) mc,
        sum(case when fclass in ("交通费") then fpay end) traffic,
        sum(case when fclass in ("杂类支出") then fpay end) other,
        sum(case when fclass in ("信贷还款", "百度还款") then fpay end) debt,
        sum(case when fclass in ("P2P投资", "P2P还款") then fpay end) invest
        FROM dealRecord
        GROUP BY date
        ORDER BY date DESC
        LIMIT 12
        '''
        )

    return jsonify(date = [i[0] for i in res],
                   meal = [i[1] for i in res],
                   mc = [i[2] for i in res],
                   traffic = [i[3] for i in res],
                   other = [i[4] for i in res],
                   debt = [i[5] for i in res],
                   invest = [i[6] for i in res],
                    )
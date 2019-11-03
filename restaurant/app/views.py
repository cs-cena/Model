# -*-coding:utf-8 -*-
from flask import request, render_template, jsonify
from app import app
import sqlite3
import json


DATABASE = r'C:\Users\Administrator\Desktop\modle\restaurant\restaurant.db'


def get_db():
	
    db = sqlite3.connect(DATABASE)
    db.row_factory = sqlite3.Row
    return db


def query_db(query, args=(), one=False):
    db = get_db()
    cur = db.execute(query, args)
    db.commit()
    rv = cur.fetchall()
    db.close()
    return (rv[0] if rv else None) if one else rv


@app.route('/menu111', methods=['GET'])
def menu1111():

	if request.method == "GET":

		res = query_db(	
			'''
			SELECT *
			FROM dishes
			'''
		)
		return jsonify(did=[i[0] for i in res])


@app.route('/menu', methods=['GET'])
def menu():
	return render_template("menu.html")


#flask接收客户端的get请求，读取本地json文件并将文件内容返回给客户端
@app.route('/read_json/<json_name>', methods=['GET'])
def test_js(json_name):
	filename = json_name
	path = r"C:/Users/Administrator/Desktop/Model/restaurant/app/"  #json文件所在的目录路径
	with open(path + filename) as f:
		jsonStr = json.load(f)
		return json.dumps(jsonStr)

#flask接收客户端post的json数据
@app.route('/menulist', methods=["POST"])
def menu_list():
	if request.method == "POST":
		rq = json.loads(request.get_data().decode('utf-8'))	
		return jsonify(rq)

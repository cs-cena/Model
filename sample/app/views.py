# -*-coding:utf-8 -*-
from flask import request, render_template, jsonify
from app import app
import sqlite3


DATABASE = r'C:\Users\***\Desktop\project\test_monitor\spider.db'


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


@app.route('/db/kanong', methods=['GET'])
def db_kanong():

	if request.method == "GET":

		res = query_db(	
			'''
			select 
			user_group
			,count(uid) as aa
			from kanong_users
			where register_time > "2019/5/1 00:01" 
			group by user_group
			order by aa ASC
			'''
		)

		return jsonify(usergroup=[i[0] for i in res],
						countuid=[i[1] for i in res])


@app.route('/')
def index():
	return render_template('figure.html')

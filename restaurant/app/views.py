# -*-coding:utf-8 -*-
from flask import request, render_template, jsonify
from app import app
import sqlite3


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


@app.route('/menu', methods=['GET'])
def menu():

	if request.method == "GET":

		res = query_db(	
			'''
			SELECT *
			FROM dishes
			'''
		)
		return jsonify(did=[i[0] for i in res])


@app.route('/orderlist')
def index():
	return render_template('figure.html')

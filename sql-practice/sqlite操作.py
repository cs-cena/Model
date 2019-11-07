# -*- coding: utf-8 -*-
"""
Created on Tue Oct 29 21:02:47 2019

@author: Administrator
"""

import sqlite3 as sq
import csv
#import pandas as pd



if __name__ == '__main__':
        
    file_path = r'C:\Users\Administrator\Desktop\Model\restaurant\restaurant.db'

    conn = sq.connect(file_path)
    cur = conn.cursor()

    print("Opened database successfully")

    cur.execute('''CREATE TABLE test (
        meal TEXT, 
        amount INTEGER, 
        total REAL
    );''')

    #print(cur.fetchall())

    cur.close()
    conn.commit()
    conn.close()

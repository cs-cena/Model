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

    cur.execute('''
    insert into diary values
    ('2019-11-09', '麦当劳', '今天点了正在搞会员价的麦辣鸡腿汉堡，原来想点辣翅，但是中午才吃了烤鸭，已经吃油了想想就算了，所以就再选了12元随心配——锡兰红茶+麦乐鸡块。因为红茶太烫了，就要了点冰块。棒！不过后来加多了，茶凉了。');
    ''')

    #print(cur.fetchall())

    cur.close()
    conn.commit()
    conn.close()

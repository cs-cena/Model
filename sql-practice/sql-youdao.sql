SQL执行顺序

FROM

ON

JOIN

WHERE

GROUP BY

聚合函数

HAVING

SELECT

DISTINCT

ORDER BY

TOP


--查询同名同性学生名单，并统计同名人数
/*
SELECT st.sname, st.ssex, count(st.sname) AS 同名人数
FROM student as st
GROUP BY st.sname
HAVING 同名人数 > 1
*/

--查询 1990 年出生的学生名单
/*
SELECT *
FROM Student as st
WHERE strftime("%Y", st.sage) = "1990"
*/

--查询每门课程的平均成绩，结果按平均成绩降序排列，平均成绩相同时，按课程编号升序排列
/*
SELECT sc.cid, avg(sc.score) as avg_sc
FROM SC
GROUP BY sc.cid
ORDER BY avg_sc DESC, sc.cid 
*/

--查询平均成绩大于等于 85 的所有学生的学号、姓名和平均成绩
/*
SELECT st.sid, st.sname, avg(sc.score) as avg_sc
FROM student as st
INNER JOIN sc
ON st.sid = sc.sid
GROUP BY st.sid
HAVING avg_sc >= 85
*/

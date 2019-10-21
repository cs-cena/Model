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

--查询课程名称为「数学」，且分数低于60的学生姓名和分数
/*
SELECT st.sname, t.score
FROM Student AS st, 
(
SELECT sc.sid, sc.score
FROM sc, Course as cor
WHERE SC.cid = cor.cid
AND cor.cname = "数学"
AND sc.score < 60
) t
WHERE t.sid = st.sid
*/


--查询所有学生的课程及分数情况（存在学生没成绩，没选课的情况）
/*
SELECT *
FROM Student AS st
LEFT JOIN sc 
ON st.sid = SC.sid
*/


--查询任何一门课程成绩在 70 分以上的姓名、课程名称和分数
/*
SELECT st.sname, cor.cname, sc.score
FROM Student AS st, SC, Course AS cor
WHERE SC.cid = cor.cid
AND sc.score > 70
AND st.sid = SC.sid
*/

--查询存在不及格的课程
/*
SELECT DISTINCT sc.cid
FROM SC
WHERE sc.score < 60
*/


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

--查询不同课程成绩相同的学生的学生编号、课程编号、学生成绩【where exists 和自己比】
/*
SELECT *
FROM SC AS t1
WHERE EXISTS(
SELECT *
FROM SC AS t2
WHERE t1.sid = t2.sid
AND t1.cid != t2.cid
AND t1.score = t2.score
)
*/

--查询每门功成绩最好的前两名
/*
SELECT *
FROM SC as t1
WHERE 
( SELECT count(*)
FROM SC AS t2
WHERE t1.cid = t2.cid
AND t1.score < t2.score
) < 2
ORDER BY t1.cid
*/

--统计每门课程的学生选修人数（超过 5 人的课程才统计）
/*
SELECT sc.cid, count(sc.sid)
FROM SC
GROUP BY SC.CId
HAVING count(sc.sid)>5
*/

--检索至少选修两门课程的学生学号
/*
SELECT SC.SID
FROM SC
GROUP BY SC.SId
HAVING count(sc.cid) >= 2 
*/

--查询选修了全部课程的学生信息
/*
SELECT SC.SID
FROM SC
GROUP BY SC.SId
HAVING count(sc.cid) = (SELECT count(Cor.CID)
FROM Course as cor)
*/


--查询各学生的年龄，只按年份来算
/*
SELECT st.sid, (strftime('%Y', "now") - strftime('%Y', st.Sage)) as age
FROM Student AS st
*/

--按照出生日期来算，当前月日 < 出生年月的月日则，年龄减一
/*
SELECT st.sid, (CASE WHEN strftime('%m-%d', "now")-strftime('%m-%d', st.Sage) < 0 THEN t.age-1 ELSE t.age END) AS age
FROM Student AS st,
(SELECT st.sid, (strftime('%Y', "now") - strftime('%Y', st.Sage)) as age
FROM Student AS st
) AS t
WHERE t.sid = st.SId
*/


--查询本周过生日的学生
/*
SELECT st.sid, st.sname
FRoM student AS st 
WHERE strftime('2019-%m-%d', st.sage) BETWEEN date('now', 'start of day', '-7 day', 'weekday 1') AND date('now', 'start of day', 'weekday 0');
*/

--weekday N N为周几，一周设定奇怪，56是本周的周五这周六。01234是下周的周天周一到周四
--含义是返回第一个时间参数（或修饰过后的时间）所在周的下一周的周几。会加一周
--SELECT date('now', 'start of day', '-7 day', 'weekday 0')


--查询下周过生日的学生
/*
SELECT st.sid, st.sname
FRoM student AS st 
WHERE strftime('2019-%m-%d', st.sage) BETWEEN date('now', 'start of day', 'weekday 1') AND date('now', 'start of day', '+7 day', 'weekday 0');
*/


--查询本月过生日的学生
/*
SELECT st.sid, st.sname
FRoM student AS st 
WHERE strftime('2019-%m-%d', st.sage) BETWEEN date('now', 'start of month') AND date('now', 'start of month', '+1 month', '-1 day')
*/

--查询下月过生日的学生
/*
SELECT st.sid, st.sname
FRoM student AS st 
WHERE strftime('2019-%m-%d', st.sage) BETWEEN date('now', 'start of month', '+1 month') AND date('now', 'start of month', '+2 month', '-1 day') 
*/
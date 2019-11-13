//menu
const plusBtns = document.querySelectorAll("#plus")
const minusBtns = document.querySelectorAll("#minus")
const mealAmounts = document.querySelectorAll("#mealAmount")
const prices = document.querySelectorAll("#price")
const total = document.querySelector("#priceTotal")
const sendBtn =  document.querySelector("#submitPriceTotal")
const mealName =  document.querySelectorAll("#mealName")
//diary
const diary = document.querySelector("#diary")
const dairyTxt = document.querySelector("textarea")
const diarySendBtn = document.querySelector("#diarySendBtn")
const diaryDate = document.querySelector("#diaryDate")
const diaryRestaurant = document.querySelector("#diaryRestaurant")
const diaryContext = document.querySelector("#diaryContext")
const diaryResetBtn = document.querySelector("#diaryResetBtn")

//---------- diary ---------- 
/* 
*1 按diary-section生成对应element。
*已解决： 1 日期选择、餐厅选择 2 生成对应html的dom结构
*2 获取提交内容
*难点：直接form提交 会跳转 因此希望用异步提交表单
*已解决： 1 js如何获得前端form数据 2 用fetch异步post 3 时间格式转换

to do:
*3.1 建diary表
*3.2 添加新记录时，写进数据库。
*3.3 初始/刷新渲染时从数据库里拿过去5次的diary记录并显示。
*/

//时间格式转换 如"2019-11-12"转成"2019年11月12日"
function date_transform(date) {
    let d = new Date(date)
    year = d.getUTCFullYear()//年
    month = d.getMonth()+1 //月 原型里0-1
    day = d.getDate() //日
    date = year+"年"+month+"月"+day+"日"
    return date
}

//在html添加新一天的diary记录
function createDiaryTxt(json) {
    let ds = document.createElement("div")
    ds.setAttribute("class", "diary-section")
    diary.appendChild(ds)

    let h = document.createElement("h3")
    h.textContent = date_transform(json["date"]) + " " + json["restaurant"]    
    ds.appendChild(h)

    let dc = document.createElement("div")
    dc.setAttribute("class", "diary-context")
    ds.appendChild(dc)

    let newContent = document.createTextNode(json["context"])
    dc.appendChild(newContent)

    let hr = document.createElement("hr")
    ds.appendChild(hr)
}

//清空date restaurant context的内容
function clean() {
    diaryDate.value = ""
    diaryRestaurant.value = ""
    diaryContext.value = ""
}

//“重置”按钮
diaryResetBtn.onclick = function() {
    clean()
}

//当按“提交”按钮时，想服务器发送表单数据，并在html上添加新的diary记录
diarySendBtn.onclick = function() {

    diaryJson = {
        "date": diaryDate.value,
        "restaurant": diaryRestaurant.value,
        "context": diaryContext.value
    }
    
    let req = new Request("/diary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        mode: "cors",
        body: JSON.stringify(diaryJson)
    })

    return fetch(req)
    .then(function(response) {
        if(response.ok) {
            return response.json()          
        }
    })
    .then(function(json) {
        //console.log(json)
        createDiaryTxt(json)
        clean()
    })  
}

//---------- /diary ----------

//---------- menu ----------

/*
for (let i = 0; i < btns.length; i++) {
    let times = 1
    btns[i].onclick  = function(e) {
        e.target.textContent = times
        times++
    }
}
*/

//
let p = []

//求总价
function sumPrices() {

    let totalPrice = 0
    for (let i = 0; i < p.length; i++) {
        if (p[i]) {
            totalPrice = p[i] + totalPrice
        }
    }

    return  totalPrice
}

//menuJson = {"":[]}
let menuJson = {}

//加按钮
for (let i = 0; i < plusBtns.length; i++) {
    plusBtns[i].onclick  = function() {
        mealAmounts[i].textContent++
        prices[i].textContent = "￥" + 34.5 * mealAmounts[i].textContent
        p[i] = 34.5 * mealAmounts[i].textContent

        totalPrice = sumPrices()
        total.textContent = "￥" + totalPrice

        menuJson[mealName[i].textContent] = [Number(mealAmounts[i].textContent), totalPrice]

    }
}

//减按钮
for (let i = 0; i < minusBtns.length; i++) {
    minusBtns[i].onclick  = function() {
        let ma = mealAmounts[i].textContent
        if (ma <= 0) {
            ma = 0
        } else {
            mealAmounts[i].textContent--
            prices[i].textContent = "￥" + 34.5 * mealAmounts[i].textContent
            p[i] = 34.5 * mealAmounts[i].textContent
            totalPrice = sumPrices()            
            total.textContent = "￥" + totalPrice

            menuJson[mealName[i].textContent] = [Number(mealAmounts[i].textContent), totalPrice]
        }
    }
}


/*
//验证可行 方法1：XHR(Ajax请求) 向服务器发送菜单json数据。不需要放回之前的事件里
sendBtn.onclick = function() {
    //发送页面数据据到服务端
    let url = "/menulist"
    var request = new XMLHttpRequest()
    request.open("POST", url)
    request.setRequestHeader("Content-Type","application/json")
    request.send(JSON.stringify(menuJson))
    
    //接受服务端数据
    request.onload = function() {
        let rq = JSON.parse(request.response)
        alert(Object.keys(rq))
    }
}
*/


//验证可行 方法2：Fetch 向服务器发json, fetch前一定要写return。每一层then都要写return才能让下一层接收到。
sendBtn.onclick = function() {
    let req = new Request("/menulist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        mode: "cors",
        body: JSON.stringify(menuJson)
    })

    return fetch(req)
    .then(function(response) {
        if(response.ok) {
            return response.json()          
        }
    })
    .then(function(json) {
        console.log(json)   
    })
}


/*Fethch-POST请求 必须先写
//json()返回json text()返回文本 JSON.stringify()JSON对象转json字符串
let req = new Request("/menulist", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    mode: "cors",
    body: JSON.stringify(menuJson)
})
*/

/*
//fetch请求写法1 验证可行 但切记第一层then里面的response要加return 
fetch(req)
    .then(function(response) {
        if(response.ok) {
            return response.json()          
        }
    })
    .then(function(json) {
        console.log(json)   
    })
*/

/*
//fetch请求写法2 验证可行
fetch(req).then(function(response) {
    if(response.ok) {
        response.json().then(function(json) {
            console.log(json)
        });
    } else {
    console.log("Network request for products.json failed with response " + response.status + ": " + response.statusText);
    }
})
*/

/*
//fetch请求客户端json数据 验证可行
fetch("/read_json/test.json").then(function(response) {
    if(response.ok) {
        response.json().then(function(json) {
            console.log(json)
        });
    } else {
    console.log("Network request for products.json failed with response " + response.status + ": " + response.statusText);
    }
})
*/

//---------- /menu ----------

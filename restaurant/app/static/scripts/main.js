const plusBtns = document.querySelectorAll('#plus')
const minusBtns = document.querySelectorAll('#minus')
const mealAmounts = document.querySelectorAll('#meal-amount')
const prices = document.querySelectorAll('#price')
const total = document.querySelector('#price-total')
const sendBtn =  document.querySelector('#submit-price-total')
const mealName =  document.querySelectorAll('#meal-name')


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

	return 	totalPrice
}


//menuJson = {"":[]}
let menuJson = {}

//加减按钮
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
	request.open('POST', url)
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
	let req = new Request('/menulist', {
		method: "POST",
		headers: { 'Content-Type': 'application/json' },
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



/*
//Fethch-POST请求  json()返回json text()返回文本 JSON.stringify()JSON对象转json字符串
let req = new Request('/menulist', {
	method: "POST",
	headers: { 'Content-Type': 'application/json' },
	mode: "cors",
	body: JSON.stringify(menuJson)
})
*/

/*
//写法1 验证可行 但切记第一层then里面的response要加return 
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
//写法2 验证可行
fetch(req).then(function(response) {
	if(response.ok) {
		response.json().then(function(json) {
			console.log(json)
		});
	} else {
    console.log('Network request for products.json failed with response ' + response.status + ': ' + response.statusText);
  	}
})
*/

/*
//Fetch 请求客户端json数据
fetch('/read_json/test.json').then(function(response) {
	if(response.ok) {
		response.json().then(function(json) {
			console.log(json)
		});
	} else {
    console.log('Network request for products.json failed with response ' + response.status + ': ' + response.statusText);
  	}
})
*/



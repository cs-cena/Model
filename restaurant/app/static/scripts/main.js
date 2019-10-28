const plusBtns = document.querySelectorAll('#plus')
const minusBtns = document.querySelectorAll('#minus')
const mealAmounts = document.querySelectorAll('#meal-amount')
const prices = document.querySelectorAll('#price')
const total = document.querySelector('#total')

/*
for (let i = 0; i < btns.length; i++) {
	let times = 1
	btns[i].onclick  = function(e) {
		e.target.textContent = times
		times++
	}
}
*/

//加减按钮
for (let i = 0; i < plusBtns.length; i++) {
	plusBtns[i].onclick  = function() {
		mealAmounts[i].textContent++
		prices[i].textContent = "￥" + 34.5 * mealAmounts[i].textContent
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
		}
	}	
}


//求总 有些问题
let totalPrice = 0
for (let i = 0; i < prices.length; i++) {	
	totalPrice = Number(prices[i].textContent.replace('￥','')) + totalPrice
}
const tt = total.getAttribute('placeholder')
tt.setAttribute('placeholder', String(totalPrice))

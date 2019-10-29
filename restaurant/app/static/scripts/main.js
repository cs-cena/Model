const plusBtns = document.querySelectorAll('#plus')
const minusBtns = document.querySelectorAll('#minus')
const mealAmounts = document.querySelectorAll('#meal-amount')
const prices = document.querySelectorAll('#price')
const total = document.querySelector('#price-total')
const totalBtn =  document.querySelector('#submit-price-total')


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


//加减按钮
for (let i = 0; i < plusBtns.length; i++) {
	plusBtns[i].onclick  = function() {
		mealAmounts[i].textContent++
		prices[i].textContent = "￥" + 34.5 * mealAmounts[i].textContent
		p[i] = 34.5 * mealAmounts[i].textContent

		totalPrice = sumPrices()

		total.textContent = "￥" + totalPrice
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
		}
	}	
}




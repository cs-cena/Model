const btns = document.querySelectorAll('#meal')


for (let i = 0; i < btns.length; i++) {
	let times = 1
	btns[i].onclick  = function(e) {
		e.target.textContent = times
		times++
	}
}
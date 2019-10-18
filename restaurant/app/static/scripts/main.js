const btns = document.querySelectorAll('#meal')

let times = 1
for (let i = 0; i < btns.length; i++) {
	btns[i].onclick  = function(e) {
		e.target.textContent = times
		times++
	}
}
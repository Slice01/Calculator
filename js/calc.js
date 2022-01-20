const allButtons = document.querySelectorAll('.buttons');
const buttons = document.querySelectorAll('.button');
const buttonBS = document.querySelector('.buttonBS');
const buttonsOp = document.querySelectorAll('.buttonOp');
const buttonEq = document.querySelector('.buttonEq');
const buttonCl = document.querySelector('.buttonCl');
const display = document.getElementById('displayText');
const memoryDisplay = document.getElementById('memoryNumber');
let oper;
let aAsNum = 0;
let aAsString = '0';
let bAsNum = 0;
let bAsString;
let dotFlag;
let btn;

function removeClass() {
	this.classList.remove('pressed');
}

function add(aAsNum, bAsNum){
	return bAsNum + aAsNum;
};

function subtract(aAsNum, bAsNum) {
	return bAsNum - aAsNum;
};

function multiply(aAsNum, bAsNum) {
	return bAsNum * aAsNum;
};

function divide(aAsNum, bAsNum) {
	return bAsNum / aAsNum;
};

function operate(oper, aAsNum, bAsNum) {
	switch (oper) {
		case '+':
			return add(aAsNum, bAsNum);
			break;
		case '-':
			return subtract(aAsNum, bAsNum);
			break;
		case 'x':
			return multiply(aAsNum, bAsNum);
			break;
		case '/':
			return divide(aAsNum, bAsNum);
			break;
		default:
			console.log('non-operator');
	};
};

function pressBackspaceButton() {
	if (display.textContent.length == 1) {
		aAsString = '0';
	} else {
		aAsString = display.textContent.slice(0,-1);
	};
	aAsNum = parseFloat(aAsString);
	display.textContent = aAsString;
	this.classList.add('pressed');
};

function pressClearButton() {     ///Set variables to 0
	aAsNum = 0;
	bAsNum = 0;
	aAsString = '0';
	bAsString = '0';
	memoryDisplay.textContent = '';
	display.textContent = '0';
	dotFlag = 'off';
	this.classList.add('pressed');
}

function pressEqualButton() {	///Check for dividing by zero, check for if no operator has been selected
	if ((oper == '/') && (aAsNum == 0)) {
		display.textContent = 'You know better!';
		oper = 'reset';
	} else if (oper == null) {
		memoryDisplay.textContent = Math.round(display.textContent * 100000000) / 100000000 + ' ' + '=';
		display.textContent = Math.round(display.textContent * 100000000) / 100000000;
		oper = 'reset';
	} else {
		memoryDisplay.textContent = bAsString + ' ' + oper + ' ' + Math.round(aAsString * 100000000) / 100000000 + ' ' + '=';
		aAsNum = operate(oper,aAsNum,bAsNum);
		aAsString = String(aAsNum);
		display.textContent = Math.round(aAsString * 100000000) / 100000000;
		oper = 'reset';
		dotFlag = 'off';
	};
	this.classList.add('pressed');
};

function pressOperatorButton() {	///Check for dividing by zero, check to see if there is only one number so far
	if ((oper == '/') && (aAsNum == 0)) {
		display.textContent = 'You know better!';
		oper = 'reset';
	} else {
		if ((oper == null) || (oper == 'reset')) {
			bAsNum = aAsNum;
		} else {
			bAsNum = operate(oper,aAsNum,bAsNum);
		}
		bAsString = String(bAsNum);
		aAsNum = 0;
		aAsString = String(aAsNum);
		memoryDisplay.textContent = Math.round(bAsString * 100000000) / 100000000 + ' ' + this.textContent;		
		display.textContent = Math.round(bAsString * 100000000) / 100000000;
		oper = this.textContent;
		dotFlag = 'off';
	};
	this.classList.add('pressed');
};	

function pressNumberButton() {
	if (oper == 'reset') {
		dotFlag = 'off';
		memoryDisplay.textContent = '';
		aAsNum = 0;
		aAsString = String(aAsNum);
		bAsNum = 0;
		bAsString = '';
		oper = null;
	};
	if (this.textContent == '.') {
		if (dotFlag == 'on') {
		} else {
			if (aAsNum == 0) {
				aAsString = aAsNum + this.textContent;
				aAsNum = parseFloat(aAsString);
				display.textContent = aAsString;
			} else {
				aAsString = aAsString + this.textContent;
				aAsNum = parseFloat(aAsString);
				display.textContent = aAsString;
			};
		dotFlag = 'on';
		};
	} else {
		if (aAsString == '0') {
			aAsString = this.textContent;
			aAsNum = parseFloat(aAsString);
			display.textContent = aAsString
		} else {
			aAsString = aAsString + this.textContent;
			aAsNum = parseFloat(aAsString);
			display.textContent = aAsString;
		};
	};
	this.classList.add('pressed');
};

function keyboardUsed(e) {	///Change idNum if e.key can't be used as html id, run correct function based on button
	switch (e.key){
		case '+':
		case '-':
		case '/':
		case '*':
			switch (e.key){
				case '+':
					idNum = 'keyPlus';
					break;
				case '/':
					idNum = 'keyDivide';
					break;
				case '*':
					idNum = 'keyMultiply';
					break;
				default:
					idNum = 'key' + e.key;
			}
			btn = document.querySelector('#' + idNum);
			pressOperatorButton.call(btn);
			break;
		case 'Enter':
			idNum = 'keyEnter';
			btn = document.querySelector('#' + idNum);
			pressEqualButton.call(btn);
			break;
		case 'Escape':
		case 'Delete':
			idNum = 'keyEscape';
			btn = document.querySelector('#' + idNum);
			pressClearButton.call(btn);
			break;
		case 'Backspace':
			idNum = 'keyBackspace';
			btn = document.querySelector('#' + idNum);
			pressBackspaceButton.call(btn);
			break;
		default:
			switch (e.key){
				case '.':
					idNum = 'keyDot';
					break;
				default:
					idNum = 'key' + e.key;
			}
			btn = document.querySelector('#' + idNum);
			pressNumberButton.call(btn);
	}
	
	const key = document.querySelector(`div[data-key="${e.key}"]`);
	key.classList.add('pressed');
}

window.addEventListener('keydown', keyboardUsed);	
buttons.forEach(btn => btn.addEventListener('click', pressNumberButton));
buttonsOp.forEach(btn => btn.addEventListener('click', pressOperatorButton));
buttonEq.addEventListener('click', pressEqualButton);
buttonCl.addEventListener('click', pressClearButton);
buttonBS.addEventListener('click', pressBackspaceButton);
allButtons.forEach(btn => btn.addEventListener('transitionend', removeClass));
var sum = '';
var count = false;
var stackop = '';
var stacknum = 0;
var arrayNum = [];
var arrayOp = [];
var arrayOpSum = [];
var z = 0;
var number = '';


function add(str, num) {
    var display = document.getElementById('display');
    
    if (str == 'C') {
        display.value = 0;
        arrayOp = [];
        arrayNum = [];
        return;
    } else if (str == '=') {
        if (arrayNum.length == arrayOp.length) {
            alert('잘못된계산')
            return;
        }
        if (!count) {
            stacknum = arrayNum[arrayNum.length-1];
            stackop = arrayOpSum[arrayOpSum.length-1];
        }
        arrayOp = [];
        arrayNum = [];
        arrayOpSum = [];
        arrayNum.push(String(Math.floor(eval(sum) * 10000) / 10000));
        if (count) {
            sum = Math.floor(eval(arrayNum[0] + stackop + stacknum) * 10000) / 10000;
            arrayNum[0] = String(sum);
        }
        count = true;
        display.value = commify(arrayNum[0]);
        return;
    }

    if (arrayNum.length == arrayOp.length) {
        if (str == 'trans') {
            return;
        }else if (str == '+' || str == '-' || str == '÷' || str == '×' ) {
            arrayOp[arrayOp.length-1] = str;
            arrayOpSum[arrayOpSum.length-1] = num;
        }else if (str == '0' && display.value == '0') {
            display.value = '0';
        } else {
            if (display.value == 0) {
                if (str == '.') {
                    str = '0.';
                }
            }
            arrayNum.push(String(str));

        }

    } else if (arrayNum.length != arrayOp.length) {
        if (str == '+' || str == '-' || str == '÷' || str == '×') {
            arrayOp.push(str);
            arrayOpSum.push(num);
        }else if (str == 'trans'){
            arrayNum[arrayNum.length-1] = String(-arrayNum[arrayNum.length-1]);
        } else {
            if (arrayNum[arrayNum.length-1].length == 10) {
                alert('입력범위 초과')
            }else {
                arrayNum[arrayNum.length-1] += String(str);
            }
        }
    }
    for(var i=0; i<arrayNum.length; i++) {
        if (i == 0) {
            if (arrayOp.length != 0) {
                display.value = commify(arrayNum[i]) + arrayOp[i];
                sum = arrayNum[i] + arrayOpSum[i];
            }else {
                display.value = commify(arrayNum[i]);
                sum = arrayNum[i];
            }
        }else {
            if (arrayOp[i] == undefined){
                display.value += commify(arrayNum[i]);
                sum += arrayNum[i];
            }else {
                display.value += commify(arrayNum[i]) + arrayOp[i];
                sum += arrayNum[i] + arrayOpSum[i];
            }
        }
    }

    count = false;

}

function commify(n) {

    var reg = /(^[+-]?\d+)(\d{3})/;  

    while (reg.test(n))
        n = n.replace(reg, '$1' + ',' + '$2');

    return n;
}
function miniButton() {
    document.getElementById('main').style.animation = 'scaleAni 2s';
    document.getElementById('main').style.animationFillMode = 'forwards';
    document.getElementById('miniButton').style.animation = 'opactityAni 4s';
    document.getElementById('miniButton').style.display = 'block';
    document.getElementById('miniButton').style.animationFillMode = 'forwards';
}
function onButton() {
    document.getElementById('main').style.animation = 'scaleAniBack 2s';
    document.getElementById('main').style.animationFillMode = 'forwards';
    document.getElementById('miniButton').style.animation = 'opactityAniBack 2s';
    document.getElementById('miniButton').style.animationFillMode = 'forwards';
}
function plusButton() {
    var calc = document.getElementById('calculator0');
    var clone = calc.cloneNode(true);
    clone.id = 'calculator' + ++z;
    document.body.appendChild(clone);
}


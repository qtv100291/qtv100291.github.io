const calculator={
    displayMonitor:'',
    firstOperand:'',
    operator:''
}
display = document.getElementsByClassName('monitor')[0];

var temp;

var turnon = 0;

var tempFirstOperand;

//button On
on = document.getElementsByClassName("on")[0];
on.onclick= function(){
    calculator.displayMonitor = '';
    calculator.firstOperand = '';
    calculator.operator = '';
    turnon = 1;
    render();
}

//button Off
off = document.getElementsByClassName("off")[0];
off.onclick= function(){
    calculator.displayMonitor = '';
    calculator.firstOperand = '';
    calculator.operator = '';
    turnon = 0;
    display.value='';
}

//button 1
num1 = document.getElementById('num1');
num1.onclick= function(){
    if (turnon == 1){
        if (calculator.operator == ''){
            calculator.firstOperand = '';
        }
        temp = '1';
            calculator.displayMonitor +=temp;
            render();
    }
}

//button 2
num2 = document.getElementById('num2');
num2.onclick= function(){
    if (turnon == 1){
        if (calculator.operator == ''){
            calculator.firstOperand = '';
        }
        temp = '2';
            calculator.displayMonitor +=temp;
            render();
    }
}

//button 3
num3 = document.getElementById('num3');
num3.onclick= function(){
    if (turnon == 1){
        if (calculator.operator == ''){
            calculator.firstOperand = '';
        }
        temp = '3';
            calculator.displayMonitor +=temp;
            render();
    }
}

//button 4
num4 = document.getElementById('num4');
num4.onclick= function(){
    if (turnon == 1){
        if (calculator.operator == ''){
            calculator.firstOperand = '';
        }
        temp = '4';
            calculator.displayMonitor +=temp;
            render();
    }
}

//button 5
num5 = document.getElementById('num5');
num5.onclick= function(){
    if (turnon == 1){
        if (calculator.operator == ''){
            calculator.firstOperand = '';
        }
        temp = '5';
            calculator.displayMonitor +=temp;
            render();
    }
}

//button 6
num6 = document.getElementById('num6');
num6.onclick= function(){
    if (turnon == 1){
        if (calculator.operator == ''){
            calculator.firstOperand = '';
        }
        temp = '6';
            calculator.displayMonitor +=temp;
            render();
    }
}

//button 7
num7 = document.getElementById('num7');
num7.onclick= function(){
    if (turnon == 1){
        if (calculator.operator == ''){
            calculator.firstOperand = '';
        }
        temp = '7';
            calculator.displayMonitor +=temp;
            render();
    }
}

//button 8
num8 = document.getElementById('num8');
num8.onclick= function(){
    if (turnon == 1){
        if (calculator.operator == ''){
            calculator.firstOperand = '';
        }
        temp = '8';
            calculator.displayMonitor +=temp;
            render();
    }
}

//button 9
num9 = document.getElementById('num9');
num9.onclick= function(){
    if (turnon == 1){
        if (calculator.operator == ''){
            calculator.firstOperand = '';
        }
        temp = '9';
            calculator.displayMonitor +=temp;
            render();
    }
}

//button 0
num0 = document.getElementById('num0');
num0.onclick= function(){
    if (turnon == 1){
        if (calculator.operator == ''){
            calculator.firstOperand = '';
        }
        temp = '0';
            calculator.displayMonitor +=temp;
            render();
    }
}

//button "."
numdot = document.getElementsByClassName('dot')[0];
numdot.onclick= function(){
    
    if (turnon == 1){
        if (calculator.operator == ''){
            calculator.firstOperand = '';
        }
        temp = '.';
            calculator.displayMonitor +=temp;
            render();
    }
}
//button DEL
del = document.getElementsByClassName('del')[0];
del.onclick = function(){
    if (turnon == 1){
        calculator.displayMonitor = calculator.displayMonitor.slice(0,calculator.displayMonitor.length-1);
        render();
    }
}

//button AC
ac = document.getElementsByClassName('ac')[0];
ac.onclick = function(){
    if (turnon ==1){
        calculator.displayMonitor = '';
        render();
    }
}

//button + 
add = document.getElementById('addition');
add.onclick = function(){
    if (turnon == 1){
        calculator.operator = '+';
        calculator.firstOperand = calculator.firstOperand + calculator.displayMonitor ;
        display.value = eval(calculator.firstOperand);
        tempFirstOperand = eval(calculator.firstOperand);
        calculator.firstOperand = tempFirstOperand.toString();
        calculator.firstOperand = calculator.firstOperand + calculator.operator ;
        calculator.displayMonitor = '';
    }
}

//button - 
sub = document.getElementById('substraction');
sub.onclick = function(){
    if (turnon == 1){
        calculator.operator = '-';
        calculator.firstOperand = calculator.firstOperand + calculator.displayMonitor ;
        display.value = eval(calculator.firstOperand);
        tempFirstOperand = eval(calculator.firstOperand);
        calculator.firstOperand = tempFirstOperand.toString();
        calculator.firstOperand = calculator.firstOperand + calculator.operator ;
        calculator.displayMonitor = '';
    }
}

//button x 
mul = document.getElementById('multiplication');
mul.onclick = function(){
    if (turnon == 1){
        calculator.operator = '*';
        calculator.firstOperand = calculator.firstOperand + calculator.displayMonitor ;
        display.value = eval(calculator.firstOperand);
        tempFirstOperand = eval(calculator.firstOperand);
        calculator.firstOperand = tempFirstOperand.toString();
        calculator.firstOperand = calculator.firstOperand + calculator.operator ;
        calculator.displayMonitor = '';
    }
}

//button : 
div = document.getElementById('division');
div.onclick = function(){
    if (turnon == 1){
        calculator.operator = '/';
        calculator.firstOperand = calculator.firstOperand + calculator.displayMonitor ;
        display.value = eval(calculator.firstOperand);
        tempFirstOperand = eval(calculator.firstOperand);
        calculator.firstOperand = tempFirstOperand.toString();
        calculator.firstOperand = calculator.firstOperand + calculator.operator ;
        calculator.displayMonitor = '';
    }
}

//button = 
equal = document.getElementsByClassName('equal')[0];
equal.onclick = function(){
    if (turnon == 1){
        if (calculator.firstOperand == ''){
            if (calculator.displayMonitor ==''){
                render();
            }
            else{
            display.value = eval(calculator.displayMonitor);
            calculator.firstOperand = calculator.displayMonitor;
            calculator.displayMonitor='';
            }
        }
        else{
        calculator.firstOperand = calculator.firstOperand + calculator.displayMonitor ;
        display.value = eval(calculator.firstOperand);
        tempFirstOperand = eval(calculator.firstOperand);
        calculator.firstOperand = tempFirstOperand.toString();
        calculator.displayMonitor ='';
        calculator.operator = '';
        }
    }
}

function render(){
    if (calculator.displayMonitor ==''){
        display.value = '0';
    }
    else{
        display.value = calculator.displayMonitor;
    }
}

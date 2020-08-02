

function setDimension( source, target){ //set element target dimension is equal to element source dimension 
    const myWidth = source.clientWidth;
    target.style.width = myWidth + "px";
    const myHeight = source.clientHeight;
    target.style.height = myHeight + "px";
}

function fixBody(){
    let scrollBarWidth;
    if (document.body.offsetHeight > window.innerHeight){
        scrollBarWidth = window.innerWidth - document.body.clientWidth;
    }
    else scrollBarWidth = 0;
    document.querySelector('.navbar-desktop').style.paddingRight = `${scrollBarWidth}px`;
    document.body.style.paddingRight = `${scrollBarWidth}px`;
    document.body.style.overflow = "hidden";
}

function releaseBody(){
    document.querySelector('.navbar-desktop').style.paddingRight = "0px";
    document.body.style.paddingRight = "0px";
    document.body.style.overflow = "auto";
}

function checkAreAllInputFilled(){
    const inputs = document.querySelectorAll('input');

    for (let i = 0; i < inputs.length; i++){
        if ( inputs[i].value === "" ) return false 
    }

    return true
}

function checkInput(inputCheck){
    const errors = {}
    for (let inputName in inputCheck){
        errors[inputName] = eval(inputCheck[inputName])(inputName);// execute function to check
    }
    return errors
}

function checkIfThereAreAnyError(errors){
    for (let error in errors){
        if (errors[error] !== "") {
            return true
        } 
    }
    return false
}

function emailCheck(inputName){
    const testRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const input = document.querySelector(`#${inputName}`).value;
    const error = "Email này không đúng định dạng"
    if (testRegex.test(input) === false) return error
    else return "";
}

function phoneCheck(inputName){
    const testRegex = /^\d{10}$/;
    const input = document.querySelector(`#${inputName}`).value;
    const error = "Số điện thoại phải là 10 chữ số"
    if (testRegex.test(input) === false) return error
    else return "";
}

function passwordCheck(inputName){
    const testRegex = /^\S{6,}$/;
    const input = document.querySelector(`#${inputName}`).value;
    const error = "Mật khẩu có ít nhất 6 kí tự"
    if (testRegex.test(input) === false) return error;
    else return "";
}

function checkRetype(inputName){
    const input = document.querySelector(`#${inputName}`).value;
    const inputCheck = document.querySelector(`#${inputName.replace(/Retype/,"")}`).value;
    const error = "Mật khẩu không khớp"
    if (input !== inputCheck) return error
    else return "";
}

function checkhtmlHeight(){
    const htmlHieght = document.documentElement.offsetHeight;
    const windowHeight = window.innerHeight;
    if (htmlHieght < windowHeight)  document.querySelector('footer').classList.add('fixed');
    else document.querySelector('footer').classList.remove('fixed');
}







export default {
    setDimension,
    fixBody,
    releaseBody,
    checkAreAllInputFilled, 
    checkInput,
    checkIfThereAreAnyError,
    checkhtmlHeight
}


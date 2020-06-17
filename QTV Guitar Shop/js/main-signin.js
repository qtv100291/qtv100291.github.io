//This section is written by using Jquery. 
//In this project, some pages are written by using pure Javascript and the others pages are written by using Jquery.
//I have done that just for practicing both Javascript and Jquery(a very popular library).


// Part 1 : Changing tab

$('.form-table-sign-in').css({'display':'block','opacity':'1'})

$('.form-table-sign-in-button-sign-up, .form-table-sign-up-button-sign-in').on('click',changingTab);
function changingTab(){
    $('.form-active > .form-part > input').val('');
    $('.form-active > .form-table-notification').text('');
    $(this).parent().css({'opacity':'0','display':'none'});
    $('.form-table-content-main').children(':not(.form-active)').css('display','block');
    setTimeout(() =>{
        $('.form-table-content-main').children(':not(.form-active)').css('opacity','1');
        $('.form-table-content-main').children(':not(.form-active)').addClass('form-active');
        $(this).parent().removeClass('form-active');
    },50)
}

// Part 2 : Function for sign-in and sign-up
if (localStorage.getItem('signInSituation') === "true"){
    window.location.href = "index.html";
}
let userList = [];
if (localStorage.getItem('userListGuitar') != null){
    loadUserList();
}

$('#phone-sign-up').on('input',function(){
    elt = $(this);
    checkIsOnlyNumber(elt);
    limitCharacter(elt,10);
});

$('.form-table-sign-in-button-sign-in').on('click',signIn);
function signIn(){
    if(!checkEmpty('email-sign-in')) return;
    if (!checkEmailName('email-sign-in')) return;
    if (!checkEmpty('password-sign-in')) return;
    checkAccountInfo();
}

$('.form-table-sign-up-button-sign-up').on('click',signUp);
function signUp(){ 
    if (!checkEmpty('email-sign-up')) return;
    if (!checkEmailName('email-sign-up')) return;
    if (!checkEmpty('name-sign-up')) return;
    if (!checkEmpty('phone-sign-up')) return;
    if (!checkLimitedNumber('phone-sign-up',10)) return;
    if (!checkEmpty('password-sign-up')) return;
    if (!checkEmpty('password-sign-up-2')) return;
    if (!checkRePassword()) return;
    checkAndCreateAccount();
}

function saveUserList(){
    localStorage.setItem('userListGuitar', JSON.stringify(userList));
} 

function loadUserList(){
    userList = JSON.parse(localStorage.getItem('userListGuitar'))
} 

function CreateAccount(id, email, password, name, phoneNumber){
    this.id = id;
    this.email = email;
    this.password = password;
    this.info = {
        name:"",
        phoneNumber:"",
    }
    this.info.name = name; 
    this.info.phoneNumber = phoneNumber; 
    this.address = {
        province : "",
        district : "",
        commune : "",
        street : ""
    }
    this.payment = {
        cardType : "",
        cardID : "",
        cardName : "",
        cardCGV : "",
        cardExpiryMonth: "",
        cardExpiryYear: ""
    }
    this.shoppingCart = [];
    this.tradeHistory = [];
}

function checkAndCreateAccount(){
    if (localStorage.getItem('userListGuitar') != null){
        loadUserList();
    }
    let id = new Date().getTime().toString();
    let email = $('#email-sign-up').val();
    let password = $('#password-sign-up').val();
    let name = $('#name-sign-up').val();
    let phoneNumber = $('#phone-sign-up').val();
    for (let i = 0; i < userList.length; i++){
        if (email == userList[i].email){
            $('.sign-up-notification').text('Email này đã được sử dụng');
            return ;
        }
    }
    $('.sign-up-notification').text(''); 
    let user = new CreateAccount(id, email, password, name, phoneNumber);
    userList.push(user);
    saveUserList();
    $('#email-sign-up, #password-sign-up, #name-sign-up, #phone-sign-up, #password-sign-up-2').val('');
    $('.form-table-sign-in').addClass('form-active');
    $('.form-table-sign-up').removeClass('form-active');
    $('.form-table-sign-up').css({'opacity':'0','display':'none'});
    $('.form-table-sign-in').css('display','block')
    setTimeout(() =>{
        $('.form-table-sign-in').css('opacity','1')
    },50)
} 

function checkAccountInfo(){
    let emailCheck = $('#email-sign-in').val();
    let passwordCheck = $('#password-sign-in').val();
    for (let i = 0; i < userList.length; i++){
        if (emailCheck === userList[i].email && passwordCheck === userList[i].password){
            localStorage.setItem('signInSituation', true);
            localStorage.setItem('currentID', userList[i].id);
            if (userList[i].shoppingCart.length == 0){
                if (localStorage.getItem('shoppingcartguitar') != null){
                    userList[i].shoppingCart = JSON.parse(localStorage.getItem('shoppingcartguitar'));
                }
                saveUserList();
            }
            localStorage.removeItem('shoppingcartguitar');
            window.location.href = "index.html";
            return;
        }
    }
    $('.sign-in-notification').text('Thông tin đăng nhập sai');
}

function checkEmpty(id){ // check whether a input field is empty
    let inputCheck = $(`#${id}`).val();
    if (inputCheck.length == 0){
        $(`#${id}`).next().next().css('z-index','3');
        setTimeout(function(){
            $(`#${id}`).next().next().css('opacity','1');
        },100)
        setTimeout(function(){
            $(`#${id}`).next().next().css('opacity','0');
        },2500)
        setTimeout(function(){
            $(`#${id}`).next().next().css('z-index','-1');
        },2600)
        return false
    }
    else return true
}

function checkLimitedNumber(id,number){ // check number of digits 
    let inputCheck = $(`#${id}`).val();
    if (inputCheck.length !== number){
        $(`#${id}`).next().next().next().css('z-index','3');
        setTimeout(function(){
            $(`#${id}`).next().next().next().css('opacity','1');
        },100)
        setTimeout(function(){
            $(`#${id}`).next().next().next().css('opacity','0');
        },2500)
        setTimeout(function(){
            $(`#${id}`).next().next().next().css('z-index','-1');
        },2600)    
        return false;
    }
    return true;
}

function checkEmailName(id){ // check email name form
    let inputCheck = $(`#${id}`).val();
    if (!inputCheck.includes('@') || !inputCheck.includes('.')){
        $(`#${id}`).next().next().next().css('z-index','3');
        setTimeout(function(){
            $(`#${id}`).next().next().next().css('opacity','1');
        },100)
        setTimeout(function(){
            $(`#${id}`).next().next().next().css('opacity','0');
        },2500)
        setTimeout(function(){
            $(`#${id}`).next().next().next().css('z-index','-1');
        },2600)   
        return false
    }
    let indexAtSign = inputCheck.indexOf('@');
    let check = inputCheck.slice(indexAtSign).match(/\./g).length;
    let indexPoint = inputCheck.slice(indexAtSign).indexOf('.');
    if (indexPoint < 2 || check > 1){
        $(`#${id}`).next().next().css('z-index','3');
        setTimeout(function(){
            $(`#${id}`).next().next().css('opacity','1');
        },100)
        setTimeout(function(){
            $(`#${id}`).next().next().css('opacity','0');
        },2500)
        setTimeout(function(){
            $(`#${id}`).next().next().css('z-index','-1');
        },2600)   
        return false
    }
    return true
}

function checkRePassword(){
    let inputPassword_1 = $('#password-sign-up').val();
    let inputPassword_2 = $('#password-sign-up-2').val();
    if (inputPassword_1 !== inputPassword_2 && inputPassword_1.length != 0 && inputPassword_2.length != 0){
        $('#password-sign-up-2').next().next().next().css('z-index','3');
        setTimeout(function(){
            $('#password-sign-up-2').next().next().next().css('opacity','1');
        },100)
        setTimeout(function(){
            $('#password-sign-up-2').next().next().next().css('opacity','0');
        },2500)
        setTimeout(function(){
            $('#password-sign-up-2').next().next().next().css('z-index','-1');
        },2600)   
        return false
    }
    return true
}

function checkIsOnlyNumber(elt){
    let str = elt.val();
    let check = /\D/.test(str);
    if (!check) return 
    else{
        str = str.replace(/\D/g,"");
        elt.val(str);
    }
}

function limitCharacter(elt,limitNumber){
    if (elt.val().length <= limitNumber) {
    }
    else {
        let str = elt.val();
        str = str.substring(0,str.length - 1);
        elt.val(str);
    }
}

$('.back-home-page-button').on('click', function(){
    window.location.href = "index.html"
})
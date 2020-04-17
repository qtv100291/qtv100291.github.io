//This section is written by using Javascript. 
//In this project, some pages are written by using pure Javascript and the others pages are written by using Jquery.
//I have done that just for practicing both Javascript and Jquery(a very popular library).

//Part 1 : Function for Shopping Cart
let shoppingCart=[];
let discount = 0;
if (localStorage.getItem('shoppingcartguitar') != null){
loadCart();
displayShoppingCart()
}
else displayShoppingCart()

function saveCart (){//Save Cart
localStorage.setItem('shoppingcartguitar',JSON.stringify(shoppingCart))
}

function loadCart(){//Load Cart
shoppingCart = JSON.parse(localStorage.getItem('shoppingcartguitar'));
}

function displayShoppingCart(){ //Display Sub Shopping Cart
let output= "";
let totalMoney = 0;
if (shoppingCart.length == 0){
    output = '<div class="shopping-cart-note">Chưa Có Sản Phẩm Nào Trong Giỏ Hàng</div>';
    document.querySelector('.shopping-cart-item-container').innerHTML = output;
    if (document.body.clientHeight < window.innerHeight){
            document.querySelector('footer').classList.add('empty');
    }
}
else{
    for (let i = 0; i < shoppingCart.length; i++){
        let addressPage;
        if (["classical","acoustic","electrical","ukulele"].includes(shoppingCart[i].group)){
            addressPage = "productitem.html";
        }
        if (shoppingCart[i].group == "accessory"){
            addressPage = "accessories.html";
        }
        if (shoppingCart[i].group == "guitarshow"){
            switch (shoppingCart[i].id){
                case "20203248537-7349926":
                    addressPage = "guitarshow1.html";
                    break
                case "202032620507-7349926":
                    addressPage = "guitarshow2.html";
                    break
                case "2020326205250-5800815":
                    addressPage = "guitarshow3.html";
                    break
                case "2020326205321-6215666":
                    addressPage = "guitarshow4.html";
                    break
            }
                
        }
        let provisionalMoney = shoppingCart[i].price.replace(/\D/g,'') * shoppingCart[i].count;
        let realMoney = provisionalMoney - provisionalMoney*discount;
        let provisionalMoneyConvert = separator1000(provisionalMoney);
        let realMoneyConvert = separator1000(realMoney);
        totalMoney += realMoney;
        output +=   `<div class="shopping-cart-item">
                        <div class="shopping-cart-item-detail">
                            <div class="item-detail">
                                <div class="item-photo"><img src="${shoppingCart[i].image}" alt="item-photo"></div>
                                <div class="item-detail-info">
                                    <a class="item-name" onclick="sendData(this)" href="${addressPage}" data-id="${shoppingCart[i].id}" data-group="${shoppingCart[i].group}">${shoppingCart[i].name}</a>
                                    <div class="item-price"><span>${shoppingCart[i].price}</span> Đồng</div>
                                    <div class="delete-button" onclick="deleteItem(this)">
                                        <img src="HomePage/delete-icon.png" alt="delete-icon">
                                        Xóa
                                    </div>
                                </div>
                            </div>
                            <div class="item-quantity">
                                <div class="item-number" data-id="${shoppingCart[i].id}" data-group="${shoppingCart[i].group}" data-name="${shoppingCart[i].name}">
                                    <div class="minus-item" onclick="minusItem(this)"><img src="GuitarShow/minus_24px.png" alt="minus-item"></div>
                                    <input type="text" value="${shoppingCart[i].count}" id="item-quantity" oninput="checkIsOnlyNumber(this)" onchange="checkIsEmpty(this);modifyItemNumber(this)">
                                    <div class="plus-item" onclick="plusItem(this)"><img src="GuitarShow/plus.png" alt="plus-item"></div>
                                </div>
                            </div>
                            <div class="provisional-value">
                                <p>Thành Tiền : </p>
                                <p><span class="provisional-money-value">${provisionalMoneyConvert}</span> Đồng</p>
                            </div>
                        </div>
                    </div>`
}
let totalMoneyConvert = separator1000(totalMoney);
output +=   `<div class="summary-shopping-cart">
                <div class="summary-shopping-cart-container">
                    <div class="summary-title">Tổng Số Tiền</div>
                    <div class="summary-money"><span class="summary-total-value">${totalMoneyConvert}</span> Đồng</div>
                    <a class="submit-button" href="payout.html">Thanh Toán</a>
                </div>
            </div>`
    document.querySelector('footer').classList.remove('empty');
    document.querySelector('.shopping-cart-item-container').innerHTML = output;
}
}

function modifyItemNumber(elt){
    let idItem = elt.parentNode.dataset.id;
    let nameItem = elt.parentNode.dataset.name;
    for (let i = 0; i < shoppingCart.length; i++){
        if (shoppingCart[i].id === idItem && shoppingCart[i].name === nameItem){
            shoppingCart[i].count = parseInt(elt.value);
            break;
        }
    }  
    saveCart();
    displayShoppingCart();
}

function deleteItem(elt){//delete Item
    let idDelete = elt.parentNode.children[0].dataset.id;
    let namDeltete = elt.parentNode.children[0].textContent;
    for (let i = 0; i < shoppingCart.length; i++){
        if (shoppingCart[i].id === idDelete && shoppingCart[i].name === namDeltete){
            shoppingCart.splice(i,1);
            break;
        }
    }
    saveCart();
    displayShoppingCart();
}

function checkIsEmpty(elt){
    if (elt.value.length == 0) elt.value = 1;
    if (elt.value == 0) elt.value = 1
}
function checkIsOnlyNumber(elt){
    if (elt.value.charAt(0) == 0) {
        let strTest = elt.value.slice(1);
        elt.value = strTest;
    }
    let str = elt.value;
    let check = /\D/.test(str);
    if (!check) return 
    else{
        str = str.replace(/\D/g,"");
        elt.value = str;
    }
}

function minusItem(elt){  // Minus Number item
    elt.parentNode.childNodes.forEach(elm => elm.nodeType != 1 && elm.parentNode.removeChild(elm)); //remove text node
    if (elt.parentNode.childNodes[1].value > 1){
        let currentValue = elt.parentNode.childNodes[1].value;
        currentValue -= 1;
        elt.parentNode.childNodes[1].value = `${currentValue}`; 
        let idItem = elt.parentNode.dataset.id;
        let nameItem = elt.parentNode.dataset.name;
        for (let i = 0; i < shoppingCart.length; i++){
            if (shoppingCart[i].id == idItem && shoppingCart[i].name == nameItem){
                shoppingCart[i].count = parseInt(elt.parentNode.childNodes[1].value);
                break;
            }
        }  
    }
    else return; 
    saveCart();
    displayShoppingCart();
}

function plusItem(elt){  // Plus Number item
    elt.parentNode.childNodes.forEach(elm => elm.nodeType != 1 && elm.parentNode.removeChild(elm)); //remove text node
    let currentValue = parseInt(elt.parentNode.childNodes[1].value);
    currentValue += 1;
    elt.parentNode.childNodes[1].value = `${currentValue}`;
    let idItem = elt.parentNode.dataset.id;
    let nameItem = elt.parentNode.dataset.name;
    for (let i = 0; i < shoppingCart.length; i++){
        if (shoppingCart[i].id === idItem && shoppingCart[i].name === nameItem){
            shoppingCart[i].count = parseInt(elt.parentNode.childNodes[1].value);
            break;
        }
    } 
    saveCart();
    displayShoppingCart();
}

function separator1000(num){ // 1000 separator 
return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g,".");
}

function sendData(elt){// send Data to productitem.html
    let itemData = new Object;
    itemData.group = elt.dataset.group;
    itemData.id = elt.dataset.id;
    localStorage.setItem('dataguitaritem',JSON.stringify(itemData))
}

//Part : Function for Subscription email and About This Website button - Footer

if (document.body.offsetHeight > window.innerHeight){
    var scrollBarWidth = window.innerWidth - document.body.clientWidth;
}
else scrollBarWidth = 0;
document.querySelector('.name-footer').addEventListener('input',function(){
    let elt = this;
    checkIsOnlyText(elt); 
})


document.querySelector('.subscription-button').addEventListener('click',sendSubscriptionEmail)
function sendSubscriptionEmail(){
    if (!checkEmpty('name-footer')) return;
    if (!checkEmpty('email-footer')) return;
    if (!checkEmailName('email-footer')) return;
    document.querySelector('.subscription-announcement').style.zIndex = 15;
    setTimeout(function(){
        document.querySelector('.subscription-announcement').style.visibility = "visible";
        document.querySelector('.subscription-announcement').style.opacity = 1;
    },100);
    setTimeout(function(){
        document.querySelector('.subscription-announcement').style.opacity = 0;
    },2000)
    setTimeout(function(){
        document.querySelector('.subscription-announcement').style.visibility = "hidden";
        document.querySelector('.subscription-announcement').style.zIndex = -1;
    },2100)
    document.querySelector('.name-footer').value = "";
    document.querySelector('.email-footer').value = "";
}

function checkIsOnlyText(elt){
    let str = elt.value;
    let check = /\d/.test(str);
    if (!check) return
    else{
        str = str.replace(/\d/g,"");
        elt.value = str;
    }
}

function checkEmpty(id){ // check whether a input field is empty
    let inputCheck = document.querySelector(`.${id}`).value;
    if (inputCheck.length == 0){
        document.querySelector(`.${id} + .empty-check`).style.zIndex = 3;
        setTimeout(function(){
            document.querySelector(`.${id} + .empty-check`).style.opacity = 1;
        },100)
        setTimeout(function(){
            document.querySelector(`.${id} + .empty-check`).style.opacity = 0;
        },2500)
        setTimeout(function(){
            document.querySelector(`.${id} + .empty-check`).style.zIndex = -1;
        },2600)
        return false
    }
    else return true
}


function checkEmailName(id){ // check email name form
    let inputCheck = document.querySelector(`.${id}`).value;
    if (!inputCheck.includes('@') || !inputCheck.includes('.')){
        document.querySelector(`.${id} ~ .email-name-check`).style.zIndex = 3;
        setTimeout(function(){
            document.querySelector(`.${id} ~ .email-name-check`).style.opacity = 1;
        },100)
        setTimeout(function(){
            document.querySelector(`.${id} ~ .email-name-check`).style.opacity = 0;
        },2500)
        setTimeout(function(){
            document.querySelector(`.${id} ~ .email-name-check`).style.zIndex = -1;
        },2600)   
        return false
    }
    let indexAtSign = inputCheck.indexOf('@');
    let check = inputCheck.slice(indexAtSign).match(/\./g).length;
    let indexPoint = inputCheck.slice(indexAtSign).indexOf('.');
    if (indexPoint < 2 || check > 1){
        document.querySelector(`.${id} ~ .email-name-check`).style.zIndex = 3;
        setTimeout(function(){
            document.querySelector(`.${id} ~ .email-name-check`).style.opacity = 1;
        },100)
        setTimeout(function(){
            document.querySelector(`.${id} ~ .email-name-check`).style.opacity = 0;
        },2500)
        setTimeout(function(){
            document.querySelector(`.${id} ~ .email-name-check`).style.zIndex = -1;
        },2600)    
        return false
    }
    return true
}

document.querySelector('.about-website-button').addEventListener('click',openAboutWebsite);
function openAboutWebsite(){
    if (document.body.offsetHeight > window.innerHeight){
        scrollBarWidth = window.innerWidth - document.body.clientWidth;
    }
    else scrollBarWidth = 0;
    document.querySelector('.about-website-container').style.display = "block";
    
    setTimeout(function(){
        document.querySelector('.about-website-container').style.opacity = "1";
    },100)
    document.body.classList.add('start');
    document.body.style.paddingRight = `${scrollBarWidth}px`;
}
document.querySelector('.close-about-website').addEventListener('click',closeAboutWebsite);
function closeAboutWebsite(){
    document.querySelector('.about-website-container').style.opacity = "0";
    setTimeout(function(){
        document.querySelector('.about-website-container').style.display = "none";
        document.body.classList.remove('start');
        document.body.style.paddingRight = `0px`;
        document.querySelector('.about-website-container').style.visibility = "hidden";
    },600)
}

//Part 4: Funtion for Scrolling Button
document.querySelector('.scrolling-button').addEventListener('click',scrollToTop);
function scrollToTop(){
    document.body.scrollTop = 0; 
    document.documentElement.scrollTop = 0;
}


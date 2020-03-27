//This section is written by using Javascript. 
//In this project, some pages are written by using pure Javascript and the others pages are written by using Jquery.
//I have done that just for practicing both Javascript and Jquery(a very popular library).

//Part 1 : Function for Province - District - Commune Option
$('#input-user-city-province').change(selectProvince); //Choose City/Provin and render District
function selectProvince(){
    let outputDistrict = "<option value='0'>&nbspChọn Quận/Huyện...</option>";
    let outputCommune = "<option value='0'>&nbspChọn Phường/Xã...</option>";
    let idProvince = $('#input-user-city-province > option').filter(':selected').val();
    for (let i = 0; i < listDistrict.length; i ++){
        if (listDistrict[i].idProvince == idProvince){
            outputDistrict += `<option value='${listDistrict[i].idDistrict}'>&nbsp${listDistrict[i].name}</option>`;
        }
    }
    $('#input-user-commune').html(outputCommune);
    $('#input-user-district').html(outputDistrict);
}

$('#input-user-district').change(selectDistrict);//Choose District and render Commune
function selectDistrict(){
    let outputCommune = "<option value='0'>&nbspChọn Phường/Xã...</option>";
    let idDistrict = $('#input-user-district > option').filter(':selected').val();
    for (let i = 0; i < listCommune.length; i ++){
        if (listCommune[i].idDistrict == idDistrict){
            outputCommune += `<option>&nbsp${listCommune[i].name}</option>`;
        }
    }
    $('#input-user-commune').html(outputCommune);
}
//Part 2 : Function for Lmit Number of Character in Input Field
let limitNumberArray = [10, 12 , 3 ,7];
$('#card-id').on('input',function(){
    elt = $(this);
    checkIsOnlyNumber(elt);
    limitCharacter(elt,limitNumberArray[1])
});
$('#card-password').on('input',function(){
    elt = $(this);
    checkIsOnlyNumber(elt)
    limitCharacter(elt,limitNumberArray[2])
});
$('#input-user-phone').on('input',function(){
    elt = $(this);
    checkIsOnlyNumber(elt)
    limitCharacter(elt,limitNumberArray[0])
});
$('#card-expiry-date').on('input',function(){
    elt = $(this);
    writeMMYYYY(elt);
    limitCharacter(elt,limitNumberArray[3])
});

function writeMMYYYY(elt){
    let strRaw = elt.val();
    let str = strRaw.replace(/\D/g,"");
    if (str.charAt(0) == 0) {
        let strTest = str.slice(1);
        $(elt).val(strTest);
        return
    }
    if (str.length <= 1)  $(elt).val(str)
    else {
        elt.val(`${str.substring(0,2)}/${str.substring(2,str.length)}`);
    }
}

function checkIsOnlyNumber(elt){
    if ($(elt).val().charAt(0) == 0) {
        let strTest = $(elt).val().slice(1);
        $(elt).val(strTest);
    }
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

//Part : Function for Rendering Item
let shoppingCart=[];
let discount = 0;
if (localStorage.getItem('shoppingcartguitar') != null){
loadCart();
displayShoppingCart()
}
else displayShoppingCart()

function loadCart(){//Load Cart
    shoppingCart = JSON.parse(localStorage.getItem('shoppingcartguitar'));
}

function displayShoppingCart(){ //Display Shopping Cart
    let output= "";
    let totalMoney = 0;
    if (shoppingCart.length == 0){
        output = '<div class="shopping-cart-note">Chưa Có Sản Phẩm Nào Trong Giỏ Hàng</div>';
    }
    else{
        for (let i = 0; i < shoppingCart.length; i++){
            let provisionalMoney = shoppingCart[i].price.replace(/\D/g,'') * shoppingCart[i].count;
            let realMoney = provisionalMoney - provisionalMoney*discount;
            let provisionalMoneyConvert = separator1000(provisionalMoney);
            let realMoneyConvert = separator1000(realMoney);
            totalMoney += realMoney;
            output +=   `<div class="shopping-cart-item">
                            <div class="item-detail"><span class="number-item">${shoppingCart[i].count}</span> x <span class="item-name">${shoppingCart[i].name}</span></div>
                            <div class="item-money-value">= <span class="money-value">${realMoneyConvert}</span> Đ</div>
                        </div>`
    }
    let totalMoneyConvert = separator1000(totalMoney);
    output +=   `<div class="total-money">
                    <div class="total-money-title">
                        <div>Thành Tiền:</div>
                        <div><span class="total-money-value">${totalMoneyConvert}</span> Đ</div>
                    </div>
                    <div class="total-money-note">( Đã Bao Gồm Thuế VAT )</div>
                </div>`
    
    }
    $('.shopping-cart-item-container').html(output);
    let heightItem1 = $('.summary-shopping-cart-title').outerHeight(true); 
    let heightItem2 = $('.shopping-cart-item-container').outerHeight(true); 
    $('.summary-shopping-cart').height(heightItem1 + heightItem2);
}

function separator1000(num){ // 1000 separator 
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
//Part 3: Funtion for Scrolling Button
document.querySelector('.scrolling-button').addEventListener('click',scrollToTop);
function scrollToTop(){
    document.body.scrollTop = 0; 
    document.documentElement.scrollTop = 0;
}
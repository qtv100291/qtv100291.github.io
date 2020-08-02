function loadCartLocal(){//load infomation from qtv cart in localstorage
    if (localStorage.getItem('qtv-cart') === null) return null
    else {
        const shoppingCart = JSON.parse(localStorage.getItem('qtv-cart'))
        return shoppingCart
    }
}

function saveCartLocal(shoppingCart){//save infomation to qtv cart in localstorage
    localStorage.setItem('qtv-cart',JSON.stringify(shoppingCart));
}

function countItemInShoppingCart(shoppingCart){
    let totalItem = 0;
    for (let item of shoppingCart){
        const count = item.count || 0;
        totalItem += parseInt(count);
    }
    return totalItem;
}

function addItemToShoppingCart(prevShoppingCart, newItem){
    if (prevShoppingCart.length === 0) {
        prevShoppingCart = [{...newItem}];
        saveCartLocal(prevShoppingCart);
        return prevShoppingCart;
    } 
    //check whether there are any item that has same Id with new Item  
    for (let item of prevShoppingCart){
        if (item.id === newItem.id){
            item.count += newItem.count;
            saveCartLocal(prevShoppingCart);
            return prevShoppingCart;
        }
    }
    //if not, push newItem to cart
    prevShoppingCart.push(newItem);
    saveCartLocal(prevShoppingCart);
    return prevShoppingCart
}

function Item (id, name, price, image, bandName, count = 1){
    this.id = id;
    this.name = name;
    this.price = price;
    this.image = image;
    this.bandName = bandName;
    this.count = count;
    
}

export default {
    loadCartLocal,
    saveCartLocal,
    countItemInShoppingCart,
    addItemToShoppingCart,
    Item
}



import React, { Component } from 'react';
import ShoppingCartItem from '../components/shoppingcart/shoppingCartItem';
import addfunc from '../ultis/additionalFunction';
import './ShoppingCart.scss';
import { Link } from 'react-router-dom';

const ShoppingCart = ({ shoppingCart, 
                        onPlusQuantity, 
                        onMinusQuantity, 
                        onChangeQuantity, 
                        onDeleteItem,
                        onCheckEmpty }) => {

    const totalItemCalculation = shoppingCart => {
        let totalItem = 0;
        for (let item of shoppingCart) {
            const count = item.count || 0
            totalItem += parseInt(count);
        }
        return totalItem
    }

    const totalMoneyCalculation = shoppingCart => {
        let totalMoney = 0;
        for (let item of shoppingCart) {
            const count = item.count || 0
            totalMoney += item.price.replace(/\D/g,"")*count;
        }
        return totalMoney
    }

    return ( 
        <main className="shopping-cart-main">
            <h2 className="shopping-cart-title">Giỏ Hàng <span>( {( Boolean(shoppingCart) === false || shoppingCart.length === 0) ? "0" : totalItemCalculation(shoppingCart)} sản phẩm )</span></h2>
            <div className="shopping-cart-container d-flex justify-content-between">
                <section className="list-item-section">
                    {( Boolean(shoppingCart) === false || shoppingCart.length === 0) ? 
                    <h3>Chưa Có Sản Phẩm</h3>
                    : shoppingCart.map( item => <ShoppingCartItem 
                                                    key={item.id} {...item}  
                                                    onPlusQuantity={onPlusQuantity} 
                                                    onMinusQuantity={onMinusQuantity} 
                                                    onChangeQuantity={onChangeQuantity}
                                                    onDeleteItem={onDeleteItem}
                                                    onCheckEmpty = {onCheckEmpty}
                                                />)}
                </section>
                {
                Boolean(shoppingCart) === true &&
                <section className="total-money">
                    <div className="total-money-container">
                        <p className="total-money-title d-flex justify-content-between">Tạm Tính: <span>{addfunc.separator1000(totalMoneyCalculation(shoppingCart))} VND</span></p>
                        <p className="total-money-tax d-flex justify-content-between">Thuế VAT <span>{addfunc.separator1000(totalMoneyCalculation(shoppingCart)/10)} VND</span></p> 
                        <p className="total-money-value d-flex justify-content-between align-items-center">TỔNG<span>{addfunc.separator1000((totalMoneyCalculation(shoppingCart)*1.1).toFixed(0))} VND</span></p> 
                    </div>
                    <Link to="thanh-toan"><div className="payout-button d-flex align-items-center justify-content-center">THANH TOÁN</div></Link>
                </section>
                }
            </div>
            
        </main>
    )
}

    

 
export default ShoppingCart;


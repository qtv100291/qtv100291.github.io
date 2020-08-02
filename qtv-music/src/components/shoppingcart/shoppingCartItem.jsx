import React, { Component } from 'react';
import './shoppingCartItem.scss';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import addfunc from '../../ultis/additionalFunction';

class ShoppingCartItem extends Component {

    minusQuantity = () => {
        if ( this.props.count === 1) return
        this.props.onMinusQuantity(this.props.id)
    }

    render() { 
        const {id, name, count, image, price, bandName} = this.props
        const productPath = '/san-pham/' + (name && name.replace(/ /g, "-")) + '-' +id;
        return ( 
            <div className="shopping-cart-item d-flex justify-content-center">
                <div className="item-photo">
                    <div className="item-photo-container">
                        <img src={image} alt={name}/>
                    </div>
                </div>
                <div className="item-info d-flex justify-content-between">
                    <div className="item-info-container">
                        <Link to ={productPath}><h3 className="album-name">{name}</h3></Link>
                        <h3 className="band-name">{bandName}</h3>
                        <h3 className="album-price">{price} VND</h3>
                        <div className="delete-button d-flex align-items-center" onClick ={() => this.props.onDeleteItem(this.props.id)}>
                            <FontAwesomeIcon icon = "trash" className="real-font-awesome"/>
                            Xóa
                        </div>
                    </div>
                    <div className="item-quantity d-flex align-items-center">
                        <div className="minus-button button-quantity d-flex justify-content-center align-items-center" onClick={this.minusQuantity}>
                            <FontAwesomeIcon icon = "minus" className="real-font-awesome" />
                        </div>
                        <input 
                            type="text" value={count} 
                            onChange={e => this.props.onChangeQuantity(this.props.id, e.currentTarget)}
                            onBlur = {e => this.props.onCheckEmpty(this.props.id, e.currentTarget)}
                        />
                        <div className="plus-button button-quantity d-flex justify-content-center align-items-center" onClick={() => this.props.onPlusQuantity(this.props.id)}>
                            <FontAwesomeIcon icon = "plus" className="real-font-awesome" />
                        </div>
                        
                    </div>
                    <div className="item-total-money d-flex justify-content-center align-items-center flex-column">
                        <h3 className="item-total-money-title">Thành Tiền:</h3>
                        <h3><strong>{addfunc.separator1000(price.replace(/\D/g,"")*count)} VND</strong></h3>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default ShoppingCartItem;
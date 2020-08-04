const Footer = ({
                  products, 
                  onReset, 
                  inputPromotionalCode, 
                  onChangeInputPromotionalCode,
                  onCheckProCode,
                  promotionalCode,
                  tax }) => {

  const subTotal = products => {
    let subTotal = 0;
    const reduction = promotionalCode.reduction;
    for (let product of products) {
      const quantity = product.quantity || 0;
      subTotal += product.price*quantity
    }
    return subTotal*(100 - reduction)/100
  }

  return (
    <section className="container">
      {products.length > 0 && <div className="promotion">
        <label htmlFor="promo-code">Have A Promo Code?</label>
        <input  type="text" id="promo-code" 
                value={inputPromotionalCode}
                onChange= {onChangeInputPromotionalCode}
                disabled = {promotionalCode.name ? true : false}
        />
        <button type="button" onClick={onCheckProCode} disabled = {promotionalCode.name ? true : false}/>
      </div>}
      {products.length > 0 && <div className="summary">
        <ul>
          <li>
            Subtotal <span>${subTotal(products).toFixed(2)}</span>
          </li>
          <li>
            Tax <span>${(subTotal(products)*tax/100).toFixed(2)}</span>
          </li>
          <li className="total">
            Total <span>${(subTotal(products)*1.1).toFixed(2)}</span>
          </li>
        </ul>
      </div>}
      <div className="checkout">
        <button type="button" onClick={onReset} >Continues Shopping</button>
        <button type="button" disabled={products.length > 0 ? false : true }>Check Out</button>
      </div>
    </section>
    )
};

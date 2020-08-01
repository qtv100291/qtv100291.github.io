const Footer = ({products, onReset}) => {

  const subTotal = products => {
    let subTotal = 0;
    for (let product of products) {
      const quantity = product.quantity || 0;
      subTotal += product.price*quantity
    }
    return subTotal
  }

 const tax = products.length !== 0 ? 5 : 0;

  return (
    <section className="container">
      <div className="promotion">
        <label htmlFor="promo-code">Have A Promo Code?</label>
        <input type="text" id="promo-code" /> <button type="button" />
      </div>
      <div className="summary">
        <ul>
          <li>
            Subtotal <span>${subTotal(products).toFixed(2)}</span>
          </li>
          <li>
            Tax <span>${tax.toFixed(2)}</span>
          </li>
          <li className="total">
            Total <span>${(subTotal(products) + tax).toFixed(2)}</span>
          </li>
        </ul>
      </div>
      <div className="checkout">
        <button type="button" onClick={onReset}>Continues Shopping</button>
        <button type="button">Check Out</button>
      </div>
    </section>
    )
};

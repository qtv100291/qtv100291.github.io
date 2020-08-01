const Header = ({products}) => {

  const totalItem = (products) => {
    let totalItem = 0;
    for (let product of products) {
      const valueAdded = product.quantity || 0;
      totalItem += parseInt(valueAdded)
    }
    return totalItem
  }

  return (
    <header className="container">
      <h1>Shopping Cart</h1>
      <ul className="breadcrumb">
        <li>Home</li>
        <li>Shopping Cart</li>
      </ul>
      <span className="count">{totalItem(products)} items in the bag</span>
    </header>
  );
};

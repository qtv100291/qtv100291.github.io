
const checkOnly2Digit = value => {//function check value is a number from 1 to 99 
  const regex = /^\d{0,2}$/;
  const testValue = value;
  if (testValue === "") return ""
  if (regex.test(testValue) && testValue.charAt(0) !== "0") {
    return parseInt(testValue)
  }
  else {
    const testValueChange = testValue.substring(0, testValue.length - 1);
    if (testValueChange === "") return ""
    else return parseInt(testValueChange);
  }

}

const PRODUCTS = [
  {
    id: 1,
    name: "PRODUCT ITEM NUMBER 1",
    description: "Description for product item number 1",
    price: 5.99,
    quantity: 3,
    image: "https://via.placeholder.com/200x150",
  },
  {
    id: 2,
    name: "PRODUCT ITEM NUMBER 2",
    description: "Description for product item number 2",
    price: 9.99,
    quantity: 5,
    image: "https://via.placeholder.com/200x150",
  },
];

const App = () => {
  const [products, setProducts] = React.useState(JSON.parse(JSON.stringify(PRODUCTS)));

  const deleteItem = id => {
    const newProduct = products.filter(product => product.id !== id);
    setProducts(newProduct);
  }

  const changeQuantity = (id, input) => {
    const newProducts = [...products];
    const value = checkOnly2Digit(input.value);
    for (let product of newProducts) {
      if (product.id === id ){
        product.quantity = value;
        break;
      }
    }
    setProducts(newProducts)
  }

  const checkEmpty =(id, input) => {//when input field loses focus, if input.value is empty, add value = 1 to input
    if ( input.value !== "") return 
    else {
      const newProducts = [...products];
      for (let product of newProducts) {
        if (product.id === id ){
          product.quantity = 1;
          break;
        }
      }
      setProducts(newProducts);
    }
  } 

  const resetShoppingCart = () => {// reset shopping cart
    setProducts(JSON.parse(JSON.stringify(PRODUCTS)))
  }

  return (
    <main>
      <Header products={products}/>

      <Body products={products} 
            onDelete = {deleteItem} 
            onHandleChange={changeQuantity} 
            onCheckEmpty ={checkEmpty}
      />

      <Footer products={products} onReset={resetShoppingCart}/>
    </main>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

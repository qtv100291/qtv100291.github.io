
//Function

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

const saveCartToLocal = shoppingCart => {//function save cart to local storage
  localStorage.setItem('shoppingCart',JSON.stringify(shoppingCart))
} 

const loadCartFromLocal = () => {
  const shoppingCart = JSON.parse(localStorage.getItem('shoppingCart'))
  return shoppingCart
}

//Variable and Constant

const PRODUCTS = [
  {
    id: 1,
    name: "PRODUCT ITEM NUMBER 1",
    description: "Description for product item number 1",
    price: 5.99,
    quantity: 2,
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

const promotionalCodeApprouved = [
  {
    name : "SUMMER",
    reduction: 10
  },
  {
    name : "AUTUMN",
    reduction: 20
  },
]

const tax = 10;

const App = () => {
  const [products, setProducts] = React.useState([]);
  const [inputPromotionalCode, setInputPromotionalCode] = React.useState("");
  const [promotionalCode, setPromotionalCode] = React.useState({name : "", reduction : 0});

  const deleteItem = id => {
    const newProducts = products.filter(product => product.id !== id);
    setProducts(newProducts);
    saveCartToLocal(newProducts);
  }

  React.useEffect( () => {
    if (localStorage.getItem('shoppingCart') !== null) {
      const products = loadCartFromLocal();
      setProducts(products);
    }
    else {
      setProducts(JSON.parse(JSON.stringify(PRODUCTS)))
    }
  },[])

  const changeQuantity = (id, input) => {
    const newProducts = [...products];
    const value = checkOnly2Digit(input.value);
    for (let product of newProducts) {
      if (product.id === id ){
        product.quantity = value;
        break;
      }
    }
    setProducts(newProducts);
    saveCartToLocal(newProducts);
  }

  const checkEmpty =( id, input ) => {//when input field loses focus, if input.value is empty, add value = 1 to input
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
      saveCartToLocal(newProducts);
    }
  } 

  const resetShoppingCart = () => {// reset shopping cart
    setProducts(JSON.parse(JSON.stringify(PRODUCTS)));
    localStorage.removeItem('shoppingCart');
    setPromotionalCode({name : "", reduction : 0})
  }

  const changeInputPromotionalCode = ({currentTarget : input}) => {
    const newProCode = input.value
    setInputPromotionalCode(newProCode);
  }

  const checkPromotionalCode = () => {
    const codeToCheck = inputPromotionalCode;
    for (let code of promotionalCodeApprouved) {
      if (code.name === codeToCheck){
        setPromotionalCode(code);
        alert(`Giảm giá ${code.reduction}% cho tổng giá trị giỏ hàng`);
        setInputPromotionalCode("");
        return
      }
    }
    alert("Mã giảm giá không đúng");
    setInputPromotionalCode("")
  }

  return (
    <main>
      <Header products={products}/>

      <Body products={products} 
            onDelete = {deleteItem} 
            onHandleChange={changeQuantity} 
            onCheckEmpty ={checkEmpty}
      />

      <Footer 
        products={products} 
        onReset={resetShoppingCart}
        inputPromotionalCode = {inputPromotionalCode}
        onChangeInputPromotionalCode = {changeInputPromotionalCode}
        onCheckProCode = {checkPromotionalCode}
        promotionalCode= { promotionalCode }
        tax = {tax}
      />
    </main>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

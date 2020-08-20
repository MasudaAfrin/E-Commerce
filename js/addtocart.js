//get the products added to the cart
let carts = document.querySelectorAll('.add-cart');

//static data which will be added to the cart
let products = [
    {
        name:"Denim Bag Normal",
        tag: "bag1",
        price: 250,
        inCart: 0 
    },
    {
        name:"Denim Bag Smart",
        tag: "bag2",
        price: 280,
        inCart: 0 
    },
    {
        name:"Denim Bag Modern",
        tag: "bag3",
        price: 300,
        inCart: 0 
    }
];

//adding click event to the products
for(let i=0; i<carts.length; i++){
    carts[i].addEventListener('click',()=>{
        alert("Successfully added to cart");
        cartNumbers(products[i]);
        totalCost(products[i]);
    });
}
//it shows number of products even after reload
function onloadCartTotal(){
    let proNumbers = localStorage.getItem('cartTotal');
    proNumbers = parseInt(proNumbers);
    //console.log(proNumbers);
    if(proNumbers){
        localStorage.setItem('cartTotal', proNumbers);
        document.querySelector('#cart-bag span').textContent = proNumbers;
    }
}
//adding to cart using localstorages
function cartNumbers(product){
    let proNumbers = localStorage.getItem('cartTotal');
    proNumbers = parseInt(proNumbers);
    //console.log(proNumbers);
    if(proNumbers){
        localStorage.setItem('cartTotal', proNumbers +1);
        document.querySelector('#cart-bag span').textContent = proNumbers +1;
    }
    else{
        localStorage.setItem('cartTotal',1);
        document.querySelector('#cart-bag span').textContent = 1;
    }

    //calling the function to set specify product into the cart
    setItems(product);
}
function setItems(product) {
    let cartNewItems = localStorage.getItem("productInCart");
    cartNewItems = JSON.parse(cartNewItems);
    //console.log(cartNewItems);
    if(cartNewItems != null){
        if(cartNewItems[product.tag] == undefined){
            cartNewItems ={
                ...cartNewItems,
                [product.tag]:product
            }
        }
        cartNewItems[product.tag].inCart +=1;
    }
    else{
        product.inCart = 1;
        cartNewItems = {
        [product.tag]:product
      }
    }
    localStorage.setItem("productInCart",JSON.stringify(cartNewItems));
}
function totalCost(product){
    let costNew = localStorage.getItem("totalprice");
    if(costNew != null){
        costNew = parseInt(costNew);
        localStorage.setItem("totalprice", costNew + product.price);
    }
    else{
        localStorage.setItem("totalprice",product.price);
    }
    
}
function displayCart(){
    let getProducts = localStorage.getItem("productInCart");
    getProducts = JSON.parse(getProducts);
    var i = 0;
    var j = 0;
    var k = 0;
    let productContainer = document.querySelector('.products-incart');
    if(getProducts && productContainer){
        
        productContainer.innerHTML = '';
        Object.values(getProducts).map(item =>{
            
            productContainer.innerHTML += `
            <div class = "product-header">
            <div class = "product">
                <a href="#" onclick = "deleteitems(${i++})"><i class="fas fa-times"></i></a>
                
                <img src="./images/${item.tag}.jpg" width = "60px" height= "50px">
                <span>${item.name}</span>
            </div>
            <div class="product-price">
                ${item.price}
                <span>tk</span>
            </div>
            <div class="product-quantity">
                <a href="#" onclick = "decreaseOne(${j++})"><i class="fas fa-chevron-circle-down"></i></a>
                <span id = "quan-number" style="padding: 0px 10px; border:1px solid black; border-radius:5px">${item.inCart}</span>
                <a href="#" onclick = "increaseOne(${k++})" id = "inc"><i class="fas fa-chevron-circle-up"></i></a>
            </div>
            <div class="product-total">
                ${item.price * item.inCart}
                <span>tk</span>
            </div>
            </div>
        ` 
        });      
    }   
    else{
        productContainer.innerHTML += `
            <div>
             <p>There is no product to show.</p>
            </div>
        `
    }
    showTotal();
}
//showing total cost
function showTotal(){
    let total = document.querySelector(".final-cost span");
    let getProducts = localStorage.getItem("productInCart");
    getProducts = JSON.parse(getProducts);
    if(getProducts == null && total){
        total.textContent = "0.00 Tk";
    }
    else{
        let currentTotal = localStorage.getItem("totalprice");
        currentTotal = parseInt(currentTotal);
        total.textContent = currentTotal;
    }
}
//increase for quantity
function increaseOne(k){
    let getProducts = localStorage.getItem("productInCart");
    getProducts = JSON.parse(getProducts);

    let objectKey=[];
      Object.keys(getProducts).map(key =>{
          objectKey.push(key);
      })

    let sentItem = getProducts[objectKey[k]];
    cartNumbers(sentItem);
    totalCost(sentItem);
    displayCart();
}

//decrease for quantity
function decreaseOne(j){
  let idtake = document.getElementById("quan-number");
  let update = idtake.textContent;
  update = parseInt(update);
  let proNumbers = localStorage.getItem('cartTotal');
  proNumbers = parseInt(proNumbers);
  let getProducts = localStorage.getItem("productInCart");
  getProducts = JSON.parse(getProducts);
    let objectKey=[];
      Object.keys(getProducts).map(key =>{
          objectKey.push(key);
      })
  let sentItem = getProducts[objectKey[j]];
  let currentItem = getProducts[objectKey[j]].inCart;  
  currentItem -= 1;
  check = update-1;
  if(check <= 0 && currentItem<=0){
      alert("minimum product must be one");
      idtake.textContent = 1;
      //document.getElementById("dec").style.color = "lightgrey";
  }
  else{
    idtake.textContent = update-1; 
    localStorage.setItem('cartTotal', proNumbers -1);
    document.querySelector('#cart-bag span').textContent = proNumbers -1;
      getProducts[objectKey[j]].inCart = currentItem;
      localStorage.setItem("productInCart",JSON.stringify(getProducts));
  }
  displayCart();
  costdec(sentItem);
  onloadCartTotal();
}
//decreasing cart number
function decreaseCartNumber(currentItem){
    let proNumbers = localStorage.getItem('cartTotal');
    proNumbers = parseInt(proNumbers);
    //console.log(proNumbers);
    localStorage.setItem('cartTotal', proNumbers -currentItem);
    document.querySelector('#cart-bag span').textContent = proNumbers -currentItem; 
}
//decrease total cost
function costcalculation(sentItem){
    //console.log(typeof sentItem.inCart, typeof sentItem.price);
    let costCurrent = sentItem.price * sentItem.inCart;
    let costOld = localStorage.getItem("totalprice");
    costOld = parseInt(costOld);
    let costNew = costOld - costCurrent;
    
    localStorage.setItem("totalprice",costNew);
}
//decrease one productcost
function costdec(sentItem){
    let costOld = localStorage.getItem("totalprice");
    costOld = parseInt(costOld);
    let costCurrent = sentItem.price;
    let costNew = costOld - costCurrent;
    localStorage.setItem("totalprice",costNew);
}
//delete entire product
function deleteitems(i){
    let getProducts = localStorage.getItem("productInCart");
    getProducts = JSON.parse(getProducts);
     //delete program
       let objectKey=[];
      Object.keys(getProducts).map(key =>{
          objectKey.push(key);
      })
      let sentItem = getProducts[objectKey[i]];
      let currentItem = getProducts[objectKey[i]].inCart;
      delete getProducts[objectKey[i]];
      localStorage.setItem("productInCart",JSON.stringify(getProducts));
      //delete ends
      //cost calculation
      decreaseCartNumber(currentItem);
      onloadCartTotal();
      costcalculation(sentItem);
      displayCart();
     
}
function clearAll(){
        localStorage.clear();
}
//clearAll()
onloadCartTotal();
displayCart();

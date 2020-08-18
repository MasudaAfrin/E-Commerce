//get the products added to the cart
let carts = document.querySelectorAll('.add-cart');
//let demo = [];
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
//demo.push(products[0]);
//console.log(demo[0]);
//adding click event to the products
for(let i=0; i<carts.length; i++){
    carts[i].addEventListener('click',()=>{
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
    
    //console.log(getProducts);
    let productContainer = document.querySelector('.products-incart');
    if(getProducts && productContainer){
        productContainer.innerHTML = '';
        Object.values(getProducts).map(item =>{
            productContainer.innerHTML += `
            <div class = "product-header">
            <div class = "product">
                <i class="fas fa-times"></i>
                <img src="./images/${item.tag}.jpg" width = "60px" height= "50px">
                <span>${item.name}</span>
            </div>
            <div class="product-price">
                ${item.price}
                <span>tk</span>
            </div>
            <div class="product-quantity">
                 <i class="fas fa-chevron-circle-up"></i>
                <span style="padding: 0px 10px; border:1px solid black; border-radius:5px">${item.inCart}</span>
                <i class="fas fa-chevron-circle-down"></i>
            </div>
            <div class="product-total">
                ${item.price * item.inCart}
                <span>tk</span>
            </div>
            </div>
        `
        });
        
    }
    
}
onloadCartTotal();
displayCart();

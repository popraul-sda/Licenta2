import "../styles/App.css";
import {Header} from "../components/product-page-components/Header";
import {useEffect, useState} from "react";
import {BannerName} from "../components/product-page-components/BannerName";
import {SubMenuContainer} from "../components/product-page-components/SubMenuContainer";
import {MenuCard} from "../components/product-page-components/MenuCard";
import {ItemCard} from "../components/product-page-components/ItemCard";
import {CartItem} from "../components/product-page-components/CartItem";
import {useStateValue} from "../components/product-page-components/StateProvider";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate  } from 'react-router-dom';
import {BottomMenu} from "../components/product-page-components/BottomMenu";

export function ProductsPage(){

    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [activeCategory, setActiveCategory] = useState('Burger');
    const [isMainData, setMainData] = useState(
        products.filter((element) => element.id === 1)
    );
    const [{ cart }] = useStateValue();
    const [{ total }] = useStateValue();
    let navigate = useNavigate();

    useEffect(() => {
        getCategories();
        getProducts();

        const menuCard = document
            .querySelector(".rowContainer")
            .querySelectorAll(".rowMenuCard");

        function setMenuCardActive() {
            menuCard.forEach((n) => n.classList.remove("active"));
            this.classList.add("active");
        }

        menuCard.forEach((n) => n.addEventListener("click", setMenuCardActive));

        console.log(document.getElementById("search").value)

    }, [isMainData, cart]);


    function getCategories(){
        fetch('http://localhost:8080/categories', {
            headers: {
                'Authorization':'Bearer ' + sessionStorage.getItem('token')
            },
            method: "GET"
        })
            .then(function(response){
                return response.json();
            }).then(function(data) {
            setCategories(data)
        })
    }

    function getProducts(){
        fetch('http://localhost:8080/products', {
            headers: {
                'Authorization':'Bearer ' + sessionStorage.getItem('token')
            },
            method: "GET"
        })
            .then(function(response){
                return response.json();
            }).then(function(data) {
            setProducts(data)
        })
    }

    function switchCategory(name, id){
        setActiveCategory(name);
        setMainData(products.filter((element) => element.id === id));
    }

    function checkout(){
        cart.length !== 0 ? navigate("/checkout") : toast("Cart is empty!");
    }

    return (
      <div className="App">
          {/* Header Section */}
          <Header />
          {/* Main Container */}
          <main>
              <div className="mainContainer">
                  <div className="banner">
                      <BannerName name={sessionStorage.getItem('name') ? sessionStorage.getItem('name') : ""} discount={"20"} link={"#"}/>
                      <img src="https://firebasestorage.googleapis.com/v0/b/food-delivery-37c59.appspot.com/o/Images%2Fdelivery.png?alt=media&token=69b9823d-96df-452a-bd4e-14d27a4cc337"
                           alt=""
                           className="deliveryPic"
                      />
                  </div>

                  <div className="dishContainer">
                      <div className="menuCard">
                          <SubMenuContainer name={"Menu Category"}/>
                      </div>
                      <div className="rowContainer">
                          {
                              categories.map(data => (
                                  <div key={data.id} onClick={() => switchCategory(data.name, data.id)}>
                                      <MenuCard imgSrc={data.picture} name={data.name}/>
                                  </div>
                              ))
                          }
                      </div>
                      <div className="dishItemContainer">
                          {
                              products.filter(product => product.category === activeCategory)
                                  .map(product => (<div key={product.id}>
                                      <ItemCard key={product.id}
                                                itemId={product.id}
                                                name={product.name}
                                                imgSrc={product.image}
                                                price={product.price}
                                                products={products}
                                      />
                                  </div>))
                          }
                      </div>
                  </div>
                  <div className="rightMenu">

                      {!cart ? <div>Cart is empty.</div> : cart.length === 0 ? <div>Cart is empty.</div> :
                          <div className="cartCheckOutContainer">
                              <div className="cartContainer">
                                  <SubMenuContainer name={"Cart Items"}/>
                                  <div className="cartItems">
                                      {
                                          cart && cart.map(data => (
                                              <CartItem key={data[0].id}
                                                        itemId={data[0].id}
                                                        name={data[0].name}
                                                        imgSrc={data[0].image}
                                                        price={data[0].price}
                                              />
                                          ))
                                      }
                                  </div>
                              </div>
                              {
                                  cart ? total >= 50 ? <p>Taxa transport:<span className="space"></span>gratuit</p> : <p>Taxa transport:<span className="space"></span> lei 10</p> : null
                              }
                              <div className="totalSection">
                                  <h3>Total</h3>
                                  <p>
                                      <span>lei </span>{total >= 50 ? total : total + 10}
                                  </p>
                              </div>

                              <button className="checkOut" onClick={() => checkout()}>Check Out</button>
                          </div>
                      }

                  </div>
              </div>
          </main>
          {/* Bottom Menu */}

          <BottomMenu />
          <ToastContainer />
      </div>
    );
}
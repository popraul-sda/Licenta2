import "../styles/App.css";
import {Header} from "../components/product-page-components/Header";
import {MenuContainer} from "../components/product-page-components/MenuContainer";
import {
    AccountBalanceWalletRounded,
    Chat,
    Favorite,
    HomeRounded,
    Settings,
    SummarizeRounded
} from "@mui/icons-material";
import {useEffect, useState} from "react";
import {BannerName} from "../components/product-page-components/BannerName";
import {SubMenuContainer} from "../components/product-page-components/SubMenuContainer";
import {MenuCard} from "../components/product-page-components/MenuCard";
import {ItemCard} from "../components/product-page-components/ItemCard";
import {CartItem} from "../components/product-page-components/CartItem";
import {useStateValue} from "../components/product-page-components/StateProvider";
import {useLocation} from "react-router";

export function ProductsPage(){

    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [activeCategory, setActiveCategory] = useState('Burger');
    const [isMainData, setMainData] = useState(
        products.filter((element) => element.id === 1)
    );
    const [{ cart, total }, dispatch] = useStateValue();
    const [totalPrice, setTotalPrice] = useState(0);
    const location = useLocation();
    const param1 = location.state?.firstName;
    const param2 = location.state?.lastName;

    useEffect(() => {
        const menuLi = document.querySelectorAll("#menu li");
        getCategories();
        getProducts();

        function setMenuActive(){
            menuLi.forEach(n => n.classList.remove("hover"));
            this.classList.add("hover");
        }

        menuLi.forEach(n => n.addEventListener('mouseover', setMenuActive));

        const menuCard = document
            .querySelector(".rowContainer")
            .querySelectorAll(".rowMenuCard");

        function setMenuCardActive() {
            menuCard.forEach((n) => n.classList.remove("active"));
            this.classList.add("active");
        }

        menuCard.forEach((n) => n.addEventListener("click", setMenuCardActive));


    }, [isMainData, cart, total, totalPrice]);

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

    return (
      <div className="App">
          {/* Header Section */}
          <Header name={param1 + " " + param2}/>
          {/* Main Container */}
          <main>
              <div className="mainContainer">
                  <div className="banner">
                      <BannerName name={param1 + " " + param2} discount={"20"} link={"#"}/>
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

                      {!cart ? <div>Cart is empty.</div> :
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
                              <div className="totalSection">
                                  <h3>Total</h3>
                                  <p>
                                      <span>lei </span>{totalPrice}
                                  </p>
                              </div>

                              <button className="checkOut">Check Out</button>
                          </div>
                      }

                  </div>
              </div>
          </main>
          {/* Bottom Menu */}

          <div className="bottomMenu">
              <ul id="menu">
                  <MenuContainer link={'#'} icon = {<HomeRounded />} isHome/>
                  <MenuContainer link={'#'} icon = {<Chat />} />
                  <MenuContainer link={'#'} icon = {<AccountBalanceWalletRounded />} />
                  <MenuContainer link={'#'} icon = {<Favorite />} />
                  <MenuContainer link={'#'} icon = {<SummarizeRounded />} />
                  <MenuContainer link={'#'} icon = {<Settings />} />
                  <div className="indicator">
                  </div>
              </ul>
          </div>
      </div>
    );
}
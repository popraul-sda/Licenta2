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

export function ProductsPage(){

    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [activeCategory, setActiveCategory] = useState('Burger');

    useEffect(() => {
        const menuLi = document.querySelectorAll("#menu li");
        getCategories();
        getProducts();

        function setMenuActive(){
            menuLi.forEach(n => n.classList.remove("hover"));
            this.classList.add("hover");
        }

        menuLi.forEach(n => n.addEventListener('mouseover', setMenuActive))

    }, [])

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

    function switchCategory(name){
        setActiveCategory(name);
    }

    return (
      <div className="App">
          {/* Header Section */}
          <Header />
          {/* Main Container */}
          <main>
              <div className="mainContainer">
                  <div className="banner">
                      <BannerName name={"Raul"} discount={"20"} link={"#"}/>
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
                                  <div key={data.id} onClick={() => switchCategory(data.name)}>
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
                                                name={product.name}
                                                imgSrc={product.image}
                                                price={product.price}
                                      />
                                  </div>))
                          }
                      </div>
                  </div>
                  <div className="rightMenu">

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
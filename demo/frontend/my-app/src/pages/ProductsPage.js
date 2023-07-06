import "../styles/App.css";
import { Helmet } from 'react-helmet';
import {useEffect, useState} from "react";
import {BannerName} from "../components/product-page-components/BannerName";
import {MenuCard} from "../components/product-page-components/MenuCard";
import {ItemCard} from "../components/product-page-components/ItemCard";
import {CartItem} from "../components/product-page-components/CartItem";
import {useStateValue} from "../components/product-page-components/StateProvider";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from 'react-router-dom';
import {BottomMenu} from "../components/product-page-components/BottomMenu";
import {SearchRounded, ShoppingCartRounded} from "@mui/icons-material";
import PersonIcon from "@mui/icons-material/Person";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";

export function ProductsPage() {

    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [activeCategory, setActiveCategory] = useState('Burger');
    const [isMainData, setMainData] = useState(
        products.filter((element) => element.id === 1)
    );
    const [{cart}, dispatch] = useStateValue();
    const [{total}] = useStateValue();
    let navigate = useNavigate();
    const [search, setSearch] = useState('');

    useEffect(() => {
        // getCategories();
        // getProducts();

        fetchData();

        async function fetchData() {
            try {
                const categoriesResponse = await fetch('http://localhost:8080/categories', {
                    headers: {
                        'Authorization': 'Bearer ' + sessionStorage.getItem('token')
                    },
                    method: "GET"
                });
                const categoriesData = await categoriesResponse.json();
                setCategories(categoriesData);

                const productsResponse = await fetch('http://localhost:8080/products', {
                    headers: {
                        'Authorization': 'Bearer ' + sessionStorage.getItem('token')
                    },
                    method: "GET"
                });
                const productsData = await productsResponse.json();
                setProducts(productsData.filter(item => item.active === "Active"));
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        const menuCard = document
            .querySelector(".rowContainer")
            .querySelectorAll(".rowMenuCard");

        function setMenuCardActive() {
            menuCard.forEach((n) => n.classList.remove("active"));
            this.classList.add("active");
        }

        menuCard.forEach((n) => n.addEventListener("click", setMenuCardActive));

    }, [isMainData, cart]);

    //
    // function getCategories() {
    //     fetch('http://localhost:8080/categories', {
    //         headers: {
    //             'Authorization': 'Bearer ' + sessionStorage.getItem('token')
    //         },
    //         method: "GET"
    //     })
    //         .then(function (response) {
    //             return response.json();
    //         }).then(function (data) {
    //         setCategories(data)
    //     })
    // }
    //
    // function getProducts() {
    //     fetch('http://localhost:8080/products', {
    //         headers: {
    //             'Authorization': 'Bearer ' + sessionStorage.getItem('token')
    //         },
    //         method: "GET"
    //     })
    //         .then(function (response) {
    //             return response.json();
    //         }).then(function (data) {
    //         setProducts(data.filter(item => item.active === "Active"))
    //     })
    // }

    function switchCategory(name, id) {
        setActiveCategory(name);
        setMainData(products.filter((element) => element.id === id));
    }

    function checkout() {
        cart.length !== 0 ? navigate("/checkout") : toast("Cart is empty!");
    }

    function goToLogin(){
        sessionStorage.getItem('name') ? navigate("/account") : navigate("/login", { state: { href: window.location.pathname} });
    }

    function logOut(){
        fetch('http://localhost:8080/logout', {
            method: "GET"
        }).then(function(res){
            console.log(res);
        })

        sessionStorage.clear();
        navigate("/");
    }

    function productDetails(name){
        const path = "/product/" + name.replace(/\s+/g, '');
        navigate(path, { state: { data: products.filter(product => product.name === name) } });
    }

    function generateProductJsonLd(product) {
        return `
    {
      "@context": "https://schema.org/",
      "@type": "Product",
      "name": "${product.name}",
      "description": "${product.description}",
      "offers": {
        "@type": "Offer",
        "price": "${product.price}",
        "seller": {
          "@type": "Organization",
          "name": "Fazoli's"
        }
      }
    }
  `;
    }


    return (
        <div className="App">
            <Helmet>
                {products.map((product) => (
                    <script key={product.id} type="application/ld+json">
                        {generateProductJsonLd(product)}
                    </script>
                ))}
            </Helmet>
            {/* Header Section */}
            <header>
                <img src="https://firebasestorage.googleapis.com/v0/b/food-delivery-37c59.appspot.com/o/Images%2Flogo.png?alt=media&token=fc228623-ef27-4af4-8ea5-b9ebeeaf47dc"
                     alt=""
                     className="logo"
                />

                {
                    window.location.pathname === "/" ?
                        <div className="searchBox-container">
                            <div className="inputBox" >
                                <SearchRounded className="SearchIcon" />
                                <input id="search" type="text" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)}/>
                                {/*{*/}
                                {/*    search && (*/}
                                {/*        <div className="search-results">*/}
                                {/*            {*/}
                                {/*                products*/}
                                {/*                    .filter(item => item.name.toLowerCase().startsWith(search.toLowerCase()))*/}
                                {/*                    .map(item => (*/}
                                {/*                        <p*/}
                                {/*                            key={item.id}*/}
                                {/*                            className="inputBox child"*/}
                                {/*                            onClick={() => productDetails(item.name)}*/}
                                {/*                        >*/}
                                {/*                            {item.name}*/}
                                {/*                        </p>*/}
                                {/*                    ))*/}
                                {/*            }*/}
                                {/*        </div>*/}
                                {/*    )*/}
                                {/*}*/}
                            </div>
                        </div>
                        : null
                }


                {
                    cart !== null ?
                        cart.length !== 0 && window.location.pathname === "/" ?
                            <div className="shoppingCart" >
                                <ShoppingCartRounded className="cart" />
                                <div className="cart_content">
                                    <p>{cart ? cart.length : '0'}</p>
                                </div>
                            </div>
                            :
                            null
                        :
                        null
                }

                <div className="profileContainer">
                    <div className="imgBox">
                        <PersonIcon />
                    </div>
                    {
                        sessionStorage.getItem('name')  ?
                            <DropdownButton id="dropdown-basic-button" variant="Secondary" className="log-button" title={sessionStorage.getItem('name')}>
                                <Dropdown.Item onClick={() => goToLogin()}>Account</Dropdown.Item>
                                <hr />
                                <Dropdown.Item onClick={() => logOut()}>Log Out</Dropdown.Item>
                            </DropdownButton>
                            : <p className="log-p" onClick={() => goToLogin()}>Log in</p>
                    }
                </div>
            </header>
            {/* Main Container */}
            <main style={cart !== null ? cart.length !== 0 ? null : {marginLeft: 180} : {marginLeft: 180}}>
                <div className="mainContainer">
                    <div className="banner">
                        <BannerName name={sessionStorage.getItem('name') ? sessionStorage.getItem('name') : ""}
                                    discount={"20"} link={"#"}/>
                        <img
                            src="https://firebasestorage.googleapis.com/v0/b/food-delivery-37c59.appspot.com/o/Images%2Fdelivery.png?alt=media&token=69b9823d-96df-452a-bd4e-14d27a4cc337"
                            alt=""
                            className="deliveryPic"
                        />
                    </div>
                    <div className="dishContainer">
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
                                products.filter(product => search ? product.name.toLowerCase().startsWith(search.toLowerCase()) : product.category === activeCategory)
                                    .map(product => (<div key={product.id}>
                                        <ItemCard key={product.id}
                                                  itemId={product.id}
                                                  name={product.name}
                                                  imgSrc={product.fileData ? process.env.PUBLIC_URL + "/images/" + product.fileData.name : ""}
                                                  price={product.price}
                                                  products={products}
                                                  description={product.description}
                                        />
                                    </div>))
                            }
                        </div>
                    </div>
                    {
                        cart !== null ?
                            cart.length !== 0 ?
                                <div className="rightMenu">

                                    {!cart ? <div>Cart is empty.</div> : cart === 0 ? <div>Cart is empty.</div> :
                                        <div className="cartCheckOutContainer">
                                            <div className="cartContainer">
                                                <div className="cartItems">
                                                    {
                                                        cart && cart.map(data => (
                                                            <CartItem key={data[0].id}
                                                                      itemId={data[0].id}
                                                                      name={data[0].name}
                                                                      imgSrc={data[0].fileData ? process.env.PUBLIC_URL + "/images/" + data[0].fileData.name : ""}
                                                                      price={data[0].price}
                                                            />
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                            {
                                                cart ? total >= 50 ?
                                                    <p>Taxa transport:<span className="space"></span>gratuit</p> :
                                                    <p>Taxa transport:<span className="space"></span> lei 10</p> : null
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
                                :
                                null
                            :
                            null
                    }
                </div>
            </main>
            {/* Bottom Menu */}

            <BottomMenu/>
            <ToastContainer/>
        </div>
    );
}
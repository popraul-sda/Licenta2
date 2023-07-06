import {AddRounded} from "@mui/icons-material";
import {useStateValue} from "./StateProvider";
import {useEffect, useState} from "react";
import {actionType} from "./reducer";
import {useNavigate} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// let cartData = sessionStorage.getItem('cart') ? JSON.parse(sessionStorage.getItem('cart')) : [];
let cartData = [];

export function ItemCard({imgSrc, name, price, itemId, products, description}){

    let navigate = useNavigate();
    const [{total}, dispatch] = useStateValue();
    const [isCart, setCart] = useState(null);
    const [isDuplicate, setIsDuplicate] = useState(false);

    useEffect(() => {
        if (isCart && isDuplicate === false) {
            isCart[0].quantity = 1;
            cartData.push(isCart);
            setIsDuplicate(true);
            dispatch({
                type: actionType.SET_CART,
                cart: cartData,
            });
        }
        else if (isDuplicate) {
            toast("Item already in cart! Change the quantity with the plus sign below!");
        }
        // sessionStorage.setItem('total', total);
    }, [isCart]);

    // function productDetails(name){
    //     const path = "/product/" + name.replace(/\s+/g, '');
    //     navigate(path, { state: { data: products.filter(product => product.name === name) } });
    // }

    function addItem(){
        setCart(products.filter((n) => n.id === itemId));
        if (total === 0){
            dispatch({
                type: actionType.SET_TOTAL,
                total: parseInt(price),
            });
            setIsDuplicate(false);
        }
        else if (isDuplicate === false)
            dispatch({
            type: actionType.SET_TOTAL,
            total: total + parseInt(price),
        });
    }

    return (
      <div className="itemCard">
          <div className="imgBox">
              <img src={imgSrc} alt="" className="itemImg" />
          </div>
          <div className="itemContent">
              <h3 className="itemName">{name}</h3>
              <p className="itemCard-description">{description}</p>
              <div className="bottom" >
                  <div className="ratings">
                      <h3 className="price">
                          {price}
                          <span> lei</span>
                      </h3>
                  </div>
                  <i className="addToCart"
                     onClick={() => {
                         addItem()
                     }}
                  >
                      <AddRounded />
                  </i>
              </div>
          </div>
          <ToastContainer />
      </div>
    );
}
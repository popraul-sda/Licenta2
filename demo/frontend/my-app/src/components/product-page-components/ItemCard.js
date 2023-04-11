import {AddRounded} from "@mui/icons-material";
import {useStateValue} from "./StateProvider";
import {useEffect, useState} from "react";
import {actionType} from "./reducer";
import {useNavigate} from "react-router-dom";
let cartData = [];

export function ItemCard({imgSrc, name, price, itemId, products}){

    let navigate = useNavigate();
    const [{}, dispatch] = useStateValue();
    const [isCart, setCart] = useState(null);

    useEffect(() => {
        if (isCart) {
            cartData.push(isCart);
            dispatch({
                type: actionType.SET_CART,
                cart: cartData,
            });
        }
    }, [isCart]);

    function productDetails(name){
        const path = "/product/" + name.replace(/\s+/g, '');
        navigate(path, { state: { data: products.filter(product => product.name === name) } });
    }

    return (
      <div className="itemCard">
          <div className="imgBox">
              <img src={imgSrc} alt="" className="itemImg" onClick={() => productDetails(name)}/>
          </div>
          <div className="itemContent">
              <h3 className="itemName">{name}</h3>
              <div className="bottom" >
                  <div className="ratings">
                      <h3 className="price">
                          {price}
                          <span> lei</span>
                      </h3>
                  </div>
                  <i className="addToCart"
                     onClick={() => {
                         setCart(products.filter((n) => n.id === itemId));
                     }}
                  >
                      <AddRounded />
                  </i>
              </div>
          </div>
      </div>
    );
}
import {AddRounded, RemoveRounded} from "@mui/icons-material";
import {useEffect, useState} from "react";
import {useStateValue} from "./StateProvider";
import {actionType} from "./reducer";
let cartItems = [];
let amount = 0;

export function CartItem({name, imgSrc, price, itemId}){

    const [qty, setQty] = useState(1);
    const [{cart}, dispatch] = useStateValue();
    const [itemPrice, setItemPrice] = useState(parseInt(qty) * parseFloat(price))

    useEffect(() => {
        cartItems = cart;
        setItemPrice(parseInt(qty) * parseFloat(price));
    }, [qty, itemPrice]);

    const updateQuantity = (action, id) =>{
        if(action === 'add'){
            setQty(qty + 1);
            cartItems.forEach(item => {
                if (item[0].name === name) item[0].quantity++;
            })
            calculateTotal();
        }
        else{
            if(qty == 1){
                let index = returnIndex(id);
                cartItems.splice(index, 1);
                dispatch({
                    type: actionType.SET_CART,
                    cart: cartItems,
                })
            }
            setQty(qty - 1);
            cartItems.forEach(item => {
                if (item[0].name === name) item[0].quantity--;
            })
            calculateTotal();
        }
    }

    function returnIndex(id) {
        let counter = 0;
        let index = -1;
        cartItems.forEach((element) => {
            if(element[0].id === id){
                index = counter;
            }
            counter++;
        });
        return index;
    }

    function calculateTotal(){
        cart.forEach(item =>{
            amount = amount + parseInt(item[0].price) * item[0].quantity;
        })
        dispatch({
            type: actionType.SET_TOTAL,
            total: amount,
        })
        amount = 0;
    }

    return (
        <div className="cartItem">
            <div className="imgBox">
                <img src={imgSrc} alt="" />
            </div>
            <div className="itemSection">
                <h2 className="itemName">{name}</h2>
                <div className="itemQuantity">
                    <span>x {qty}</span>
                    <div className="quantity">
                        <RemoveRounded
                            className="itemRemove"
                            onClick={() => updateQuantity('remove', itemId)}
                        />
                        <AddRounded
                            className="itemAdd"
                            onClick={() => updateQuantity('add', itemId)}
                        />
                    </div>
                </div>
            </div>
            <p className="itemPrice">
                <span className="dolorSign">lei</span>{" "}
                <span className="itemPriceValue">{itemPrice}</span>
            </p>
        </div>
    );
}
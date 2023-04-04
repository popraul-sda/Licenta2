import {AddRounded, RemoveRounded} from "@mui/icons-material";

export function CartItem({name, imgSrc, qty, price}){
    return (
      <div className="cardItem">
        <div className="imgBox">
            <img src={imgSrc} alt="" />
            <div className="itemSection">
                <p className="itemName">{name}</p>
                <div className="itemQuantity">
                    <span>x {qty}</span>
                    <div className="quantity">
                        <RemoveRounded className="itemRemove"/>

                        <AddRounded className="itemAdd"/>

                    </div>

                </div>
            </div>
            <p className="itemPrice">
                <span className="dolorSign">$ </span>
                <span className="itemPriceValue">{price}</span>
            </p>
        </div>
      </div>
    );
}
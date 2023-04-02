import {AddRounded} from "@mui/icons-material";

export function ItemCard({imgSrc, name, price}){
    return (
      <div className="itemCard">
          <div className="imgBox">
              <img src={imgSrc} alt="" className="itemImg"/>
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
                  <i className="addToCart">
                      <AddRounded />
                  </i>
              </div>
          </div>
      </div>
    );
}
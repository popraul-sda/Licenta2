import CountdownTimer from "../../components/CountdownTimer/CountdownTimer";
import React, {useEffect} from "react";
import '../../styles/accountPage.css';
import {CheckCircle, DeliveryDining, Description, Fastfood} from "@mui/icons-material";
import '../../styles/checkout.css';

export function CurrentOrder({countdownTimestampMs, co, coTime}){

    useEffect(() => {

        if(countdownTimestampMs !== 0){
            if(coTime < new Date().getTime()){
                const firstIcon = document.querySelector(".order-received");
                firstIcon.classList.add("icon-active")
            }
            if(coTime + 8*60*1000 < new Date().getTime()){
                const firstIcon = document.querySelector(".order-inProcess");
                firstIcon.classList.add("icon-active")
            }
            if(coTime + 16*60*1000 < new Date().getTime()){
                const firstIcon = document.querySelector(".order-delivery");
                firstIcon.classList.add("icon-active")
            }
            if(coTime + 28*60*1000 < new Date().getTime()){
                const firstIcon = document.querySelector(".order-delivered");
                firstIcon.classList.add("icon-active")
            }
        }
    }, [coTime])

    return(
      <>
          {
              countdownTimestampMs === 0 ?
                  <div>
                      <p className="no-order">You have no ongoing orders!</p>
                  </div>
                  :
                  <div className="current-order-main-container">
                      <p className="timer-text">Time until your order arrives: </p>
                      <CountdownTimer countdownTimestampMs={countdownTimestampMs}/>
                      <div className="order-progress">
                          <Description className="order-received large"/>
                          <Fastfood className="order-inProcess large"/>
                          <DeliveryDining className="order-delivery large"/>
                          <CheckCircle className="order-delivered large"/>
                      </div>
                      {
                          co ? co.map(item =>
                                  <div className="active-order-items">
                                  <p className="order-text">{item.quantity} x {item.product.name}   {item.product.price} lei</p>
                                  <br />
                                  <br />
                              </div>
                              )
                              : null
                      }
                  </div>

          }
      </>
    );
}
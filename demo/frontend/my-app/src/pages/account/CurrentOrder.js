import CountdownTimer from "../../components/CountdownTimer/CountdownTimer";
import React from "react";
import '../../styles/accountPage.css';

export function CurrentOrder({countdownTimestampMs, co}){
    return(
      <>
          {
              countdownTimestampMs === 0 ?
                  <div>
                      <p className="no-order">You have no ongoing orders!</p>
                  </div>
                  :
                  <div>
                      <p className="timer-text">Time until your order arrives: </p>
                      <CountdownTimer countdownTimestampMs={countdownTimestampMs}/>
                      {
                          co ? co.map(item =>
                                  <div>
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
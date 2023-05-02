import CountdownTimer from "../../components/CountdownTimer/CountdownTimer";

export function CurrentOrder({countdownTimestampMs}){
    return(
      <>
          <CountdownTimer countdownTimestampMs={countdownTimestampMs}/>
      </>
    );
}
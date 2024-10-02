import React,{useState} from "react";
import "./EventStyle.css"

export let error_Event:Function
export let endError_Event:Function

const Error_Screen:React.FC = ()=>{
    const [eventState,SetState] = useState<boolean>(false);

    error_Event = ()=>{
        SetState(true)
    }

    endError_Event = ()=>{
        SetState(false)
    }
    
    return(
        <>
            { eventState && (
                <div className="errorBackground">
                    <div style={{
                            position:"absolute",
                            top:"20vh",
                            left:"30vw",
                            fontSize:"10vh",
                            transform:"translate(-50%,-50%)",
                        }}>ERROR:
                    </div>
                    <div style={{
                            position:"absolute",
                            top:"30vh",
                            left:"24vw",
                            fontSize:"3vh",
                            width:"50vw",
                            fontWeight:"bold"
                        }}>{"TrollError: TrollError is not Error,"}
                        <h5>Are you embarrassed because an error message appears right now? Even as you do this, time continues to pass. {">'u'>"}</h5>
                        <h5><u>{"Line 1: console.log('>'u'>');"}</u>&emsp;&emsp;&emsp;&emsp;&emsp;at troll.js:1</h5>
                    </div>
                </div>
            )}
        </>
    )
}

export default Error_Screen;
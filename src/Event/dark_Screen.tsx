import React,{useState} from "react";
import "./EventStyle.css"

export let dark_Event:Function
export let endDark_Event:Function


const Dark_Screen:React.FC = ()=>{
    const [eventState,setState] = useState<boolean>(false);
    const [brightness, setBrightness] = useState(100);

    dark_Event = ()=>{
        setState(true)
    }

    endDark_Event = ()=>{
        setState(false)
    }    

    const handleScroll = (event: any) => {
        setBrightness(event.target.value);
    };

    return (
        <>
            {eventState && (
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={brightness}
                    onChange={handleScroll}
                    className="Night_Scroll"
                    color="white"
                />
            )}
        </>
    )
}

export default Dark_Screen;
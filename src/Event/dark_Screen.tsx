import React,{useState, useRef, useEffect} from "react";
import { usePlayData } from "../PlayData";
import "./EventStyle.css"

export let dark_Event: Function;
export let endDark_Event: Function;

const Dark_Screen: React.FC = () => {
    const [eventState, setState] = useState<boolean>(false);
    const [brightness, setBrightness] = useState(100);
    const boader = useRef<HTMLDivElement>(null);
    const scoll = useRef<HTMLInputElement>(null);
    const background = useRef<HTMLDivElement>(null);
    const {word_Count} = usePlayData()
    const continueCount = 20
    const decreaseSpeed = 1
    let intervalId:any

    dark_Event = () => {
        setState(true);
    }

    endDark_Event = () => {
        if (eventState){
            clearInterval(intervalId)
            setBrightness(100)
            setState(false)
            console.log("AWdawdarhgawrhawrhrawe")
        }
     }

    const root = () => {
        const current_Count = word_Count.current;
        intervalId = setInterval(() => {
            setBrightness((prevBrightness) => {
                const newBrightness = Math.max(0, prevBrightness - decreaseSpeed);

                if (background.current) {
                    background.current.style.opacity = `${1 - newBrightness / 100}`;
                }

                if (word_Count.current - current_Count >= continueCount) {
                    setState(false);
                    clearInterval(intervalId);
                    return 100;
                }

                return newBrightness;
            });
        }, 100);
    };

    useEffect(() => {
        if (boader.current && scoll.current && eventState && eventState) {
            boader.current.style.top = `${Math.floor(Math.random() * 70) + 1}vh`;
            boader.current.style.left = `${Math.floor(Math.random() * 90) + 1}vw`;

            root()
        }
    }, [eventState]);

    const handleScroll = (event: any) => {
        setBrightness(event.target.value);
    };

    return (
        <>
            {eventState && (
                <>
                    <div className="Night_Background" ref={background}></div>
                    <div className="Night_ScrollBoader" ref={boader}>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            onChange={handleScroll}
                            value={brightness}
                            className="Night_Scroll"
                            ref={scoll}
                        />
                    </div>
                </>
            )}
        </>
    )
}

export default Dark_Screen;
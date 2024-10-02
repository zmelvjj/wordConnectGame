import React from "react";
import Word_Eeversak,{word_Event, endWord_Event} from "./Event/word_Eeversal"
import Auto_Complete,{auto_Event, endAuto_Event} from "./Event/auto_Complete"
import Pop_up_Window,{popUp_Event,endPopUp_Event} from "./Event/pop-up-Window";
import Dark_Screen,{dark_Event,endDark_Event} from "./Event/dark_Screen"
import Error_Screen,{error_Event,endError_Event} from "./Event/error_Screen";
import Overwrite,{overwrite,endOverwrite} from "./Event/overwrite";
import { usePlayData } from "./PlayData";

export let setEvent:Function
export let StopEvent:Function

type EventType = {
    [key: number]: [string, number];
};

const EvnetList:React.FC = ()=>{
    const Event:EventType = {
        1:["word_Eeversal",20000],
        2:["auto_Complete",30000],
        3:["pop-up-Window",34500],
        4:["overwrite",35000],
        5:["dark_Screen",37000],
        6:["error_Screen",40000],
        
    }
    
    const {Score, word_Count} = usePlayData()
    const getProbability = (base:number)=>{
        const probability = Math.min(8,Score.current/base * word_Count.current/10)
        return Math.random()*5 < probability;
    }

    const eventLisn = ()=>{
        //setTimeout(()=>{
            let eventList:string[] = [];
            for(let key in Event){
                const base = Event[key];
                if (getProbability(base[1]) && Math.floor(Math.random()*2) == 0){
                    eventList.push(base[0])
                }
            }
            if (eventList.length !== 0){
                const event = eventList[Math.floor(Math.random()*eventList.length)]
                console.log("Event----------",event)
                switch (event) {
                    case "word_Eeversal":
                        word_Event()
                    break
                    case "auto_Complete":
                        auto_Event()
                    break
                    case "dark_Screen":
                        dark_Event()
                    break
                    case "pop-up-Window":
                        popUp_Event()
                    break
                    case "error_Screen":
                        error_Event()
                    break
                    case "overwrite":
                        overwrite()
                    break
                }
            }
        //},100)
    }

    setEvent = ()=>{
        endWord_Event()
        endAuto_Event()
        endPopUp_Event()
        endError_Event()
        endOverwrite()

        eventLisn()
    }

    StopEvent = ()=>{
        endDark_Event()
        endError_Event()
        endOverwrite()
    }

    return(
        //eventList
        <>
            <Word_Eeversak />
            <Auto_Complete />
            <Pop_up_Window />
            <Dark_Screen />
            <Error_Screen />
            <Overwrite />
        </>
    )
}

export default EvnetList;
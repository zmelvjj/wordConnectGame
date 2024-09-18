import React, {useRef} from "react";
import { usePlayData } from "../PlayData";

export let word_Event:Function
export let endWord_Event:Function

const Word_Eeversal:React.FC = ()=>{
    const {starterWord, PreviousText, displayText, sideText} = usePlayData();
    const EvnetState = useRef<boolean>(false)

    word_Event = ()=>{
        console.log("start")
        EvnetState.current = true
        const text = PreviousText.current.textContent.split('');
        PreviousText.current.textContent = text.reverse().join('');
        PreviousText.current.style.color = "red";
        starterWord.current = text[text.length - 1];
        displayText.current.textContent = text[text.length - 1];
        sideText.current.textContent = text[text.length - 1];
    }

    endWord_Event = ()=>{
        if(EvnetState.current){
            console.log("end")
            PreviousText.current.style.color = "black";
            EvnetState.current = false
        }
    }

    return null;
}

export default Word_Eeversal;
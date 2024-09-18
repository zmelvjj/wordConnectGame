import React from "react";
import { usePlayData } from "../PlayData";

export let auto_Event:Function
export let endAuto_Event:Function

const Auto_Complete:React.FC = ()=>{
    const { PreviousText, displayText, starterWord, wordList, isGame, InputState, hiddenInput, sideText } = usePlayData();

    auto_Event = ()=>{
        console.log("Asfwehewh")
        fetch("http://localhost:1234/"+"autoWord",{
            method:"POST",
            headers: {  
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ word: starterWord.current })
        }).then((response) => response.json()).then((data) => {
            if(data !== ""){
                let resultWord:string[] = []
                for(let DataNumber in data.result){
                    if(!(data.result[DataNumber].word in wordList.current)) {
                        resultWord.push(data.result[DataNumber].word)
                    }
                }
                let newWord:string = resultWord[Math.floor(Math.random()*resultWord.length)]
                newWord = newWord.includes("-") ? newWord.split("-").join("") : newWord

                //-----playAnimation
                const splitWord = newWord.split("")
                isGame.current = false
                InputState.current = false
                displayText.current.style.color = "blue"
                document.body.style.backgroundColor = "rgb(255,99,99)"
                displayText.current.textContent = starterWord.current

                const endSetting = ()=>{
                    // -------endSetting
                    PreviousText.current.textContent = newWord
                    starterWord.current = newWord[newWord.length - 1]
                    displayText.current.textContent = newWord[newWord.length - 1]
                    PreviousText.current.style.color = "blue"
                    wordList.current.push = newWord
                    displayText.current.style.color = "black"
                    document.body.style.backgroundColor = "rgb(211,211,211)"
                    isGame.current = true
                    InputState.current = true
                    sideText.current.textContent = newWord[newWord.length - 1]
                    hiddenInput.current.value = ''
                    setTimeCount=0
                }
                
                let setTimeCount=0
                const root = ()=>{
                    setTimeCount++
                    displayText.current.textContent += splitWord[setTimeCount]

                    if (setTimeCount < splitWord.length-1){
                        setTimeout(root,500)
                    } else{
                        setTimeout(endSetting,500) 
                    }
                }
                setTimeout(root,500)
            }
        }).catch(()=>{})
    }

    endAuto_Event = ()=>{
        PreviousText.current.style.color = "black"
    }

    return null
}

export default Auto_Complete;
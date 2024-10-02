import React,{ useRef, useState, useEffect } from "react";
import "./HP.css"
import { ResetMainUI } from "./MainInputUI";
import { usePlayData } from "./PlayData";
import { StopEvent } from "./EvnetList";

export let HP:Function;

const HPbar:React.FC = ()=>{
    const bar = useRef<HTMLDivElement | null>(null)
    const endGameScreen = useRef<HTMLDivElement | null>(null)
    const [wordCount, setCount] = useState<number>(0);
    const {isGame, maxHp, health, InputState, Score, PreviousText, word_Count} = usePlayData()
    word_Count.current = wordCount;
    
    HP = (int:number)=>{
        health.current += maxHp.current*int/100;
        setCount(wordCount + 1)
        if (!isGame.current) {isGame.current = true}
    }
    useEffect(()=>{
        
        setInterval(()=>{
            if (bar.current && isGame.current){
                const currentWidth = parseFloat(getComputedStyle(bar.current).width);
                if (maxHp.current === -1) {
                    maxHp.current = currentWidth;
                    health.current = currentWidth;
                }
                if (health.current <= 0 && endGameScreen.current) {
                    console.log(`GameOver\n\n점수: ${Score.current}\n단어: ${wordCount}`)
                    
                    document.body.style.backgroundColor = '#383838'
                    bar.current.style.width = `0px`
                    InputState.current = false;

                    endGameScreen.current.style.top = "50vh"
                    PreviousText.current.style.color = "black"

                    isGame.current = false;
                    StopEvent() 
                }

                health.current -= maxHp.current*1/(1000+wordCount*10);
                bar.current.style.width = `${health.current}px`
            }
        }, 100)

        document.body.addEventListener("click",()=>{
            if (!isGame.current && bar.current && bar.current.style.width === `0px` && endGameScreen.current && !InputState.current) {
                ResetMainUI()
                document.body.style.backgroundColor = 'rgb(211, 211, 211)'
                bar.current.style.width = `99%`
                endGameScreen.current.style.top = "140vh"
                setCount(0)
                InputState.current = true;
                health.current = maxHp.current
            }
        })
    },[])


    return (
        <>
            <div className="HpTool">
                <div className="Hpbar" ref={bar}></div>
            </div>
            <div className='endGameScreen' ref={endGameScreen}>
                <h1 style={{fontSize:"7.2vh"}}><u>Game Over</u></h1>
                <div style={{position:"absolute", top:'60%', fontSize:"4vh", transform:"translate(0,-50%)"}}>
                    <h2>점수: {Score.current}</h2> 
                    <h2>단어: {wordCount}</h2> 
                </div>
            </div>
        </>
    )
}

export default HPbar
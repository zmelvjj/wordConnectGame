import React,{useRef, useEffect, useState} from 'react'; 
import { HP } from './HPSystem';
import "./MainInputUI.css"
import { usePlayData } from './PlayData';
import { setEvent } from './EvnetList';

export let UserName:string;

export let ResetMainUI:Function;

const MainInputUI:React.FC = ()=>{
  const { displayText, PreviousText, sideText, wordList, starterWord, InputState, Score, hiddenInput } = usePlayData();
  const [score,setScore] = useState<number>(0)
  
  Score.current = score;
  fetch("http://localhost:1234/"+"multiPlay",{
    method:"POST",
    headers: {  
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ word: "awd" })
  }).then((response) => response.json()).then((data) => {

  })

  ResetMainUI = ()=>{
    wordList.current = [""];
    starterWord.current = "";
    //wordCount.current = 0;

    if (displayText.current && hiddenInput.current && sideText.current && PreviousText.current){
      hiddenInput.current.value = "";
      displayText.current.textContent = "";
      sideText.current.textContent = "";
      PreviousText.current.textContent = "";
      setScore(0)
    }
  } 

  useEffect(()=>{
    window.onload = () => {
      hiddenInput.current?.focus();
    };

    document.addEventListener('click', () => {
      hiddenInput.current?.focus();
    });
  },[])

  const input = () => {
    if (displayText.current && hiddenInput.current && sideText.current && InputState.current) {
      displayText.current.textContent = starterWord.current+hiddenInput.current.value;
      sideText.current.textContent = starterWord.current+hiddenInput.current.value;
    }
  };

  const KeyDown = (key:any)=>{
    if (key.code === "Enter" && displayText.current && hiddenInput.current && sideText.current && PreviousText.current && InputState.current){
      const text = displayText.current.textContent;
      if (text && text.length > 1) {
        //wordCount.current += 1;
        starterWord.current = text.slice(-1)
        hiddenInput.current.value = ""
        displayText.current.textContent = starterWord.current
        sideText.current.textContent = starterWord.current;

        // console.log(text.slice(-1)+text.slice(-1), text)
        if (text.slice(-1)+text.slice(-1) != text){
          console.log(text)
          PreviousText.current.textContent = text;
          if (!wordList.current.includes(text)) {
            fetch("http://localhost:1234/"+"api",{
              method:"POST",
              headers: {  
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ word: text })
            }).then((response) => response.json()).then((data) => {
              if (data.result){
                setScore(score+Math.round(text.length*250/data.total))
                HP(text.length+Math.floor(10/(data.total > 10 ? 10 : data.total)))
                wordList.current.push(text)
              }else{
                setScore(score-text.length*50)
                HP(-text.length-5)
              }
            }).catch(()=>{})
          }else{
            setScore(score-text.length*50)
            HP(-text.length-5)
          }
          setEvent()
        }
      } else if (text) {
        setScore(score-text.length*50)
        HP(-text.length-5)
      }
    }
  }
  
  return (
    <>
      {/* <div className='upBackgorundColor'></div> */}
      <div className='textBox' ref={displayText}></div>
      <div className='PreviousWord' ref={PreviousText}></div>
      <h5 className='scoreboard'>점수: {score}</h5>
      <div className='sideBox' ref={sideText}></div>
      <input type="text" className="hidden-input" ref={hiddenInput} onInput={input} onKeyDown={KeyDown}/>
      {/* <div className='hitEffect'></div> */}
    </>
  )
} 

export default MainInputUI;
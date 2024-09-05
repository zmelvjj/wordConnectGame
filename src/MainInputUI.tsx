import React,{useRef, useEffect, useState} from 'react'; 
import "./MainInputUI.css"

export let UserName:string;

const MainInputUI:React.FC = ()=>{
  const [score,setScore] = useState<number>(0)
  const hiddenInput = useRef<HTMLInputElement>(null)
  const displayText = useRef<HTMLDivElement | null>(null)
  const PreviousText = useRef<HTMLDivElement | null>(null)
  const sideText = useRef<HTMLDivElement | null>(null)
  let starterWord = useRef("")

  useEffect(()=>{
    window.onload = () => {
      hiddenInput.current?.focus();
    };

    document.addEventListener('click', () => {
      hiddenInput.current?.focus();
    });
  },[])

  const input = () => {
    if (displayText.current && hiddenInput.current && sideText.current) {
      displayText.current.textContent = starterWord.current+hiddenInput.current.value;
      sideText.current.textContent = starterWord.current+hiddenInput.current.value;
    }
  };

  const KeyDown = (key:any)=>{
    if (key.code === "Enter" && displayText.current && hiddenInput.current && sideText.current && PreviousText.current){
      const text = displayText.current.textContent;
      if (text && text.length > 1) {
        starterWord.current = text.slice(-1)
        hiddenInput.current.value = ""
        displayText.current.textContent = starterWord.current
        sideText.current.textContent = starterWord.current;

        // console.log(text.slice(-1)+text.slice(-1), text)
        if (text.slice(-1)+text.slice(-1) != text){
          console.log(text)
          PreviousText.current.textContent = text
          
          fetch("http://localhost:1234/"+"api",{
            method:"POST",
            headers: {  
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ word: text })
          }).then((response) => response.json()).then((data) => {
            if (data.result){
              console.log("단어존재!")
              setScore(score+1)
            }else{
              setScore(score-1)
            }
          }).catch(()=>{})
        }
      } else {
        setScore(score-1)
      }
    }
  }
  
  return (
    <div className='container'> 
      {/* <div className='upBackgorundColor'></div> */}
      <div className='textBox' ref={displayText}></div>
      <div className='PreviousWord' ref={PreviousText}></div>
      <h5 className='scoreboard'>점수: {score}</h5>
      <div className='sideBox' ref={sideText}></div>
      <input type="text" className="hidden-input" ref={hiddenInput} onInput={input} onKeyDown={KeyDown}/>
    </div>
  )
} 

export default MainInputUI;
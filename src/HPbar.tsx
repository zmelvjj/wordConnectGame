import React,{ useRef } from "react";
import "./HPstyle.css"

const HPbar:React.FC = ()=>{
    const bar = useRef<HTMLDivElement | null>(null)

    setInterval(()=>{
        if (bar.current){
            const currentWidth = parseFloat(getComputedStyle(bar.current).width);
            bar.current.style.width = `${currentWidth-77/100}px`
        }
    }, 100)

    


    return (
        <div className="container">
            <div className="HpTool">
                <div className="Hpbar" ref={bar}></div>
            </div>
        </div>
    )
}

export default HPbar
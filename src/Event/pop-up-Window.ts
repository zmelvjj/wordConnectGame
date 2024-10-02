import React from "react";

export let popUp_Event:Function
export let endPopUp_Event:Function

const Pop_up_Window:React.FC = ()=>{

    popUp_Event =()=>{
        alert(">'u'>")
    }

    endPopUp_Event = ()=>{
        
    }
    
    return null
}

export default Pop_up_Window;
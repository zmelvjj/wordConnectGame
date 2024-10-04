import React,{useState,useRef} from "react";

export let overwrite:Function
export let endOverwrite:Function

const count = 3 //반복횟수

const Overwrite:React.FC = ()=>{
    const [component, setComponent] = useState<number[]>([])
    const componentPosList = useRef<Array<number[]>>([])

    overwrite = ()=>{
        let num = 0;

        const root = ()=>{
            addComponent()
            num++

            if (num < count){
                setTimeout(root,500)
            }
        }
        root()
    }

    endOverwrite = ()=>{
        
    }

    const addComponent = ()=>{
        setComponent(prevComponent => [...prevComponent, prevComponent.length]);
    }

    const removeComponent = (index:number)=>{
        setComponent(component.filter((i,_) => i !== index))
        componentPosList.current.filter((i,_) => Number(Object.keys(i)) !== index)
    }

    const randomPosition = (index:number)=>{
        if (!(index in componentPosList.current)){
            const dummyWidth = 40 //vw
            const dummyHeight = 25 //vh

            const top = dummyWidth/2 + Math.floor(Math.random()*(100-dummyWidth))+1
            const left = dummyHeight/2 + Math.floor(Math.random()*(100-dummyHeight))
            console.log(componentPosList.current)
            componentPosList.current[index] = [top,left]
        }
        return {
            top:`${componentPosList.current[index][0]}vh`,
            left:`${componentPosList.current[index][1]}vw`
        }
    }

    return(
        <div style={{position:"absolute", top:0, left:0}}>
            {component.map((components, _) =>(
                <div key={components} onClick={()=>removeComponent(components)} className="dummy" style={randomPosition(components)}>{">'u'>"}
                    <div style={{color:"rgb(200,0,0)", top:"96%", left:"84%", position:"absolute", fontSize:"1.2vh"}}>
                        클릭하여 이미지 종료
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Overwrite;

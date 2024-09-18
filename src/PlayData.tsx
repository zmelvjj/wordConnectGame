import React, {createContext, ReactNode, useContext, useRef} from "react";

const DataContext = createContext<any>(null)

export const DataSet: React.FC<{ children: ReactNode }> = ({ children }:any)=>{
    const displayText = useRef<HTMLDivElement | null>(null)
    const PreviousText = useRef<HTMLDivElement | null>(null)
    const sideText = useRef<HTMLDivElement | null>(null)
    const wordList = useRef<[string]>([""])
    const starterWord = useRef<string>("")
    const InputState = useRef<boolean>(true)
    const hiddenInput = useRef<HTMLInputElement>(null)
    const Score = useRef<number>(0)

    const maxHp = useRef<number>(-1);
    const health = useRef<number>(0);
    const isGame = useRef<boolean>(false)

  
    return (
      <DataContext.Provider value={{ displayText, PreviousText, sideText, wordList, starterWord, maxHp, health, isGame, InputState, Score, hiddenInput }}>
        {children}
      </DataContext.Provider>
    );
}

// Context를 사용하는 커스텀 훅
export const usePlayData = () => {
  return useContext(DataContext);
};
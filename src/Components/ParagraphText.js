
import React, {useState} from 'react';
import { useSpeechSynthesis } from "react-speech-kit";

import 'bootstrap/dist/css/bootstrap.css';

import './ParagraphText.css';









const ParagraphText = (props) => {

   

 const { speak } = useSpeechSynthesis();

let [word, setWord] = useState(""); 


const colors =[ '#E4544D', '#476A2A', '#5384E2', '#396E7A', '#B9782D', '#E33C90']


const [active, setActive] = useState("");

    const handleClick = (selectedWord) => {
        setWord(selectedWord)
        console.log(word)
       props.onClickWordHandler(selectedWord);
        
       setActive("")
        setActive(selectedWord)
        console.log(active)

        //setTimeout(()=>{setActive("")},2000)
    }

    const makeRepeated = (arr, repeats) =>
    [].concat(...Array.from({ length: repeats }, () => arr));
    const arrrep = makeRepeated(colors, props.text.length)
    

    
   
    return (
        <>
        {/* <div> */}
             {
            props.text.map((s,i) => {
                return(
                    <>
                    <span className="dd-a col-6">
                    <span className={`list-item ${active == s && "active"}`} 
                    style={{
                    color:arrrep[i],
                    }}
                    onClick={() => handleClick(s)}>
                    {
                        s.split("").map((w,i)=>{return(
                            
                        <span className={`item ${props.clshighlight == w+s+i && "highlight"}`}>{w} &nbsp; </span>
                        )})}&nbsp;</span>
                    </span>
                   
      
                </>)
            })
        }
       {/*  </div> */}
       

        
        </>
    );
}

export default ParagraphText;

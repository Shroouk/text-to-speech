import React, {useState, useEffect} from 'react';
import './App.css';
import Paragraph from './Components/Paragraph';
import ParagraphText from './Components/ParagraphText';

function App() {

  let [textArr, setTextArr] =  useState([]);


  let [listen, setListen] = useState("letter"); 

  let [txt, setTxt] = useState('');

let [clshighlight, setClshighlight] =useState('')
  

  useEffect(() => {
    const dataFetch = async () => {
      const data = await (
        await fetch(
          './db.json'
        )
      ).json();
      setTextArr(data.texts);
      
    };

    dataFetch();
    console.log(textArr)
  }, []);



  async function convertTextToSpeech(text) {
    if (text.length === 0) {
        return null;
        
    }
    play();
    async function play() {
        for (let i = 0; i < text.length; i++) {
                        let convertedText = text[i];
                        setClshighlight(text[i]+text+i);
            await getNextAudio(convertedText);
            setClshighlight("")
        }
        async function getNextAudio(sentence) {
            let audio;
            audio = new SpeechSynthesisUtterance(sentence);
            audio.voice =  window.speechSynthesis.getVoices()[6]
                window.speechSynthesis.speak(audio);
            return new Promise((resolve) => {
                audio.onend = resolve;
            });
            
        }
    }
}
  

  const clickLetter = ()=>{
   // window.speechSynthesis.cancel();
    setListen("letter");
    convertTextToSpeech(txt)
}

const clickWord = ()=>{
  window.speechSynthesis.cancel();
    setListen("word")
    convertTextToSpeech([txt, ''])
}

const clickWordHandler = (txt)=>{
  setTxt(txt);
  //setClasName("hoverd");
  
  window.speechSynthesis.cancel();
  convertTextToSpeech([txt,""])
}

  return (
    <div className="App mt-5">
    <div className='row main-row mx-0'>
      <div className='col-md-6 text-center'>
        <div className='text-light heading-font'>
          <h3>vocabulary  </h3>
            <h2>Unit 1</h2>
        </div>
      </div>
      <div className='col-md-6 text-wrapper text-center'>
          <div className='card-wrapper'>
      <img className='img-book' src='/assets/img.png'/>
      <div>
      
      <button className='letter-btn' onClick={clickLetter}>spelling</button>
      <button className='wordr-btn' onClick={clickWord}><img className='ear-img' src='/assets/ear.png'/></button>

    </div>
    <div className='container mt-5 txt-container' >
   {/*  <Paragraph textData={textArr}  listen={listen} clsName={clasName} onClickWordHandler={clickWordHandler}/> */}
   {
    textArr.map(elm => {
      return(
        <ParagraphText text={elm.text} onClickWordHandler={clickWordHandler} clshighlight={clshighlight}/>
      )
     
      
    })
   }
    
    </div>
          </div>
      </div>
    </div>
   
    
    </div>
  );
}

export default App;

import React from 'react'
import ParagraphText from './ParagraphText';
import './Paragraph.css'

const Paragraph = (props) => {


    return (
        <div className='row p-3'>
    
            {
                props.textData.map((elm)=>{
                    return (
                        <>
                        {/* <div className='col p-0' key={elm.id} > */}
                        <ParagraphText text={elm.text} onClickWordHandler={props.onClickWordHandler} clsName={props.clsName}/>
                       {/*  </div> */}

                        
                        </>
                        )
                })
            }
        </div>
    );
}

export default Paragraph;

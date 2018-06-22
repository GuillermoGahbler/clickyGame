import React from "react";

const Image = props => {

  
  return (
    <div className='col-3 float image bg-primary p1'>
    <img  
    src = {props.src} 
    alt = ""
    onClick = {() => props.handleClick(props)}
    />
   </div>
  )
}



export default Image;
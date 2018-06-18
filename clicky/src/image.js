import React from "react";

class Image extends React.Component {

   handleClick = ()=>{
      
    const flag = this.props.isClicked;
    if(!flag){
      this.props.updateScore();
      this.props.updateTopScore();
      this.props.addClick(this.props);
    }
      else {
        this.props.resetScore();
      }  
     }
  
      
  render(){
  return (
    <div className='col-3 float image bg-primary p1'>
    <img  src = {this.props.src} alt = ""
     onClick = {this.handleClick}
    />
   </div>
  )
}
}
export default Image;
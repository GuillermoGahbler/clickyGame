import React, { Component } from 'react';
import images from './image.json';
import Image from './image.js';
import './App.css';

class App extends Component {

  state ={
    score:0,
    topScore: 0,
    images: images
   }

   updateScore = ()=>{
    this.setState(prevState =>{
      return { ...prevState, score: prevState.score +1}
    })
   }

   updateTopScore = ()=>{
      this.setState(prevState =>{
      if (prevState.topScore < prevState.score){
      return { ...prevState, topScore: prevState.topScore +1}
      }
    })
   }

   resetScore = ()=>{
    this.setState(prevState =>{
      const images = prevState.images.map(image=>{
        image.isClicked = false;
        return image
      })
      return { ...prevState, score:0, images:images}
    })
   }

   
   addClick = (element)=>{
     console.log(element)
    this.setState( prevState =>{
     prevState.images.map(image=>{
       if (image.src === element.src) image.isClicked = true;
       return image;
     })
    })

  }


  render() {
    return (
      <div>
          <header>
            <div className='clicky'> Clicky Game </div>
            <div className='scores'> Score: {this.state.score} | Top Score:{this.state.topScore} </div>
          </header>
          <div className='directions'>
                The clicky game click images only once if you click more than once you lose.
          </div>
          <main>
            <div className='clear col-8 cc'>
              {
                images.map((image)=>{
                  return (
                  <Image 
                    key={image.id} 
                    src={image.src}
                    updateScore={this.updateScore}
                    updateTopScore={this.updateTopScore}
                    resetScore={this.resetScore}
                    isClicked={image.isClicked}
                    addClick={this.addClick}
                  />);
                })
              }
            </div>
          </main>
        <footer>
          footer section.
        </footer>  
      </div>
    );
  }
}

export default App;

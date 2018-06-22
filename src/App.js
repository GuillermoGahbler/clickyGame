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

   componentWillMount(){
     this.updateImages(this.shuffle);
   }

   updateImages =(cb,element) => {
     return new Promise(resolve =>{
       resolve (this.setState((prevState)=>{
         return {...prevState, images:cb(element)}
       }))
     })
    }

    handleSuccessfulClick = (element) => {
      this.updateImages(this.addClick,element)
      .then(()=>this.updateImages(this.shuffle))
      .then(()=>this.updateScore())
      .then(()=>this.updateTopScore())
    }


   handleUnsuccessfulClick = () => {
     this.updateImages(this.shuffle)
     .then(()=>this.resetScore())
   }


   handleClick = (element) =>{
       if (!element.isClicked) this.handleSuccessfulClick(element)
       else this.handleUnsuccessfulClick()
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

   
   addClick =(element)=>{
      return this.state.images.map(image=>{
        const {handleClick,...newImage} = element
        return element.src === image.src ? {...newImage, isClicked:true} : image
      })
  }

shuffle = () =>{
  const images = [...this.state.images]
  return this.state.images.map(()=>{
    const position = Math.floor(Math.random()* images.length)
    const randomImage = images[position];
    images.splice(position,1);
    return randomImage;
  })
}


  render() {
    return (
      <div>
          <header>
            <div className='clicky'> <h1>Clicky Game</h1> </div>
            <div className='scores'> <h2> Score: {this.state.score} | Top Score:{this.state.topScore} </h2></div>
          </header>
          <div className='directions'>
               <h3>The clicky game click images only once if you click more than once you lose.</h3>
          </div>
          <main>
            <div className='clear col-8 cc'>
              {
                this.state.images.map((image)=>{
                  return (
                  <Image 
                    key={image.id} 
                    src={image.src}
                    handleClick={this.handleClick} 
                    isClicked={image.isClicked}
                    id={image.id}

                     
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

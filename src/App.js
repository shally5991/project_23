import React ,{Component} from 'react';
import Navigation from './components/Navigation/Navigation.js';
import Logo from './components/Logo/Logo.js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition.js';
import ImagelinkForm from './components/ImagelinkForm/ImagelinkForm.js';
import Register from './components/Register/Register.js';
import Signin from './components/Signin/Signin.js';
import Rank from './components/Rank/Rank.js';
import Particles from 'react-particles-js';

import './App.css';

 

const particlesOptions = {
   particles:{
          number: {
            value: 400,
            density:{
              enable: true,
              value_area: 800
            }
          }

         
             }
      }
const initialState = {
    
      input:'',
      imageLink:'',
      box: {},
      route:'signin',
      issignedout : false,
      user: {

        id: '',

        name: '',

        email: '',

        entires: 0,

        joined: '' 
      
    }
}

class App extends Component {
constructor()
{
  super();
  
  this.state = initialState;
}

loadUser = (data) => {

  this.setState({ user: {

    id: data.id,

    name: data.name,

    email: data.email,

    entries: data.entries,

    joined: data.joined
  }

  })
}




calculateFaceLocation = (data) => {
  const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
  const image = document.getElementById('inputimage');
  const width = Number(image.width);
  const height = Number(image.height);
  //console.log(width,height);
   
    return{
      leftcol   :  clarifaiFace.left_col*width,
      topRow    :  clarifaiFace.top_row*height,
      rightCol  :  width-(clarifaiFace.right_col*width),
      bottomRow :  height-(clarifaiFace.bottom_row*height)
    }
}
displayFaceBox = (box) => {
        //console.log(box);
    
        this.setState({box:box});
    }

onRoutechange = (route) =>
{
  
  if(route === 'signout'){

      this.setState(initialState);
   }
  else if(route === 'home')
  {

      this.setState({issignedout:true});
  }

    this.setState({route:route});
}

  onInputChange= (event) =>
  {
      this.setState({input: event.target.value});

  }
onButtonsubmit = () =>
{
   this.setState({imageLink: this.state.input});

   fetch('https://damp-basin-46725.herokuapp.com/imageurl' , {

        method: 'post',

        headers: {'Content-Type' : 'application/json'},

        body: JSON.stringify({

          input: this.state.input
        })

      })
      .then(response => response.json())
      
  .then (response => {

    if (response) {

      fetch('https://damp-basin-46725.herokuapp.com/images' , {

        method: 'put',

        headers: {'Content-Type' : 'application/json'},

        body: JSON.stringify({

          id: this.state.user.id
        })

      })
      .then(response => response.json())
      .then(count => {

        this.setState(Object.assign(this.state.user , {entries: count} ))

      })

    }

    this.displayFaceBox(this.calculateFaceLocation(response))
 })
  .catch(err => console.log(err));
}




 render(){  
    return (
        <div className="App">
          <Particles className='particles' params={particlesOptions} />

           <Navigation issignedout={this.state.issignedout} onRoutechange={this.onRoutechange}/>
          
          { this.state.route==='home'?  
            <div>
              <Logo />
              
              <Rank 
              name={this.state.user.name} 
              entries={this.state.user.entries}
              />
              
              <ImagelinkForm 
               onInputChange= {this.onInputChange}
               onButtonsubmit = {this.onButtonsubmit}
              />
              
              <FaceRecognition
                box = {this.state.box}
                imageLink = { this.state.imageLink}
              />

            </div> :  (this.state.route==='signin'?
                 <Signin loadUser={this.loadUser} onRoutechange={this.onRoutechange}/>:
                 <Register loadUser = {this.loadUser} onRoutechange={this.onRoutechange}/>
            )

          }
        </div>
      );
    }
  }

export default App;


import React from 'react';
import logo from './logo.svg';
import './globalscss.scss';
import './App.css';
import User_list from './user_list';
import User_details from './user_details';
import Navbar from './navbar';


class App extends React.Component{

  constructor()
  {
    super()
    this.state ={
      id : null,
      flag : false
    }
  }

  handlercalling=(e)=>{
    console.log("function call of app.js")
    this.setState({
      flag : true
    })
  }

  callbackfunction=(data)=>{
    if(data === "1")
    {
      return this.setState({
        id : null 
      })
    }
    this.setState({
      id : data
    })
  }


  render(){
    return(
      <div>
        <Navbar handlercalling={this.handlercalling}/>
        <div className="container1">
          <User_list callbackfunction={this.callbackfunction}/>
          <User_details id ={this.state.id} handlercalling={this.handlercalling}  />
        </div>
      </div>
    )
  }




}

export default App;

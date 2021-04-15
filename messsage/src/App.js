import React from 'react';
import './App.css';
import DisplayArea from './components/DisplayArea/DisplayArea'
import MakeRoom from './components/make room/MakeRoom'
import io from "socket.io-client";

const socket = io.connect('/');

class App extends React.Component {
  constructor(){
    
    super();
    this.state = {
      name:'',
      messageList:[],
      message:'',
      route:0,
      room:''
    }
  }

  componentDidMount(){
    socket.on('chatMessage', data =>{
      console.log(data);
      this.setState({messageList : this.state.messageList.concat(data)})
      console.log(this.state.messageList);
    })

  }


  onNameChange = (event) =>{
    console.log(this.state.input);
    this.setState({name:event.target.value});
    
  }


  onMessageChange = (event) =>{
    this.setState({message:event.target.value});
    console.log(this.state.message)
  }

  onSend = () =>{
    if(this.state.message){
      socket.emit('chatMessage',{"name":this.state.name,"messageSent":this.state.message})
    }
  }

  onRoomChange = (event) =>{
    this.setState({room:event.target.value})
  }

  onEnter = () =>{

    const postBody = {
      room:this.state.room
    }

    const requestMetadata = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
          },
          body: JSON.stringify(postBody)
      };

    fetch('/join', requestMetadata)
      .then(resp => resp.json())
      .then(status =>{
        console.log(status);
        if(status.val ==="YES"){
          socket.emit('room',{room:this.state.room,name:this.state.name});
          this.setState({route:"chat"})
        }
        else{
          console.log("failed to enter room")
        }
      });

  }

  onCreate = () =>{

    const postBody = {
      room:this.state.room
    }

    const requestMetadata = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
          },
          body: JSON.stringify(postBody)
    };

    fetch('/create',requestMetadata)
    .then(resp =>resp.json())
    .then(status =>{
      console.log(status);
      if(status.val === "YES"){
        socket.emit('room',{room:this.state.room,name:this.state.name})
        this.setState({route:"chat"})
      }
      else{
        console.log("room already exists");
      }
    });


  }

  

  render(){
    if(this.state.route==="chat"){
      return(
        <div className="App">

          <DisplayArea  onMessageChange={this.onMessageChange}  messageList={this.state.messageList} onSend={this.onSend}/>

        </div>
      )
    }
    else{
      return(
        <div className = "App">
        <MakeRoom onRoomChange={this.onRoomChange} onEnter={this.onEnter} onCreate={this.onCreate} onNameChange = {this.onNameChange}/>
      </div>
      )
    }
  }
}

export default App;

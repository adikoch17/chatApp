import React from 'react'
import './DisplayArea.css'
import Msg from '../msg/Msg'

const DisplayArea = ({onMessageChange,messageList,onSend}) =>{
    return(
            <div className="disp glass2" >
                    <div className="msgArea">
                        {
                            messageList.map((val,i)=>{
                                return(
                                    <Msg name={val.name} messageSent={val.messageSent} k={i}/>
                                )
                            })
                            
                        }
                        
                    </div>
                    <hr/>
                    <div className="form">
                        <input id="inp" placeholder="Enter your message here" onChange ={onMessageChange}>
                        </input>
                        <button onClick={onSend} id ="send">send</button>
                    </div>
            </div>
    );
}

export default DisplayArea;
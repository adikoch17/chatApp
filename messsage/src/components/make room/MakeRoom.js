import React from 'react'
import'./MakeRoom.css'


const MakeRoom = ({onRoomChange,onEnter,onCreate,onNameChange}) =>{
    return(
        <div className="glass">
            <input className="input" placeholder="Enter name" onChange={onNameChange}></input><br></br>
            <input className="input" placeholder="Enter room code" onChange={onRoomChange}></input><br></br>
            <button className="button" onClick={onEnter} >JOIN</button>
            <button className="button" onClick={onCreate} >CREATE</button>
        </div>
    );
}

export default MakeRoom;
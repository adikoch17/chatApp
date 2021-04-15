import React from "react"
import './Msg.css'

const Msg = ({name,messageSent,k}) =>{
    return(
        <div className="msgdisp">
            <b>{name}: </b>
            {messageSent}
        </div>
    );
}

export default Msg;
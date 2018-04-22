import React from "react";
import Moment from "react-moment";
import {Link} from "react-router-dom"
import DefaultImage from "../images/default-profile-image.jpg";

import "./MessageItem.css";

const MessageItem = props => {
    return (
        <li className="message">
            <img src={props.imageUrl || DefaultImage} alt={props.username} />
            <div className="messageContent">
                <Link to="/"> @{props.username}&nbsp;</Link>
                <span>
                    <Moment className="messageDate" format="Do MMM YYYY">
                        {props.date}
                    </Moment>
                </span>
                <p className="messageText">
                    {props.text}
                </p>
                {props.isCorrectUser &&
                    <a type="button" onClick={props.removeMessage} >Delete Message</a>
                }
            </div>
        </li>
    )
}

export default MessageItem;
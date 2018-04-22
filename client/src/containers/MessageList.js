import React, {Component} from "react";
import {connect} from "react-redux";
import {fetchMessages, removeMessage} from "../store/actions/messages";
import MessageItem from "../components/MessageItem";
import "./MessageList.css"
import currentUser from "../store/reducers/currentUser";

class MessageList extends(Component) {
    constructor(props) {
        super(props);
        this.props.fetchMessages();
    }
    render() {
        let messageList = this.props.messages.map(message => {
            console.log(message.user._id);
            return <MessageItem 
                key={message._id}
                text={message.text}
                date={message.createdAt}
                username={message.user.username}
                imageUrl={message.user.profileImageUrl}
                removeMessage={this.props.removeMessage.bind(this, this.props.currentUser.user.id, message._id)}
                isCorrectUser={this.props.currentUser.user.id === message.user._id}
            />
        });
        return (
            <div className="messageList">
                <ul>
                    {messageList}
                </ul>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        messages : state.messages,
        currentUser : state.currentUser
    }
}

export default connect(mapStateToProps, {fetchMessages, removeMessage})(MessageList);
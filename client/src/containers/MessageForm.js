import React, {Component} from "react";
import {connect} from "react-redux";
import {postNewMessage} from "../store/actions/messages";
import "./MessageForm.css";

class MessageForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message : ""
        }
    }

    handleChange(e) {
        this.setState({message : e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.postNewMessage(this.state.message);
        this.setState({message : ""});
        this.props.history.push("/");
    }

    render() {
        return (
            <div className="messageForm">
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <h2>Add a Message</h2>
                    {this.props.errors.message && 
                        <div className="errorBox">
                            {this.props.errors.message}
                        </div>
                    }
                    <div className="formSection">
                        <label>Message Text:</label>
                        <textarea type="text" value={this.state.message} onChange={this.handleChange.bind(this)} required></textarea>
                    </div>
                    <button type="submit">Save Message</button>
                </form>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        errors : state.errors
    }
}

export default connect(mapStateToProps, {postNewMessage})(MessageForm);
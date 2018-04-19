import React, {Component} from "react";
import {Link} from "react-router-dom";

import "./AuthForm.css";

class AuthForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            email : "",
            username : "",
            profileImageUrl : "",
            password : "",
            confirmPassword : ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({[e.target.name] : e.target.value});
    }
    
    handleSubmit(e) {
        e.preventDefault();
        if (this.props.signup) {
            if (this.state.password.length < 6) {
                console.log("password must be longer than 6");
            } else if (this.state.password !== this.state.confirmPassword) {
                console.log("passwords must match");
            } else {
                this.props.onAuth("signup", this.state).then(() => {
                    console.log("signed up");
                });
            }
        } else {
            this.props.onAuth("signin", this.state).then(() => {
                console.log("signed up");
            });
        }
    }

    render() {
        return (
            <main className="authForm">
                <form onSubmit={this.handleSubmit}>
                    <h2>
                        {(this.props.signup) ? "Sign up now!" : "Sign in"}
                    </h2>

                    <input type="text" placeholder="Enter your Email Address" name="email" value={this.state["email"]} 
                        onChange={this.handleChange} required/>

                    {this.props.signup && (
                    <input type="text" placeholder="Enter your Username" name="username" value={this.state["username"]} 
                        onChange={this.handleChange} required/>
                    )}

                    {this.props.signup && (
                    <input type="text" placeholder="Enter a profile image url" name="profileImageUrl" value={this.state["profileImageUrl"]} 
                        onChange={this.handleChange} />
                    )}

                    <input type="password" placeholder="Enter your Password" name="password" value={this.state["password"]} 
                        onChange={this.handleChange} required/>

                    {this.props.signup && (
                    <input type="password" placeholder="Confirm your Password" name="confirmPassword" value={this.state["confirmPassword"]} 
                        onChange={this.handleChange} required/>
                    )}
                    
                    <button type="submit">
                        {(this.props.signup) ? "Sign Up" : "Sign In"}
                    </button>

                </form>
            </main>
        )
    }
}

export default AuthForm;
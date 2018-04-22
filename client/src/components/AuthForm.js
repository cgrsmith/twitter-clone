import React, {Component} from "react";
import {Link} from "react-router-dom";

import "./AuthForm.css";

const MIN_CHARS = 6;

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
            if (this.state.password.length < MIN_CHARS) {
                this.props.addError("Password must be longer than " + MIN_CHARS +" characters");
            } else if (this.state.password !== this.state.confirmPassword) {
                this.props.addError("Passwords must match");
            } else {
                this.props.onAuth("signup", this.state)
                    .then(() => {
                        this.props.history.push("/");
                    })
                    .catch(err =>{
                        return err;
                    });
            }
        } else {
            this.props.onAuth("signin", this.state)
                .then(() => {
                    this.props.history.push("/");
                })
                .catch(err =>{
                    return err;
                });
        }
    }

    render() {
        this.props.history.listen(() => {
            this.props.removeError();
        });

        return (
            <div>
                <main className="authForm">
                    <form onSubmit={this.handleSubmit}>
                        <h2>
                            {(this.props.signup) ? "Sign up now!" : "Sign in"}
                        </h2>
                        {this.props.errors.message && (
                            <div className="errorBox">
                                {this.props.errors.message}
                            </div>
                        )}

                        <div className="formSection">
                            <label>Email Address:</label>
                            <input type="text" placeholder="" name="email" value={this.state["email"]} 
                                onChange={this.handleChange} required/>
                        </div>

                        {this.props.signup && (
                        <div className="formSection">
                            <label>Username:</label>   
                            <input type="text" placeholder="" name="username" value={this.state["username"]} 
                                onChange={this.handleChange} required/>
                        </div>
                        )}

                        {this.props.signup && (
                        <div className="formSection">
                            <label>Profile Image URL:</label>   
                            <input type="text" placeholder="" name="profileImageUrl" value={this.state["profileImageUrl"]} 
                                onChange={this.handleChange} />
                        </div>
                        )}
                        <div className="formSection">
                            <label>Password:</label>   
                            <input type="password" placeholder="" name="password" value={this.state["password"]} 
                                onChange={this.handleChange} required/>
                        </div>

                        {this.props.signup && (
                        <div className="formSection">
                            <label>Confirm Password:</label>   
                            <input type="password" placeholder="" name="confirmPassword" value={this.state["confirmPassword"]} 
                                onChange={this.handleChange} required/>
                        </div>
                        )}
                        
                        <button type="submit">
                            {(this.props.signup) ? "Sign Up" : "Sign In"}
                        </button>

                    </form>
                </main>
            </div>
        )
    }
}

export default AuthForm;
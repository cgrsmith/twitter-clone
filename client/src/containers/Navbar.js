import React, {Component} from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {logout} from "../store/actions/auth";

import "./Navbar.css";
import Logo from "../images/warbler-logo.png"

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }

    logout(e) {
        e.preventDefault();
        this.props.logout();
    }

    render() {
        return (
            <div className="navWrap"> 
                <nav>
                    <header>
                        <Link to="/" className="navBrand">
                            <img src={Logo} alt="Brand Image" />
                        </Link>
                        <h1>twatter</h1>         
                    </header>
                    {this.props.currentUser.isAuthenticated ? 
                    <ul>
                        <li>
                            <h3>Hi, {this.props.currentUser.user.username}!</h3>
                        </li>
                        <li>
                            <Link to={"/users/" + this.props.currentUser.user.id + "/messages/new"} className="navLink">New Message </Link>
                        </li>
                        <li>
                            <a onClick={this.logout} className="navLink">Log Out</a>
                        </li>
                    </ul>
                    :                         
                    <ul>
                        <li>
                            <Link to="/signup" className="navLink">Sign Up</Link>
                        </li>
                        <li>
                            <Link to="/signin" className="navLink">Sign In</Link>
                        </li>
                    </ul>
                    }

                </nav>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        currentUser : state.currentUser
    }
}

export default connect(mapStateToProps, {logout})(Navbar);
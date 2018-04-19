import React, {Component} from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";

import "./Navbar.css";
import Logo from "../images/warbler-logo.png"

class Navbar extends Component {
    constructor(props) {
        super(props);
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

                    <ul>
                        <li>
                            <Link to="/signup" className="navLink">Sign Up</Link>
                        </li>
                        <li>
                            <Link to="/signin" className="navLink">Sign In</Link>
                        </li>
                    </ul>

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

export default connect(mapStateToProps, null)(Navbar);
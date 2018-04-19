import React from "react";
import {Link} from "react-router-dom";

import "./Homepage.css";

const Homepage = props => {
    return (
        <div className="homepage">
            <main>
                <header>
                    <h1>Welcome to Twatter</h1>
                    <p>Twatter is the internet's most hastily thrown together Twitter clone.</p>
                    <p>Built with React
                        and Redux on the front with a Node and Mongodb backend, Twatter's sole raison d'être 
                        is to demonstrate my ability to construct a Full-Stack web application.
                    </p>
                    <h3>New to Twatter?</h3>
                    <Link to="signup" className="navButton">
                        Sign up here
                    </Link>
                </header>
            </main>
        </div>
    )
}

export default Homepage;
import React from "react";
import {Switch, Route, withRouter, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import Homepage from "../components/Homepage";
import AuthForm from "../components/AuthForm";
import withAuth from "../hocs/withAuth";
import MessageForm from "./MessageForm";

import {authUser} from "../store/actions/auth";
import {removeError, addError} from "../store/actions/errors"

const Main = props => {
    const {authUser, removeError, addError, errors, currentUser} = props;
    return (
        <div>
            <Switch>
                <Route exact path="/" render={props => <Homepage currentUser={currentUser} {...props} />} />
                <Route exact path="/signup" render={props => 
                    <AuthForm onAuth={authUser} signup={true} errors={errors} addError={addError} removeError={removeError} {...props}/>
                }/>
                <Route exact path="/signin" render={props => 
                    <AuthForm onAuth={authUser} signup={false}  errors={errors} removeError={removeError} {...props}/>
                }/>
                <Route exact path="/users/:id/messages/new" component={withAuth(MessageForm)}/>
            </Switch>
        </div>
    );
}

function mapStateToProps(state) {
    return {
        currentUser : state.currentUser,
        errors : state.errors
    };
}

export default withRouter(connect(mapStateToProps, {authUser, removeError, addError})(Main));
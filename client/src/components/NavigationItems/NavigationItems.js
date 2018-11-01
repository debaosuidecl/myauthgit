import React,{Component} from 'react';
import NavigationItem from '../NavigationItem/NavigationItem'
import './NavigationItems.css'
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom'

class NavigationItems extends Component{
    shouldComponentUpdate(nextProp){
        console.log(nextProp);
        return (nextProp.user !== null && nextProp.user.photo !== null) || (nextProp.logout !== null) || (nextProp.history.action === 'PUSH')
    }
    render(){
        let authNav = null;
        if (!this.props.isAuthenticated){
            if(this.props.location.pathname === '/auth'){
                authNav = <NavigationItem type="Nav" link="/auth">Sign Up or Sign In</NavigationItem>
            }
            else if(this.props.location.pathname === '/signin'){
                authNav = <NavigationItem type="Nav" link="/signin">Sign Up or Sign In</NavigationItem>;
            } else{
                authNav =  <NavigationItem type="Nav" link="/auth">Sign Up or Sign In</NavigationItem>;
            }
        }
        return(
            <div className="NavigationItems DesktopOnly">
                <NavigationItem type="Nav" exact link="/">Home</NavigationItem>

                {!this.props.isAuthenticated? authNav: <NavigationItem type="Nav" link="/logout">Log Out</NavigationItem>}
                { this.props.isAuthenticated && this.props.user ? <NavigationItem type="Avatar"  user={this.props.user.email} url={this.props.user.photo}/>:
                null
                }

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.token !== null,
        user: state.user,
        logout: state.logout
    }
}

export default withRouter(connect(mapStateToProps)(NavigationItems))
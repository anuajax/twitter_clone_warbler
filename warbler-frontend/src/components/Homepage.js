import React from "react";
import {Link} from "react-router-dom";
import MessageTimeline from './MessageTimeline';
import Logo from "../images/warbler-logo.png";

const Homepage = ({currentUser}) => {
    if(!currentUser.isAuthenticated){
        return (
            <div className="hero">
                <div className="sidediv">
                    <img className="flip" src={Logo}></img>
                    <h4>Hear what people are talking about.</h4>
                     <h4>Join the conversation</h4>
                </div>
    <div className="home-hero">
        <h1>What's happening?</h1>
       <h3>new to Warbler??</h3>
       <Link to="/signup" className="btn btn-primary">SignUp here</Link>
    </div>
    </div>
        );
    }
    return <div> <MessageTimeline profileImageUrl={currentUser.user.profileImageUrl}
    username={currentUser.user.username}/> </div>
};
export default Homepage;
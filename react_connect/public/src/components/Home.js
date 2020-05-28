import React from 'react';
import '../css/Home.css';

function Home(props){
    return (
        <div className="container home-div">
            <h2 className="home-greeting-msg">
                Hey {props.name}! What's up?
            </h2>
            <h4>Welcome to Connect!</h4>
            <br></br>
            <br></br>
            <h5>Connect is a prototype of a social networking web application.</h5>
            <br></br>
            <br></br>
            <h5>It supports following features: </h5>
            <br></br>
            <p>* Sign Up</p>
            <p>*  Sign In</p>
            <p>* Own profile viewing and editing</p>
            <p>* Adding friends</p>
            <p>* Viewing friends profile</p>
            <p>* Messaging to friends</p>
            
        </div>
    );
}

export default Home;
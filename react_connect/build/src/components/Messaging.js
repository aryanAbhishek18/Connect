import React from 'react';
import '../css/Messaging.css';
import SendMessage from './SendMessage';
import ReceivedMessages from './ReceivedMessages';

let URL;
if (process.env.NODE_ENV === 'development') {
    URL = 'http://localhost:5000';
} else {
    URL = 'https://assist.aryanabhi.in';
}

class Messaging extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            friends: []
        };
    }

    async componentDidMount() {
        try{
            const token = sessionStorage.getItem('assistToken');
            if(!token) {
              return alert('Token Missing! Kindly sign out and sign in again!');
            }
    
            const url = URL + '/api/friends/getFriends';
            const res = await fetch(url, {  
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                token: sessionStorage.getItem('assistToken')
              })
            });
    
            const data = await res.json();
            if(data.status !== 200) {
              return alert(data.message);
            }
            else {
              this.setState({
                friends: data.friends
              });
            }
    
          }catch(e){
            console.log(e);
            return alert('There was some error!! Please sign out and sign in again');
          }  
    }

    render() {

        return (
            <div className="container messaging-div">
                <h3>Hey {this.props.name}! Here you can message your friends :)</h3>
                <div className="container messaging-main-div">
                    <div className="row">
                      <div className="col-md-6"> 
                        <SendMessage friends={this.state.friends} />
                      </div>
                      <div className="col-md-6">
                        <ReceivedMessages />
                      </div>
                    </div>
                </div>
            </div>
        );
    }
}



export default Messaging;
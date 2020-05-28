import React from 'react';
import '../css/ReceivedMessages.css';

let URL;
if (process.env.NODE_ENV === 'development') {
    URL = 'http://localhost:5000';
} else {
    URL = 'https://assist.aryanabhi.in';
}

class ReceivedMessages extends React.Component {
    //props.friends
    constructor(props) {
        super(props);
        this.state = {
            messages: []
        };
    }

    async componentDidMount() {
        try{
            const token = sessionStorage.getItem('assistToken');
            if(!token) {
              return alert('Token Missing! Kindly sign out and sign in again!');
            }
    
            const url = URL + '/api/messaging/getReceivedMessages';
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
                    messages: data.messages
                });
            }
    
          }catch(e){
            console.log(e);
            return alert('There was some error!! Please sign out and sign in again');
          }
    }

    render() {
        
        const messages = this.state.messages.map((message)=>{
            return (
                <div key={message._id} className="indiv-msg">
                    <p><strong>By: </strong>{message.name} <em>[{message.email}]</em></p>
                    <p><strong>Received on:</strong> {message.date}</p>
                    <p>{message.message}</p>
                </div>
            );
        });

        return (
            <div className="messages-list">
                <h5>Received messages: </h5>
                <br></br>
                {messages}
            </div>
        );
    }
}



export default ReceivedMessages;
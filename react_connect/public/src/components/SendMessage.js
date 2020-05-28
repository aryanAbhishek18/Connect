import React from 'react';
import '../css/SendMessage.css';

let URL;
if (process.env.NODE_ENV === 'development') {
    URL = 'http://localhost:5000';
} else {
    URL = 'https://assist.aryanabhi.in';
}

class SendMessage extends React.Component {
    //props.friends
    constructor(props) {
        super(props);
        this.state = {
            friendSelectedOption: 'Select a friend to send message to: ',
            message: ''
        }

        this.friendSelectChangeHandler = this.friendSelectChangeHandler.bind(this);
        this.messageChangeHandler = this.messageChangeHandler.bind(this);
        this.messageClearHandler = this.messageChangeHandler.bind(this);
        this.sendMessageHandler = this.sendMessageHandler.bind(this);
    }

    friendSelectChangeHandler(event) {
        this.setState({
            friendSelectedOption: event.target.value
        });
    }

    messageChangeHandler(event) {
        this.setState({
            message: event.target.value
        });
    }

    messageClearHandler(event) {
        this.setState({
            message: ''
        });
    }

    async sendMessageHandler() {
        try{
            const token = sessionStorage.getItem('assistToken');
            if(!token) {
              return alert('Token Missing! Kindly sign out and sign in again!');
            }

            const email = this.state.friendSelectedOption;
            if(email === 'Select a friend to send message to: ') {
                return alert('Select a valid friend!');
            }

            const message = this.state.message.trim();
            if(!message) {
                return alert('Cant send empty message!');
            }
    
            const url = URL + '/api/messaging/sendMessage';
            const res = await fetch(url, {  
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                email: email,
                message: message,
                token: sessionStorage.getItem('assistToken')
              })
            });
    
            const data = await res.json();
            if(data.status !== 200) {
              return alert(data.message);
            }
            else {
                alert(data.message);
                this.setState({
                friendSelectedOption: 'Select a friend to send message to: ',
                message: ''
                });
            }
    
          }catch(e){
            console.log(e);
            return alert('There was some error!! Please sign out and sign in again');
          }
    }

    render() {
        let options = [<option key={0}>Select a friend to send message to: </option>];
        this.props.friends.forEach((friend)=>{
            options.push(
                <option key={friend._id} value={friend.email}>{friend.name}</option>
            );
        });

        return (
            <div className="friends-select-div">
                <select value={this.state.friendSelectedOption} onChange={this.friendSelectChangeHandler}>
                    {options}
                </select>
                <textarea value={this.state.message} onChange={this.messageChangeHandler}></textarea>
                <div className="send-message-buttons">
                    <span><button className="btn btn-warning" onClick={this.messageClearHandler}>Clear</button></span>
                    <span><button className="btn btn-success" onClick={this.sendMessageHandler}>Send</button></span>
                </div>
            </div>
        );
    }
}



export default SendMessage;
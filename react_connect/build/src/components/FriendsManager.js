import React from 'react';
import AddFriends from './AddFriends';
import FriendsList from './FriendsList';
import '../css/FriendsManager.css';

let URL;
if (process.env.NODE_ENV === 'development') {
    URL = 'http://localhost:5000';
} else {
    URL = 'https://assist.aryanabhi.in';
}

class FriendsManager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            friends: [],
            friendSelectedOption: 'Select a friend to see the details: ',
            selectedFriendName: '',
            selectedFriendEmail: '',
            selectedFriendDOB: '',
            selectedFriendAddress: '',
            selectedFriendPhone: '',
            selectedFriendHobby: ''
        };

        this.friendSelectChangeHandler = this.friendSelectChangeHandler.bind(this);
        this.friendSelectDetailHandler = this.friendSelectDetailHandler.bind(this);
        this.friendSelectDetailClear = this.friendSelectDetailClear.bind(this);
    }

    async friendSelectDetailHandler() {
        try{
            const token = sessionStorage.getItem('assistToken');
            if(!token) {
              return alert('Token Missing! Kindly sign out and sign in again!');
            }

            const email = this.state.friendSelectedOption;
            if(email === 'Select a friend to see the details: ') {
                return alert('Select valid option!')
            }
    
            const url = URL + '/api/friends/getFriendDetails';
            const res = await fetch(url, {  
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                email: email,
                token: sessionStorage.getItem('assistToken')
              })
            });
    
            const data = await res.json();
            if(data.status !== 200) {
              return alert(data.message);
            }
            else {
                const friend = data.friend;
                this.setState({
                    selectedFriendName: data.friend.name,
                    selectedFriendEmail: data.friend.email,
                    selectedFriendDOB: data.friend.dob,
                    selectedFriendAddress: data.friend.address,
                    selectedFriendPhone: data.friend.phone,
                    selectedFriendHobby: data.friend.hobby
                });
            }
    
          }catch(e){
              console.log(e);
            return alert('There was some error!! Please sign out and sign in again');
          }
    }

    friendSelectChangeHandler(event) {
        this.setState({
            friendSelectedOption: event.target.value
        });
    } 


    friendSelectDetailClear() {
        this.setState({
            selectedFriendName: '',
            selectedFriendEmail: '',
            selectedFriendDOB: '',
            selectedFriendAddress: '',
            selectedFriendPhone: '',
            selectedFriendHobby: ''
        })
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

        let options = [<option key={0}>Select a friend to see the details: </option>];
        this.state.friends.forEach((friend, key)=>{
            options.push(
            <option key={friend._id} value={friend.email}>{friend.name}</option>
            );
        });

        return(
            <div className="friends-manager-div">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <AddFriends email={this.props.email}/>
                        </div>
                        <div className="col-md-6">
                            <div className="friend-list-title">
                                Here is your friends list:
                            </div>
                            <FriendsList friends={this.state.friends}/>
                        </div>
                    </div>
                    <br></br>
                    <hr></hr>
                    <br></br>
                    <div>
                        <div className="select-friends-div">
                            <select value={this.state.friendSelected} onChange={this.friendSelectChangeHandler}>
                                {options}
                            </select>
                            <span><button className="btn btn-success" onClick={this.friendSelectDetailHandler}>Search</button></span>
                            <span><button className="btn btn-warning" onClick={this.friendSelectDetailClear}>Clear</button></span>
                        </div>
                    </div>
                    <div className="selected-friends-details">
                        <div>
                            <strong>Name: </strong>{this.state.selectedFriendName}
                        </div>
                        <div>
                            <strong>Email: </strong>{this.state.selectedFriendEmail}
                        </div>
                        <div>
                            <strong>Date Of Birth: </strong>{this.state.selectedFriendDOB}
                        </div>
                        <div>
                            <strong>Address: </strong>{this.state.selectedFriendAddress}
                        </div>
                        <div>
                            <strong>Phone: </strong>{this.state.selectedFriendPhone}
                        </div>
                        <div>
                            <strong>Hobby: </strong>{this.state.selectedFriendHobby}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default FriendsManager;
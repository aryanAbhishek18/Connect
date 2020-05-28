import React from 'react';
import '../css/AddFriends.css';

let URL;
if (process.env.NODE_ENV === 'development') {
    URL = 'http://localhost:5000';
} else {
    URL = 'https://assist.aryanabhi.in';
}

class AddFriends extends React.Component {
    //this.props.email
    constructor(props) {
        super(props);
        this.state = {
            nameInput: '',
            usersMatched: []
        };

        this.nameInputChangeHandler = this.nameInputChangeHandler.bind(this);
        this.searchFriendHandler = this.searchFriendHandler.bind(this);
        this.addFriendHandler = this.addFriendHandler.bind(this);
    }

    async addFriendHandler(name, email) {
        try {
            const url = URL + '/api/friends/addFriend';
            const res = await fetch(url, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    name: name,
                    email: email,
                    token: sessionStorage.getItem('assistToken') 
                }),
            });
            const data = await res.json();
            if (data.status !== 200) {
                return alert(data.message);
            }
            
            alert(data.message);
            this.setState({
                nameInput: '',
                usersMatched: []
            });


        } catch (e) {
            alert(e.message);
        }
    }

    nameInputChangeHandler(event) {
        this.setState({
            nameInput: event.target.value
        });
    }

    async searchFriendHandler() {
        const name = this.state.nameInput.trim().toLowerCase();
        if(!name) {
            alert('Name empty!');
        }
        try {
            const url = URL + '/api/friends/searchFriends';
            const res = await fetch(url, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    name: name,
                    token: sessionStorage.getItem('assistToken') 
                }),
            });
            const data = await res.json();
            if (data.status !== 200) {
                return alert(data.message);
            }
            
            const usersMatched = data.usersMatched;

            this.setState({
                usersMatched: usersMatched
            });


        } catch (e) {
            alert(e.message);
        }
    }

    render() {
        const friends = this.state.usersMatched.map((friend)=>{
            if(friend.email !== this.props.email) return (
                <div key={friend._id} className="user-matched-div">
                    <p><strong>Name: </strong>{friend.name}</p>
                    <p><strong>Email: </strong>{friend.email}</p>
                    <button className="btn btn-success" onClick={()=>this.addFriendHandler(friend.name, friend.email)}>Add Friend</button>
                    <hr></hr>
                </div>
            )
        });
        return (
            <div className="add-friends-div">
                <div className="add-friends-search">
                    <div className="form-group">
                        <label className="col-form-label">Search to add new friend:</label>
                        <input type="text" className="form-control" value={this.state.nameInput} onChange={this.nameInputChangeHandler}></input>
                    </div>
                    <span><button type="submit" className="btn btn-outline-info" onClick={this.searchFriendHandler}>Search</button></span>
                </div>
                <div className="add-friends-matches">
                    {friends}
                </div>
            </div>
        );
    }
}

export default AddFriends;
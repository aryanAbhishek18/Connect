import React from 'react';
import '../css/FriendsList.css';

class FriendsList extends React.Component {
  //props.friends[]
  constructor(props) {
    super(props);
  }

  render(){
    const friends = this.props.friends.map((friend, key)=>{
      return (
        <div key={key} className="friend-div">
          <strong>{key+1}. </strong><strong>{friend.name}</strong> <i>{friend.email}</i>
        </div>
      );
    })
    return (
      <div className="friends-list-div">
        <div className="friends-list">
          {friends}
        </div>
      </div>
    );
  }
}

export default FriendsList;
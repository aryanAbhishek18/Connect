import React from 'react';
import '../css/ChangePassword.css';

let URL;
if (process.env.NODE_ENV === 'development') {
    URL = 'http://localhost:5000';
} else {
    URL = 'https://assist.aryanabhi.in';
}

class ChangePassword extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            dob: '',
            address: '',
            phone: '',
            hobby: ''
        };
        this.dobChangeHandler = this.dobChangeHandler.bind(this);
        this.addressChangeHandler = this.addressChangeHandler.bind(this);
        this.phoneChangeHandler = this.phoneChangeHandler.bind(this);
        this.hobbyChangeHandler = this.hobbyChangeHandler.bind(this);
        this.updateProfileHandler = this.updateProfileHandler.bind(this);
    }

    dobChangeHandler(event) {
        this.setState({
            dob: event.target.value
        });
    }

    addressChangeHandler(event) {
        this.setState({
            address: event.target.value
        });
    }

    phoneChangeHandler(event) {
        this.setState({
            phone: event.target.value
        });
    }

    hobbyChangeHandler(event) {
        this.setState({
            hobby: event.target.value
        });
    }

    async componentDidMount() {
        try{
            const token = sessionStorage.getItem('assistToken');
            if(!token){
                return alert('Token missing! Please sign out and sign in again!');
            }
            else{
                const url = URL + '/api/profile/getProfile'
                const res = await fetch(url, {
                    method: 'POST',
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({
                        token: sessionStorage.getItem('assistToken')
                    }),
                });

                const data = await res.json();
                if(data.status !== 200) {
                    alert(data.message);
                    alert('There was some error! Please sign out and sign in again.');
                }
                else{
                    const name = data.user.name;
                    const email = data.user.email;
                    const dob = data.user.dob;
                    const address = data.user.address;
                    const phone = data.user.phone;
                    const hobby = data.user.hobby;

                    this.setState({
                        name: name,
                        email: email,
                        dob: dob,
                        address: address,
                        phone: phone,
                        hobby: hobby
                    });
                }
            }
        }catch(e){
            alert('There was some error! Please sign out and sign in again.');
        }
    }

    async updateProfileHandler(event) {
        //check sign in details and verify with database, then call doSignIn
        event.preventDefault();
        let dob = this.state.dob.trim();
        let address = this.state.address.trim();
        let phone = this.state.phone.trim();

        if(!dob) {
            alert('DOB empty!')
        }
        else if(!address) {
            alert('Address empty!');
        }
        else if(!phone) {
            alert('Phone empty!');
        }
        else{
            try {
                const url = URL + '/api/profile/updateProfile';
                const res = await fetch(url, {
                    method: 'POST',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ 
                        dob: dob,
                        address: address,
                        phone: phone,
                        hobby: this.state.hobby,
                        token: sessionStorage.getItem('assistToken') 
                    }),
                });
                const data = await res.json();
                if (data.status !== 200) {
                    return alert(data.message);
                }
                
                alert('Profile updated successfully!!');

            } catch (e) {
                alert(e.message);
            }

        }
        
    }

    render(){
        return (
            <div className="container change-pass-div">
                <form noValidate>
                    <div className="form-group">
                        <label className="col-form-label">Name:</label>
                        <input type="text" className="form-control" value={this.state.name} disabled={true} required="required"></input>
                    </div>
                    <div className="form-group">
                        <label className="col-form-label">Email:</label>
                        <input type="text" className="form-control" value={this.state.email} disabled={true} required="required"></input>
                    </div>
                    <div className="form-group">
                        <label className="col-form-label">Date of birth:</label>
                        <input type="text" className="form-control" value={this.state.dob} onChange={this.dobChangeHandler} required="required"></input>
                    </div>
                    <div className="form-group">
                        <label className="col-form-label">Address:</label>
                        <input type="text" className="form-control" value={this.state.address} onChange={this.addressChangeHandler} required="required"></input>
                    </div>
                    <div className="form-group">
                        <label className="col-form-label">Phone Number:</label>
                        <input type="text" className="form-control" value={this.state.phone} onChange={this.phoneChangeHandler} required="required"></input>
                    </div>
                    <div className="form-group">
                        <label className="col-form-label">Hobby:</label>
                        <input type="text" className="form-control" value={this.state.hobby} onChange={this.hobbyChangeHandler} required="required"></input>
                    </div>
                    <span><button type="submit" className="btn btn-outline-info" onClick={this.updateProfileHandler}>Update</button></span>
                </form>
            </div>
        );
    }
}

export default ChangePassword;
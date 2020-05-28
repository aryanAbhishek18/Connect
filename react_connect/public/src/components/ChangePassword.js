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
            newPass: '',
            confNewPass: '',
            errorMsg: ''
        };
        this.passChangeHandler = this.passChangeHandler.bind(this);
        this.newPasswordChangeHandler = this.newPasswordChangeHandler.bind(this);
        this.confNewPasswordChangeHandler = this.confNewPasswordChangeHandler.bind(this);
    }

    newPasswordChangeHandler(event) {
        this.setState({
            newPass: event.target.value
        });
    }

    confNewPasswordChangeHandler(event) {
        this.setState({
            confNewPass: event.target.value
        });
    }

    async passChangeHandler(event) {
        //check sign in details and verify with database, then call doSignIn
        event.preventDefault();
        let newPass = this.state.newPass.trim();
        let confNewPass = this.state.confNewPass.trim();
        if(!newPass) {
            this.setState({
                errorMsg: 'New pass empty!'
            });
        }
        else if(!confNewPass) {
            this.setState({
                errorMsg: 'Conf new pass empty!'
            });
        }
        else if(newPass!==confNewPass) {
            this.setState({
                errorMsg: 'New pass and conf pass do not match!'
            });
        }
        else{
            this.setState({
                errorMsg: ''
            });
            try {
                const url = URL + '/api/profile/changePassword';
                const res = await fetch(url, {
                    method: 'POST',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ 
                        password: this.state.newPass,
                        token: sessionStorage.getItem('assistToken') 
                    }),
                });
                const data = await res.json();
                if (data.status !== 200) {
                    return alert(data.message);
                }
                
                alert('Password changed successfully!!');
                this.setState({
                    newPass: '',
                    confNewPass: ''
                });

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
                        <label className="col-form-label">New password:</label>
                        <input type="password" className="form-control" value={this.state.newPass} onChange={this.newPasswordChangeHandler} required="required"></input>
                    </div>
                    <div className="form-group">
                        <label className="col-form-label">Confirm new password:</label>
                        <input type="password" className="form-control" value={this.state.confNewPass} onChange={this.confNewPasswordChangeHandler} required="required"></input>
                    </div>
                    <p className='errorMsg'>{this.state.errorMsg}</p>
                    <span><button type="submit" className="btn btn-outline-info" onClick={this.passChangeHandler}>Submit</button></span>
                </form>
            </div>
        );
    }
}

export default ChangePassword;
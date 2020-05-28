import React from 'react';
import '../css/SignInUpForm.css';

let URL;
if (process.env.NODE_ENV === 'development') {
    URL = 'http://localhost:5000';
} else {
    URL = 'https://assist.aryanabhi.in';
}

class SignUpForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            pass: '',
            confPass: '',
            errorMsg: ''
        };
        this.signUpHandler = this.signUpHandler.bind(this);
        this.nameChangeHandler = this.nameChangeHandler.bind(this);
        this.emailChangeHandler = this.emailChangeHandler.bind(this);
        this.passChangeHandler = this.passChangeHandler.bind(this);
        this.confPassChangeHandler = this.confPassChangeHandler.bind(this);
    }

    nameChangeHandler (event) {
        this.setState({
            name: event.target.value
        });
    }

    emailChangeHandler (event) {
        this.setState({
            email: event.target.value
        });
    }

    passChangeHandler (event) {
        this.setState({
            pass: event.target.value
        });
    }

    confPassChangeHandler (event) {
        this.setState({
            confPass: event.target.value
        });
    }

    async signUpHandler(event){
        //ckeck the sign up details and verify with database, then call signUpHandler()
        event.preventDefault();
        let name = this.state.name.trim().toLowerCase();
        let email = this.state.email.trim();
        let pass = this.state.pass.trim();
        let confPass = this.state.confPass.trim();

        if(!name) {
            this.setState({
                errorMsg: 'Name empty!'
            });
        }
        if(!email) {
            this.setState({
                errorMsg: 'Email empty!'
            });
        }
        else if(!pass) {
            this.setState({
                errorMsg: 'Password empty!'
            });
        }
        else if(!confPass) {
            this.setState({
                errorMsg: 'Conf password empty!'
            });
        }
        else if(pass!==confPass){
            this.setState({
                errorMsg: 'Pass and conf pass dont match!'
            });
        }
        else{
            this.setState({
                errorMsg: ''
            });
            try {
                const url = URL + '/api/authenticate/signUp';
                const res = await fetch(url, {
                    method: 'POST',
                    body: JSON.stringify({ 
                        name: name,
                        email: this.state.email,
                        password: this.state.pass
                    }),
                    headers: { "Content-Type": "application/json" }
                });
                const data = await res.json();
                if (data.status !== 200) {
                    return alert(data.message);
                }
                
                const token = data.token;
                sessionStorage.setItem('assistToken', token);

                this.props.doSignUp();

            } catch (e) {
                alert(e);
            }

        }
  
    }



    render() {
        return (
            <div className="container signInUpDiv">
                <form>
                    <div className="form-group">
                        <label className="col-form-label">Name:</label>
                        <input type="text" className="form-control" onChange={this.nameChangeHandler} id="signUp-name"></input>
                    </div>
                    <div className="form-group">
                        <label className="col-form-label">Email:</label>
                        <input type="email" className="form-control" onChange={this.emailChangeHandler} id="signUp-email"></input>
                    </div>
                    <div className="form-group">
                        <label className="col-form-label">Password:</label>
                        <input type="password" className="form-control" onChange={this.passChangeHandler} id="signUp-password"></input>
                    </div>
                    <div className="form-group">
                        <label className="col-form-label">Confirm Password:</label>
                        <input type="password" className="form-control" onChange={this.confPassChangeHandler} id="SignUp-confirm-password"></input>
                    </div>
                    <p className='errorMsg'>{this.state.errorMsg}</p>
                    <span><button type="button" className="btn btn-outline-info" onClick={this.signUpHandler}>Sign Up</button></span>
                </form>
            </div>
        );
    }
}

export default SignUpForm;
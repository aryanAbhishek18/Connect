import React from 'react';
import logo from './logo.svg';
import './App.css';
import Portal from './components/Portal';
import SignUpForm from './components/SignUp';
import SignInForm from './components/SignIn';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false
    };
    this.signOutHandler = this.signOutHandler.bind(this);
    this.doSignIn = this.doSignIn.bind(this);
    this.doSignUp = this.doSignUp.bind(this);
  }

  signOutHandler(e) {
    sessionStorage.removeItem('assistToken');
    this.setState({
      isLoggedIn: false
    });
  }

  doSignIn(e) {
    this.setState({
      isLoggedIn: true
    });
  }

  doSignUp(e) {
    this.setState({
      isLoggedIn: true
    });
  }

  render() {
    const LoggedInContent = <Portal signOutHandler={this.signOutHandler}/>;

    const home = (
      <div className="container">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <div className="container home-desc">
          <h2><strong>Connect</strong></h2>
          <h4><em>A social networking web application</em></h4>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-1"></div>
            <div className="col-md-4 signInUpContainer">
              <SignInForm doSignIn={this.doSignIn}></SignInForm>
            </div>
            <div className="col-md-2">

            </div>
            <div className="col-md-4 signInUpContainer">
              <SignUpForm doSignUp={this.doSignUp}></SignUpForm>
            </div>
            <div className="col-md-1"></div>
          </div>
        </div>
        <hr></hr>
        <div className="footer">
          <p>Designed as part of our lab assignment of Software Engineering Lab.</p>
          <p>Designed by: <strong>Team Dextro</strong></p>
          <p>1. Abhishek Aryan BE/10130/17</p>
          <p>2. Rohit Hembrom BE/10131/17</p>
          <p>3. Gaurav Singh BE/10137/17</p>
        </div>
      </div>
    );

    return (
      <div className="container-fluid home">
        {this.state.isLoggedIn ? LoggedInContent : home}
      </div>
    );
  }
}

export default App;
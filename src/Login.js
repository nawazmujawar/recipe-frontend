import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "./Login.css";
import io from "socket.io-client";
import Homepage from "./Homepage";

const AUTH_SERVER = "https://foodprint-api.herokuapp.com";
const socket = io(AUTH_SERVER);
class Login extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
      accessToken: "",

      disabled: "",
    };
    this.popup = null;
  }
  setUser = (user) => {
    this.setState({
      user,
    });
  };

  checkPopup() {
    const check = setInterval(() => {
      const { popup } = this;
      if (!popup || popup.closed || popup.closed === undefined) {
        clearInterval(check);
        this.setState({
          disabled: "",
        });
      }
    }, 1000);
  }

  // Launches the popup on the server and passes along the socket id so it
  // can be used to send back user data to the appropriate socket on
  // the connected client.
  openPopup() {
    const width = 600,
      height = 600;
    const left = window.innerWidth / 2 - width / 2;
    const top = window.innerHeight / 2 - height / 2;

    const url = `https://foodprint-api.herokuapp.com/api/auth/google?socketId=${socket.id}`;

    return window.open(
      url,
      "",
      `toolbar=no, location=no, directories=no, status=no, menubar=no, 
          scrollbars=no, resizable=no, copyhistory=no, width=${width}, 
          height=${height}, top=${top}, left=${left}`
    );
  }

  // Kicks off the processes of opening the popup on the server and listening
  // to the popup. It also disables the login button so the user can not
  // attempt to login to the provider twice.
  startAuth() {
    if (!this.state.disabled) {
      this.popup = this.openPopup();
      this.checkPopup();
      this.setState({
        disabled: "disabled",
      });
    }
  }

  closeCard() {
    this.setState({
      user: {},
    });
  }

  componentDidMount() {
    socket.on("user", (user) => {
      this.popup.close();
      console.log(user);
      const accessToken = user.accessToken;
      const userId = user.user._id;
      const username = user.user.username;
      const profilePicture = user.user.profilePicture;
      const email = user.user.email;
      this.setState({
        accessToken,
      });
      window.localStorage.setItem("accessToken", accessToken);
      window.localStorage.setItem("userId", userId);
      window.localStorage.setItem("username", username);
      window.localStorage.setItem("profilePicture", profilePicture);
      window.localStorage.setItem("email", email);
    });
  }

  render(props) {
    const { disabled } = this.state;
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      return <Redirect to="/home" />;
    } else {
      return (
        <div className="login">
          <img
            className="login__logo"
            src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg"
            alt="logo"
          />
          <h2 className="login__slogan">The home for all recipes.</h2>
          <p>
            Save your favorite recipes in one place.
            <br /> Post your creative recipes with its consequence pics.
            <br />
            Storing your recipes in FoodCluster allows you to quickly search,
            find, and select what you want to cook.
          </p>
          <button onClick={this.startAuth.bind(this)}>
            SIGN IN WITH GOOGLE
          </button>
        </div>
      );
    }
  }
}
export default Login;

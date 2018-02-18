import React, { Component } from "react";
import Chatbar from "./Chatbar.jsx";
import MessageList from "./MessageList.jsx";

class App extends Component {
	constructor(props) {
		super(props);

		this.handleNewMessage = this.handleNewMessage.bind(this);
		this.state = {
			currentUser: { name: "" }, // optional. if currentUser is not defined, it means the user is Anonymous
			messages: [
				{
					id: 4860234,
					username: "Bob",
					content: "Has anyone seen my marbles?"
				},
				{
					id: 432894,
					username: "Anonymous",
					content:
						"No, I think you lost them. You lost your marbles Bob. You lost them for good."
				}
			]
		};
  }
  
  waitForSocketConnection(socket, callback){
    setTimeout(
        () => {
            if (socket.readyState === 1) {
                console.log("Connection is made")
                if(callback != null){
                    callback();
                }
                return;

            } else {
                console.log("wait for connection...")
                this.ws = new WebSocket('ws://localhost:3001');
                this.waitForSocketConnection(socket, callback);
            }

        }, 500); // wait 5 milisecond for the connection...
}

	handleNewMessage(newMessage) {
    this.waitForSocketConnection(this.ws, () => {
      this.ws.send(JSON.stringify(newMessage))
    });
    if(newMessage.username !== this.state.currentUser.name) {
      this.setState({currentUser: { [name]: newMessage.username }})
    }
  }
  
  componentDidMount() {
   this.ws = new WebSocket('ws://localhost:3001');
    this.ws.onopen = (event) => {
      console.log('Connected to the server!');
    }
    this.ws.onmessage = (message) => {
      console.log('Received: ', message.data)
      message = JSON.parse(message.data);
      if(message.id && message.content !== '' && message.username) {
        this.setState(prevState => ({
          messages: [...prevState.messages, message]
        }));
      }
    }
  }

	render() {
		return (
			<div>
				<nav className="navbar">
					<a href="/" className="navbar-brand">
						Chatty
					</a>
				</nav>
				<MessageList messages={this.state.messages} />
				<Chatbar
					currentUser={this.state.currentUser}
					handleNewMessage={this.handleNewMessage}
				/>
			</div>
		);
	}
}
export default App;

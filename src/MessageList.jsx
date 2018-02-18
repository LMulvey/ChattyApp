import React, { Component } from "react";
import Message from "./Message.jsx";

class MessageList extends Component {
	render() {
		let messageList = this.props.messages.map(message => {
			return (
				<Message
					key={message.id}
					username={message.username}
					content={message.content}
				/>
			);
		});
		return <main className="messages">{messageList}</main>;
	}
}
export default MessageList;

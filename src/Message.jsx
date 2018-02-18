import React, { Component } from "react";

class Message extends Component {
	render() {
		let output = this.props.system ? (
			<div className="message system">{this.props.content}</div>
		) : (
			<div className="message">
				<span className="message-username">{this.props.username}</span>
				<span className="message-content">{this.props.content}</span>
			</div>
		);

		return <div>{output}</div>;
	}
}
export default Message;

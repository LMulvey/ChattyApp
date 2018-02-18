import React, { Component } from "react";

class Chatbar extends Component {
	constructor(props) {
		super(props);

		this.handleChange = this.handleChange.bind(this);
		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.state = {
			inputs: {
                message: "",
                username: (this.props.currentUser.name !== undefined)
                            ? this.props.currentUser.name
                            : ""
			}
		};
	}

	handleChange(e) {
		let type = e.target.id;
        let value = e.target.value;
        let newInput = this.state.inputs;
        newInput[type] = value;
		this.setState({
			inputs:  newInput
		});
	}

	handleKeyDown(e) {
		let message = this.state.inputs.message;
		if (e.keyCode === 13 && message !== "") {
			// 13 == ENTER, they tried to submit
			this.props.handleNewMessage({
				username: this.state.inputs.username,
				content: message
			});
			this.setState({ inputs: { message: "" } });
		}
	}

	render() {
		return (
			<footer className="chatbar">
				<input
					id="username"
					className="chatbar-username"
                    placeholder="Your Name (Optional)"
                    onChange={this.handleChange}
					value={this.state.inputs.username}
				/>
				<input
					id="message"
					className="chatbar-message"
					placeholder="Type a message and hit ENTER"
					value={this.state.inputs.message}
					onChange={this.handleChange}
					onKeyDown={this.handleKeyDown}
				/>
			</footer>
		);
	}
}
export default Chatbar;

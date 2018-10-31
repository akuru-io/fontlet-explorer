import React, { Component } from "react";
import { Content, SkipButtonWrapper, SubmitButtonWrapper } from "./styles";

class Input extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: ""
    };
  }

  render() {
    const { email } = this.state;
    const { skipButtonFunction, registerUser } = this.props;
    return (
      <Content
        onSubmit={event => {
          event.preventDefault();
          registerUser({ email });
        }}
      >
        <input
          value={email}
          onChange={event => {
            this.setState({
              email: event.target.value
            });
          }}
          className="bp3-input"
          type="text"
          placeholder="do@example.com"
          dir="auto"
        />

        <SubmitButtonWrapper>
          <button className="bp3-button" type="submit" style={{ width: 100 }}>
            SUBMIT
          </button>
        </SubmitButtonWrapper>
        <SkipButtonWrapper>
          <button
            className="bp3-button bp3-intent-primary bp3-minimal"
            type="button"
            style={{ width: 100 }}
            onClick={skipButtonFunction}
          >
            SKIP
          </button>
        </SkipButtonWrapper>
      </Content>
    );
  }
}

export default Input;

import React, { Component } from 'react';
import styled from 'styled-components';

const Content = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const SkipButtonWrapper = styled.div`
  margin-top: 20px;
`;

const SubmitButtonWrapper = styled.div`
  margin-top: 40px;

  @media (max-width: 1000px) {
    margin-top: 30px;
  }
`;

class Input extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userEmail: ''
    };
  }

  render() {
    const { userEmail } = this.state;
    const { skipButtonFunction, registerUser } = this.props;
    return (
      <Content
        onSubmit={event => {
          event.preventDefault();
          registerUser(userEmail);
        }}
      >
        <input
          value={userEmail}
          onChange={event => {
            this.setState({
              userEmail: event.target.value
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

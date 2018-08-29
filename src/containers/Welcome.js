import React, { Component } from 'react';
import styled from 'styled-components';

const Wrapper = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #ffffff;
  flex-direction: column;
`;

const MainTitle = styled.p`
  font-size: 30px;
  font-family: sans-serif;
`;

const Description = styled.p`
  font-size: 17px;
  font-family: sans-serif;
  text-align: center;

  @media (max-width: 1000px) {
    font-size: 15px;
  }
`;

const DiscriptionWrapper = styled.div`
  margin-top: 30px;
  width: 40%;

  @media (max-width: 1000px) {
    width: 60%;
  }
`;

const Title = styled.p`
  font-size: 17px;
  margin-top: 50px;
  font-family: sans-serif;
  text-align: center;

  @media (max-width: 1000px) {
    margin-top: 30px;
  }
`;

const ButtonContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SubmitButtonWrapper = styled.div`
  margin-top: 40px;

  @media (max-width: 1000px) {
    margin-top: 30px;
  }
`;

function validateEmail(email) {
  /* eslint-disable max-len */
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  /* eslint-enable max-len */

  return re.test(String(email).toLowerCase());
}

class Welcome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userEmail: ''
    };
  }

  registerUser() {
    const { userEmail } = this.state;

    if (validateEmail(userEmail)) {
      // Call register user api
    } else {
      /* eslint-disable no-unused-vars */
      const Alert = new Notification('Title', {
        body: 'Invalid E-mail!'
      });
      /* eslint-enable no-unused-vars */
    }
  }

  render() {
    const { userEmail } = this.state;

    return (
      <Wrapper
        onSubmit={event => {
          event.preventDefault();

          this.registerUser();
        }}
      >
        <MainTitle>Welcome to fontcase</MainTitle>

        <DiscriptionWrapper>
          <Description>
            Lorem iDescriptionsum dolor sit amet, consectetur adipiscing elit. Donec sed semper
            magna, vitae auctor nisi. Pellentesque eleifend est in nisi euismod faucibus. Praesent
            facilisis elementum sapien id pulvinar. Vestibulum ut finibus ex. Vivamus elementum
            massa et diam sollicitudin, eget interdum erat volutpat. Duis porttitor massa sapien,
            vitae blandit magna venenatis nec. Nullam pulvinar, magna vel convallis auctor, dui ex
            lacinia nisi, a porttitor elit risus ac ex.
          </Description>
        </DiscriptionWrapper>

        <Title>Please select your language</Title>

        <ButtonContent>
          <button className="bp3-button " type="button" style={{ width: 80 }}>
            English
          </button>

          <button className="bp3-button" type="button" style={{ width: 80 }}>
            Sinhala
          </button>

          <button className="bp3-button" type="button" style={{ width: 80 }}>
            Tamil
          </button>
        </ButtonContent>

        <Title>Please register enter your email</Title>

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

        <SubmitButtonWrapper />
        <button className="bp3-button" type="submit" style={{ width: 100 }}>
          SUBMIT
        </button>
      </Wrapper>
    );
  }
}

export default Welcome;

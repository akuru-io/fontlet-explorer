import React, { Component } from 'react';
import styled from 'styled-components';
import { fetchUserEmail } from '../lib/emailRegister';

const Wrapper = styled.form`
  height: 100vh;
  background-color: #ffffff;
  overflow-y: hidden;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;
  margin-top: 20px;
`;

const MainTitle = styled.p`
  font-size: 30px;
`;

const Description = styled.p`
  font-size: 17px;
  text-align: center;
  color: #6d6d6d;

  @media (max-width: 1000px) {
    font-size: 15.5px;
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
  text-align: center;
  color: #6d6d6d;

  @media (max-width: 1000px) {
    margin-top: 42px;
  }
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
      userEmail: '',
      loading: false
    };

    this.registerUser = this.registerUser.bind(this);
  }

  async registerUser() {
    const { userEmail } = this.state;
    const { registerUser } = this.props;
    this.setState({ loading: true });

    if (validateEmail(userEmail)) {
      const data = await fetchUserEmail(userEmail);

      if (data === 'Success') {
        this.setState({ loading: false });
        const Alert = new Notification('Your Email is successfully submitted !');
        registerUser(userEmail);
        /* eslint-disable no-unused-vars */
      } else {
        console.log('fail');
        this.setState({ loading: false });
        const Alert = new Notification('Something went wrong !');
      }

      // Call register user api
    } else {
      this.setState({ loading: false });
      const Alert = new Notification('Your email is invalid !');
      /* eslint-enable no-unused-vars */
    }
  }

  render() {
    const { userEmail, loading } = this.state;
    const { skipButtonFunction } = this.props;
    return (
      <Wrapper
        onSubmit={event => {
          event.preventDefault();
          this.registerUser();
        }}
      >
        {loading && (
          <div className="bp3-progress-bar bp3-intent-primary">
            <div className="bp3-progress-meter" />
          </div>
        )}

        <Content>
          <MainTitle>Welcome to fontcase</MainTitle>

          <DiscriptionWrapper>
            <Description>
              Fontcase brings you the latest and greatest free and open source fonts right to your
              computer! Fontcase keeps your fonts fresh by automatically updating them to fit the
              latest versions and even try out Beta versions before anybody else does! Right now
              Fontcase is in its early stages, but you can register now using your email to get
              updates.
            </Description>
          </DiscriptionWrapper>

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
      </Wrapper>
    );
  }
}

export default Welcome;

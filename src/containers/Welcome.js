import React, { Component } from 'react';
import styled from 'styled-components';
import ReactSVG from 'react-svg';
import { fetchUserEmail } from '../lib/emailRegister';

import fontletLogo from '../assets/images/fontCase_round_background_animated.svg';
import Input from '../components/Input';

const Wrapper = styled.div`
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
  margin-bottom: 22px;
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
  margin-top: 20px;
  width: 40%;

  @media (max-width: 1000px) {
    width: 60%;
  }
`;

const Title = styled.p`
  font-size: 17px;
  margin-top: 20px;
  text-align: center;
  color: #6d6d6d;
`;

function validateEmail(email) {
  /* eslint-disable max-len */
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  /* eslint-enable max-len */

  return re.test(String(email).toLowerCase());
}

const animateLogo = () => {
  const fontlet = document.getElementById('Fontlet');

  if (fontlet) {
    // Start the line drawing
    fontlet.classList.add('start');
    setTimeout(() => {
      // Signal the end of the drawing to start the fill color animation
      fontlet.classList.add('finished');
    }, 2500);
  }
};

class Welcome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false
    };

    this.registerUser = this.registerUser.bind(this);
  }

  async registerUser(userEmail) {
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
    const { loading } = this.state;
    const { skipButtonFunction } = this.props;
    return (
      <Wrapper>
        {loading && (
          <div className="bp3-progress-bar bp3-intent-primary">
            <div className="bp3-progress-meter" />
          </div>
        )}

        <Content>
          <MainTitle>Welcome to FontLet</MainTitle>
          <ReactSVG
            src={fontletLogo}
            evalScripts="once"
            svgStyle={{ width: 170 }}
            onInjected={svg => {
              animateLogo();
            }}
          />
          <DiscriptionWrapper>
            <Description>
              Fontlet brings you the latest and greatest free and open source fonts right to your
              computer! Fontcase keeps your fonts fresh by automatically updating them to fit the
              latest versions and even try out Beta versions before anybody else does! Right now
              Fontcase is in its early stages, but you can register now using your email to get
              updates.
            </Description>
          </DiscriptionWrapper>
          <Title>Please register enter your email</Title>
          <Input registerUser={this.registerUser} skipButtonFunction={skipButtonFunction} />
        </Content>
      </Wrapper>
    );
  }
}

export default Welcome;

import React, { Component } from 'react';
import styled from 'styled-components';
import ReactSVG from 'react-svg';
import { fetchUserEmail } from '../lib/emailRegister';

import fontletLogo from '../assets/images/fontCase_round_background_animated.svg';
import fontletLogo2 from '../assets/images/fontCase_logo_no_background.png';

const Wrapper = styled.form`
  height: 100vh;
  background-color: #ffffff;
  overflow-y: hidden;
`;

const Logo = styled.img`
  width: 141.5px;
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

const SkipButtonWrapper = styled.div`
  margin-top: 20px;
`;

const SubmitButtonWrapper = styled.div`
  margin-top: 40px;

  @media (max-width: 1000px) {
    margin-top: 30px;
  }
`;

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
  render() {
    return (
      <div>
        <ReactSVG
          src={fontletLogo}
          evalScripts="once"
          svgStyle={{ width: 170 }}
          onInjected={svg => {
            animateLogo();
          }}
        />
      </div>
    );
  }
}

export default Welcome;

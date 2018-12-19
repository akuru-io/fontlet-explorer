import React from "react";
import ReactSVG from "react-svg";

import Input from "./Input";
import {
  Wrapper,
  Content,
  MainTitle,
  Description,
  DiscriptionWrapper,
  Title
} from "./styles";
import fontletLogo from "../../assets/images/fontCase_round_background_animated.svg";

const animateLogo = () => {
  const fontlet = document.getElementById("Fontlet");

  if (fontlet) {
    // Start the line drawing
    fontlet.classList.add("start");
    setTimeout(() => {
      // Signal the end of the drawing to start the fill color animation
      fontlet.classList.add("finished");
    }, 2500);
  }
};

// eslint-disable-next-line
const descText =
  "Fontlet brings you the latest and greatest free and open source fonts right to your computer! Fontcase keeps your fonts fresh by automatically updating them to fit the latest versions and even try out Beta versions before anybody else does! Right now Fontcase is in its early stages, but you can register now using your email to get updates.";

const Welcome = ({ registering, registerUser }) => (
  <Wrapper>
    {registering && (
      <div className="bp3-progress-bar bp3-intent-primary">
        <div className="bp3-progress-meter" />
      </div>
    )}

    <Content>
      <MainTitle>Welcome to Fontlet</MainTitle>
      <ReactSVG
        src={fontletLogo}
        evalScripts="once"
        svgStyle={{ width: 170 }}
        onInjected={() => {
          animateLogo();
        }}
      />
      <DiscriptionWrapper>
        <Description>{descText}</Description>
      </DiscriptionWrapper>
      <Title>Please register enter your email</Title>
      <Input
        registerUser={registerUser}
        skipButtonFunction={() => registerUser({ email: null })}
      />
    </Content>
  </Wrapper>
);

export default Welcome;

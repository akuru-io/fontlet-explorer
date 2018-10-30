import React, { Component } from "react";
import styled from "styled-components";
import { Button, Switch, Card, Elevation } from "@blueprintjs/core";
import find from "lodash/find";

// Styles
const Wrapper = styled.div`
  height: 100vh;
  padding: 15px;
`;

const Content = styled(Card)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const CardContent = styled.div`
  margin-top: 10px;
  margin-bottom: 20px;
`;

const VersionDetails = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-right: 15px;
`;

const VersionContent = styled.div`
  display: flex;
  flex: 1;
`;

const Name = styled.p`
  font-size: 17px;
  color: #000000;
  margin-left: 20px;
  margin-bottom: 0px;
  @media (max-width: 1000px) {
    font-size: 14px;
  }
`;

const Version = styled.p`
  font-size: 17px;
  color: #867f7f;
  margin-left: 20px;
  margin-bottom: 0px;
  @media (max-width: 1000px) {
    font-size: 14px;
  }
`;

const Variant = styled.p`
  font-size: 17px;
  color: #867f7f;
  margin-left: 20px;
  margin-bottom: 0px;
  @media (max-width: 1000px) {
    font-size: 14px;
  }
`;

const Foundry = styled.p`
  font-size: 17px;
  color: #867f7f;
  margin-left: 20px;
  margin-bottom: 0px;
  @media (max-width: 1000px) {
    font-size: 14px;
  }
`;

const SettingsContent = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  background-color: #f7f7f7;
  padding: 20px;
`;

const FontImage = styled.img`
  width: 100%;
  height: 100%;
`;

const ToggleButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const UpdateButtonWrapper = styled.div`
font-size: 17px;
color: #867f7f;
margin-left: 20px;
margin-bottom: 0px;

`;

class Gallery extends Component {
  handleSwitchAction = (font, installed) => {
    const { installFont, uninstallFont } = this.props;
    if (installed) {
      uninstallFont(font);
      return;
    }
    installFont(font);
  };

  handleUpdateAction = font => {
    const { updateFont } = this.props;
    updateFont(font);
  };

  renderFontItem = font => {
    const {
      familyName,
      id,
      foundry,
      coverImageUrl,
      version,
      fontStyles,
      isUpdateAvailable
    } = font;
    const { installedFonts, flags } = this.props;
    const installedFont = find(installedFonts, f => f.id === id);
    const installed = !!installedFont;
    const showUpdateBtn = installed && isUpdateAvailable;

    return (
      <CardContent className="card-style" key={id}>
        <Content elevation={Elevation.TWO}>
          {flags[id] && (
            <div className="bp3-progress-bar bp3-intent-primary">
              <div className="bp3-progress-meter" />
            </div>
          )}

          <FontImage src={coverImageUrl} />
          <SettingsContent>
            <VersionContent>
              <VersionDetails>
                <Name>{familyName}</Name>
                <Foundry>from {foundry}</Foundry>
                <Variant>{fontStyles.length} fonts in family</Variant>
                <Version>v {version}</Version>
                {showUpdateBtn && (
                  <UpdateButtonWrapper>
                  <Button 
                    className="bp3-button" 
                    icon="refresh"
                    text="Update"
                    active="true"
                    onClick={() => this.handleUpdateAction(font)}
                    />
                </UpdateButtonWrapper>
                )}
              </VersionDetails>
            </VersionContent>

            <ToggleButtonWrapper>
              <Switch
                className="switch-style"
                checked={installed}
                large
                onChange={() => this.handleSwitchAction(font, installed)}
              />
              
            </ToggleButtonWrapper>
          </SettingsContent>
        </Content>
      </CardContent>
    );
  };

  render() {
    const { fonts } = this.props;
    return <Wrapper>{fonts.map(this.renderFontItem)}</Wrapper>;
  }
}

export default Gallery;

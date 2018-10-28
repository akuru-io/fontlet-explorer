import React, { Component } from "react";
import styled from "styled-components";
import { Switch, Card, Elevation } from "@blueprintjs/core";
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

class Gallery extends Component {
  handleSwitchAction = (font, uninstall) => {
    const { installFont, uninstallFont } = this.props;
    if (uninstall) uninstallFont(font);
    installFont(font);
  };

  renderFontItem = font => {
    const { id, coverImageUrl, version, fontStyles } = font;
    const { installedFonts, flags } = this.props;
    const installed = !!find(installedFonts, f => f.id === id);

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
                <Version>v {version}</Version>
                <Variant>Number of styles : {fontStyles.length}</Variant>
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

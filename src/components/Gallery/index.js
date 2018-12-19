import React, { Component } from "react";
import find from "lodash/find";
import { Button, Switch, Elevation } from "@blueprintjs/core";

import {
  Wrapper,
  Content,
  CardContent,
  VersionDetails,
  VersionContent,
  Name,
  Version,
  Variant,
  Foundry,
  SettingsContent,
  FontImage,
  ToggleButtonWrapper,
  UpdateButtonWrapper
} from "./styles";
import Loading from "../common/Loading";

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
          {flags[id] && <Loading />}

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

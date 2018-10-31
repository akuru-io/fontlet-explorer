import React, { Component } from "react";
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
  handleSwitchAction = font => {
    const { installFont, uninstallFont } = this.props;
    if (font.installed) {
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
      installing,
      uninstalling,
      updating,
      installed,
      isUpdateAvailable
    } = font;

    const isProcessing = installing || uninstalling || updating;

    return (
      <CardContent className="card-style" key={id}>
        <Content elevation={Elevation.TWO}>
          {isProcessing && <Loading />}

          <FontImage src={coverImageUrl} />
          <SettingsContent>
            <VersionContent>
              <VersionDetails>
                <Name>{familyName}</Name>
                <Foundry>from {foundry}</Foundry>
                <Variant>{fontStyles.length} fonts in family</Variant>
                <Version>v {version}</Version>
                {isUpdateAvailable && (
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
                onChange={() => this.handleSwitchAction(font)}
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

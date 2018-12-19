import styled from "styled-components";
import { Card } from "@blueprintjs/core";

// Styles
export const Wrapper = styled.div`
  height: 100vh;
  padding: 15px;
`;

export const Content = styled(Card)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const CardContent = styled.div`
  margin-top: 10px;
  margin-bottom: 20px;
`;

export const VersionDetails = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-right: 15px;
`;

export const VersionContent = styled.div`
  display: flex;
  flex: 1;
`;

export const Name = styled.p`
  font-size: 17px;
  color: #000000;
  margin-left: 20px;
  margin-bottom: 0px;
  @media (max-width: 1000px) {
    font-size: 14px;
  }
`;

export const Version = styled.p`
  font-size: 17px;
  color: #867f7f;
  margin-left: 20px;
  margin-bottom: 0px;
  @media (max-width: 1000px) {
    font-size: 14px;
  }
`;

export const Variant = styled.p`
  font-size: 17px;
  color: #867f7f;
  margin-left: 20px;
  margin-bottom: 0px;
  @media (max-width: 1000px) {
    font-size: 14px;
  }
`;

export const Foundry = styled.p`
  font-size: 17px;
  color: #867f7f;
  margin-left: 20px;
  margin-bottom: 0px;
  @media (max-width: 1000px) {
    font-size: 14px;
  }
`;

export const SettingsContent = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  background-color: #f7f7f7;
  padding: 20px;
`;

export const FontImage = styled.img`
  width: 100%;
  height: 100%;
`;

export const ToggleButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const UpdateButtonWrapper = styled.div`
  font-size: 17px;
  color: #867f7f;
  margin-left: 20px;
  margin-bottom: 0px;
`;

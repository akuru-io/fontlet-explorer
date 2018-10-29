import React from "react";
import styled from "styled-components";

const electron = window.require("electron");

// Styles
const Announcement = styled.div`
  color: white;
  text-align: center;
  background-color: green;
  padding: 5px 0;
  font-size: 11px;
  cursor: pointer;
`;

const openExternalLink = url => {
  if (!url) return;
  electron.shell.openExternal(url);
};

const InfoView = ({ announcement }) => {
  if (!announcement) return null;
  const { text, href } = announcement || {};
  if (!text) return null;
  return (
    <Announcement onClick={() => openExternalLink(href)}>{text}</Announcement>
  );
};

export default InfoView;

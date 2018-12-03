import React from "react";
import styled from "styled-components";

// Styles
const Error = styled.div`
  color: white;
  text-align: center;
  background-color: red;
  padding: 5px 0;
  font-size: 11px;
`;

const ErrorView = ({ error }) => {
  if (!error) return null;
  return <Error>{error.message}</Error>;
};

export default ErrorView;

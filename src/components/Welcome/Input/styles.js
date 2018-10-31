import styled from "styled-components";

export const Content = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const SkipButtonWrapper = styled.div`
  margin-top: 20px;
`;

export const SubmitButtonWrapper = styled.div`
  margin-top: 40px;

  @media (max-width: 1000px) {
    margin-top: 30px;
  }
`;

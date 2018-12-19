import styled from "styled-components";

export const Wrapper = styled.div`
  height: 100vh;
  background-color: #ffffff;
  overflow-y: hidden;
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;
  margin-top: 20px;
`;

export const MainTitle = styled.p`
  font-size: 30px;
  margin-bottom: 22px;
`;

export const Description = styled.p`
  font-size: 17px;
  text-align: center;
  color: #6d6d6d;

  @media (max-width: 1000px) {
    font-size: 15.5px;
  }
`;

export const DiscriptionWrapper = styled.div`
  margin-top: 20px;
  width: 40%;

  @media (max-width: 1000px) {
    width: 60%;
  }
`;

export const Title = styled.p`
  font-size: 17px;
  margin-top: 20px;
  text-align: center;
  color: #6d6d6d;
`;

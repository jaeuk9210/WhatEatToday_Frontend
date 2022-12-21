import styled from "styled-components";
import { Wrapper as SWrapper } from "../style";

export const Appbar = styled.header`
  min-height: 55px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: sticky;
  top: 0px;
  background-color: #fff;
`;

export const Wrapper = styled(SWrapper)`
  background-color: #fff;
  height: 100%;
  padding: 3px 10px 3px 20px;
  justify-content: space-between;
  position: relative;
  flex-direction: row;
`;

export const LeftBox = styled.div`
  display: flex;
  align-items: center;
  padding-right: 20px;
`;

export const MiddleBox = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

export const RightBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: right;
  flex: 1;
`;

const Header = ({ left: Left, middle: Middle, right: Right }) => (
  <Appbar>
    <Wrapper>
      {Left && (
        <LeftBox>
          <Left />
        </LeftBox>
      )}
      {Middle && (
        <MiddleBox>
          <Middle />
        </MiddleBox>
      )}
      {Right && (
        <RightBox>
          <Right />
        </RightBox>
      )}
    </Wrapper>
  </Appbar>
);

export default Header;

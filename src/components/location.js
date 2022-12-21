import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const SLocation = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  gap: 2px;
`;

const Sub = styled.span`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 500;
  font-size: 11px;
  line-height: 13px;

  color: #999;
`;

const Title = styled.span`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 22px;

  color: #000000;
`;

const Btn = styled.div`
  display: flex;
  width: 20px;
  height: 20px;
  align-items: center;
  justify-content: center;
`;

const NowLoc = styled.div`
  display: flex;
`;

const Location = ({ center }) => {
  return (
    <SLocation center={center}>
      <Sub>현재 위치는</Sub>
      <NowLoc>
        <Title>안동 용상</Title>
        <Btn>
          <FontAwesomeIcon icon={faAngleDown} fontSize="10px" />
        </Btn>
      </NowLoc>
    </SLocation>
  );
};

export default Location;

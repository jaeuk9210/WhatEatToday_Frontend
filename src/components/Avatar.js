import styled from "styled-components";

const SAvatar = styled.div`
  display: flex;
  width: ${(props) => (props.size ? props.size : "48px")};
  height: ${(props) => (props.size ? props.size : "48px")};
  border-radius: 50%;
  border: 0.5px solid #eaeaea;
  background: #fff;
  overflow: hidden;
  justify-content: center;
  align-items: center;
`;

const Img = styled.img`
  max-width: 100%;
`;

const Avatar = ({ url = "", size }) => {
  return (
    <SAvatar size={size}>
      {url ? <Img src={url} /> : <Img src="avatar.png" width="25px" />}
    </SAvatar>
  );
};

export default Avatar;

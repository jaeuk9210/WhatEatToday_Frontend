import React from "react";
import styled from "styled-components";
import { CSSTransition } from "react-transition-group";
import { useReactiveVar } from "@apollo/client";
import "./BottomSheet.css";

const Sheet = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  position: fixed;
  justify-content: flex-end;
`;

const BottomSheetTop = styled.div`
  bottom: 0px;
  width: 100vw;
  height: 40px;
  background: #fff;
  border-radius: 20px 20px 0px 0px;
  box-shadow: 0px -4px 10px rgba(0, 0, 0, 0.06);
`;

const Handle = styled.div`
  width: 50px;
  height: 5px;
  background: #eeeeee;
  border-radius: 100px;
  margin: 15px auto;
`;

const BottomSheetContent = styled.div`
  display: flex;
  background: #ffffff;
  padding: 10px 0px;
  gap: 10px;
  flex-direction: column;
  align-items: center;
  width: 100vw;
`;

function BottomSheet({ children, reactVar }) {
  const isShowBottomSheet = useReactiveVar(reactVar);
  const onClickDiv = () => reactVar(false);
  return (
    <CSSTransition
      in={isShowBottomSheet}
      timeout={600}
      classNames="bottomSheet"
      unmountOnExit
    >
      <Sheet className="Background">
        <BottomSheetTop onClick={onClickDiv}>
          <Handle />
        </BottomSheetTop>

        <BottomSheetContent>{children}</BottomSheetContent>
      </Sheet>
    </CSSTransition>
  );
}

export default BottomSheet;

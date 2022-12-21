import React from "react";
import styled from "styled-components";
import { CSSTransition } from "react-transition-group";
import { useReactiveVar } from "@apollo/client";
import "./BottomSheet.css";

const Sheet = styled.div`
  max-width: 930px;
  width: 100%;
  display: flex;
  flex-direction: column;
  position: fixed;
  bottom: 0%;
  justify-content: flex-end;
  align-items: center;
`;

const BottomSheetTop = styled.div`
  width: 100%;
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
  width: 100%;
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

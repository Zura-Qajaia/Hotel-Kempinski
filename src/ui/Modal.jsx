import { createContext, useContext, useState, cloneElement } from "react";
import { createPortal } from "react-dom";
import { HiX } from "react-icons/hi";
import styled from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  position: absolute;
  top: 1rem;
  right: 1rem;
  cursor: pointer;
`;

const ModalContext = createContext();

function Modal({ children }) {
  const [openName, setOpenName] = useState("");

  const close = () => setOpenName("");
  const open = (name) => setOpenName(name);

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, name }) {
  const { open } = useContext(ModalContext);

  return cloneElement(children, { onClick: () => open(name) });
}

function Window({ children, name }) {
  const { openName, close } = useContext(ModalContext);
  const ref = useOutsideClick(close);

  return openName === name
    ? createPortal(
        <Overlay>
          <StyledModal ref={ref}>
            <CloseButton onClick={close}>
              <HiX />
            </CloseButton>
            {children}
          </StyledModal>
        </Overlay>,
        document.body
      )
    : null;
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;

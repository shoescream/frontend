import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import SidePanel from './SidePanel';
interface ModalProps {
  isOpenModal: boolean;
  setIsOpenModal: Dispatch<SetStateAction<boolean>>;
}
const Modal = ({ isOpenModal, setIsOpenModal }: ModalProps) => {
  return (
    <>
      <ModalBackGround
        onClick={() => setIsOpenModal(!isOpenModal)}
      ></ModalBackGround>
      <SidePanel></SidePanel>
    </>
  );
};

export default Modal;

const ModalBackGround = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
`;

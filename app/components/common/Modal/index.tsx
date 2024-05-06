import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import SidePanel from './SidePanel';
import OptionSelectModal from './OptionSelectModal';
interface ModalProps {
  isOpenModal: boolean;
  setIsOpenModal: Dispatch<SetStateAction<boolean>>;
  type?: 'option' | 'sidePanel';
}
const Modal = ({
  isOpenModal,
  setIsOpenModal,
  type = 'option',
}: ModalProps) => {
  document.body.style.overflow = 'hidden'; // modal창이 열리면 스크롤 이벤트 막기
  const onClickModal = () => {
    setIsOpenModal(!isOpenModal);
    document.body.style.overflow = 'auto'; // 닫히면 스크롤 이벤트 다시 추가
  };
  return (
    <>
      <ModalBackGround onClick={onClickModal}></ModalBackGround>
      {type === 'option' ? (
        <OptionSelectModal onClick={onClickModal}></OptionSelectModal>
      ) : (
        <SidePanel onClick={onClickModal}></SidePanel>
      )}
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

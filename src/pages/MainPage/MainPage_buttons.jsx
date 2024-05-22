import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import CustomRow from '../../Components/Container/CustomRow';
import CustomColumn from '../../Components/Container/CustomColumn';
import { useAuth } from '../SubPage/AuthContext';
import React, { useState } from 'react';
import CustomFont from '../../Components/Container/CustomFont';
import StyledImg from '../../Components/Container/StyledImg';

const ButtonsContainer = styled.header`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  background-color: transparent;
`;

const Button = styled.button`
  background-color: ${props => props.backColor || 'white'};
  color: black;
  align-items: center;
  justify-content: center;
  border: 2px solid white;
  border-radius: 30px;
  width: 20rem;
  height: 7rem;
  padding: 20px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  cursor: pointer;
`;

const BuyModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 60%;
  height: 50vh;
  transform: translate(-50%, -50%);
  background-color: #ECFFE0;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1001; /* Modal이 항상 위에 오도록 설정 */
  background-image: url('Modal_img_1.png');
  background-size: cover;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* ModalOverlay가 BuyModal의 바로 아래에 오도록 설정 */
`;

const ModalContent = styled.div`
  background: transparent;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const ModalButton = styled.button`
  margin: 10px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: ${props => props.primary ? '#FFC7C7' : '#D9D9D9'};
  color: white;
`;

export default function Component() {
    const navigate = useNavigate();
    const { isLoggedIn } = useAuth(); // 로그인 상태 가져오기
    const [showModal, setShowModal] = useState(false);

    // 로그인 여부를 확인하는 함수
    const checkLoginAndNavigate = (path) => {
        if (isLoggedIn) {
            navigate(path);
        } else {
            setShowModal(true);
        }
    };

    const handleModalClose = () => {
        setShowModal(false);
    };

    return (
        <>
            <ButtonsContainer>
                <CustomColumn width='100%' alignItems='center' justifyContents='center' gap='2rem'>
                    <CustomRow width='100%' alignItems='center' justifyContents='center' gap='2rem'>
                        <Button backColor='#FFEBEB' onClick={() => checkLoginAndNavigate('/paper_sorry')}>사과문</Button>
                        <Button backColor='#ECFFE0' onClick={() => checkLoginAndNavigate('/paper_notice')}>보고서</Button>
                        <Button backColor='#FFF6E0' onClick={() => checkLoginAndNavigate('/paper_letter')}>편지</Button>
                    </CustomRow>
                    <CustomRow width='100%' alignItems='center' justifyContents='center' gap='2rem'>
                        <Button backColor='#DFF2FF' onClick={() => checkLoginAndNavigate('/paper_poster')}>광고/포스터</Button>
                        <Button backColor='#F4E5FF' onClick={() => checkLoginAndNavigate('/paper_job')}>이력서</Button>
                        <Button backColor='#EBEBEB' onClick={() => checkLoginAndNavigate('/paper_hire')}>모집/채용공고</Button>
                    </CustomRow>
                </CustomColumn>
            </ButtonsContainer>

            {showModal && (
                <ModalOverlay onClick={handleModalClose}>
                    <BuyModal onClick={(e) => e.stopPropagation()}>
                        <ModalContent>
                            <CustomColumn width='100%' alignItems='center' justifyContents='center' gap='0.5rem'>
                                <CustomFont color='black' font='1.5rem' fontWeight='bold'>로그인 후 모든 기능을 사용하실 수 있습니다!</CustomFont>
                                <StyledImg src={'icon_Boo_blush.png'} width='200px' height='200px' />
                                <CustomRow width='100%' alignItems='center' justifyContents='space-between' gap='8rem'>

                                    <ModalButton onClick={handleModalClose}>닫기</ModalButton>
                                    <ModalButton primary onClick={() => navigate('/loginpage')}>로그인</ModalButton>

                                </CustomRow>
                            </CustomColumn>
                        </ModalContent>
                    </BuyModal>
                </ModalOverlay>
            )}
        </>
    );
};

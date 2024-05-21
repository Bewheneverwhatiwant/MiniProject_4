import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import CustomColumn from '../Container/CustomColumn';
import { useAuth } from '../../pages/SubPage/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FooterContainer = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 10vh;
  background-color: #575757;
  color: white;
  gap: 10px;
`;

const Detail = styled.a`
  font-size: 10px;
  font-family: 'RIDIBatang';
  color: white;
`;

const Out = styled.button`
  background: transparent;
  border: none;
  font-size: 10px;
  font-family: 'RIDIBatang';
  color: white;
  text-decoration: underline;
  cursor: pointer;
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
  z-index: 1000;
`;

const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 40%;
  height: 30%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  z-index: 1001;
  background-image: url('Modal_img_3.png');
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: black;
  font-family: 'RIDIBatang';
`;

const ModalButton = styled.button`
  background-color: ${props => props.primary ? '#FF6347' : '#D3D3D3'};
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  margin: 10px;
  cursor: pointer;
  font-family: 'RIDIBatang';
`;

export default function Component() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({ username: '' });
    const [showModal, setShowModal] = useState(false);

    const { isLoggedIn, logout } = useAuth(); // useAuth를 이용하여 로그인 상태 가져오기

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_IP}/user_total_info`);
                const user = response.data.find(user => user.username === isLoggedIn);
                if (user) {
                    setUserData({ username: user.username });
                }
            } catch (error) {
                console.error('Failed to fetch user data', error);
            }
        };

        if (isLoggedIn) {
            fetchUserData();
        }
    }, [isLoggedIn]);

    // 로그인 여부를 확인하는 함수
    const checkLogin = () => {
        if (isLoggedIn) {
            setShowModal(true);
        } else {
            alert('로그인 후 모든 기능을 사용하실 수 있습니다!');
        }
    };

    const handleDeleteAccount = async () => {
        try {
            const response = await axios.delete(`${process.env.REACT_APP_SERVER_IP}/delete_user`, {
                params: { user_name: userData.username }
            });
            if (response.status === 200) {
                alert('회원 탈퇴가 완료되었습니다.');
                logout();
                navigate('/'); // 탈퇴 후 홈으로 이동
            }
        } catch (error) {
            console.error('Failed to delete user', error);
            alert('회원 탈퇴 중 오류가 발생했습니다.');
        }
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <FooterContainer>
            <CustomColumn width='100%' alignItems='center' gap='0.6rem'>
                <Detail>내 문서를 부탁해</Detail>
                <Out onClick={checkLogin}>서비스 탈퇴</Out>
            </CustomColumn>
            {showModal && (
                <ModalOverlay>
                    <ModalContainer>
                        <ModalContent>
                            <p>{userData.username}님, 정말 탈퇴하시겠습니까?</p>
                            <div>
                                <ModalButton primary onClick={handleDeleteAccount}>탈퇴하기</ModalButton>
                                <ModalButton onClick={closeModal}>취소</ModalButton>
                            </div>
                        </ModalContent>
                    </ModalContainer>
                </ModalOverlay>
            )}
        </FooterContainer>
    );
}

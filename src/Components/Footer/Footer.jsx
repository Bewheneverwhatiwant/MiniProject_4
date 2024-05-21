import React, { useState, useEffect } from 'react';
import { styled } from 'styled-components';
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

export default function Component() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({ username: '' });

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
    const checkLogin = async () => {
        if (isLoggedIn) {
            const confirmDelete = window.confirm(`${userData.username}님, 정말 탈퇴하시겠어요?`);
            if (confirmDelete) {
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
            }
        } else {
            alert('로그인 후 모든 기능을 사용하실 수 있습니다!');
        }
    };

    return (
        <FooterContainer>
            <CustomColumn width='100%' alignItems='center' gap='0.6rem'>
                <Detail>내 문서를 부탁해</Detail>
                <Out onClick={checkLogin}>서비스 탈퇴</Out>
            </CustomColumn>
        </FooterContainer>
    );
}

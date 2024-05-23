import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import StyledImg from '../Container/StyledImg';
import CustomRow from '../Container/CustomRow';
import { useAuth } from '../../pages/SubPage/AuthContext';
import CustomFont from '../Container/CustomFont';

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  height: 6vh;
  z-index: 99;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 10px;
  background-color: transparent;
`;

const HeaderButton = styled.button`
  background-color: transparent;
  font-size: 12px;
  color: #979797;
  text-align: center;
  justify-content: center;
  border: 2px solid #D9D9D9;
  border-radius: 30px;
  width: 90px;
  padding: 10px;
  cursor: pointer;
`;

const LogoButton = styled.button`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url('icon_boo_small.png');
  background-size: 100% 100%;
  border: none;
  width: 50px;
  height: 50px;
`;

const LogoutModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 60%;
  height: 50vh;
  transform: translate(-50%, -50%);
  background-color: #ECFFE0;
  padding: 20px;
  border-radius: 50px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1001;
  background-image: url('Modal_LogOut.png');
  background-size: 100% 100%;
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

export default function Header() {
    const { isLoggedIn, logout } = useAuth();
    const navigate = useNavigate();
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const Back = () => {
        navigate('/mainpage');
    };

    const Mypage = () => {
        navigate('/mypage');
    };

    const handleLogout = () => {
        setShowLogoutModal(true);
        setTimeout(() => {
            logout();
            setShowLogoutModal(false);
            navigate('/');
        }, 3000); // 3초 후 로그아웃 및 모달 닫기
    };

    return (
        <HeaderContainer>
            <CustomRow width='97%' justifyContent='center'>
                <CustomRow width='100%' justifyContent='space-between'>
                    {!isLoggedIn ? (
                        <>
                            {/* 로그인되지 않은 상태 */}
                        </>
                    ) : (
                        <>
                            <LogoButton onClick={Back} />
                            <CustomRow>
                                <HeaderButton onClick={Mypage}>
                                    <CustomFont color='#979797' font='1rem' fontWeight='bold'>
                                        My
                                    </CustomFont>
                                </HeaderButton>
                                <HeaderButton onClick={handleLogout}>
                                    <CustomFont color='#979797' font='1rem' fontWeight='bold'>
                                        Logout
                                    </CustomFont>
                                </HeaderButton>
                            </CustomRow>
                        </>
                    )}
                </CustomRow>
            </CustomRow>
            {showLogoutModal && (
                <>
                    <ModalOverlay />
                    <LogoutModal />
                </>
            )}
        </HeaderContainer>
    );
};

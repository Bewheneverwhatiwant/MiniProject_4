import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CustomColumn from '../../../../../Components/Container/CustomColumn';
import CustomFont from '../../../../../Components/Container/CustomFont';
import CustomRow from '../../../../../Components/Container/CustomRow';
import { useAuth } from '../../../AuthContext';

const InputForm = styled.input`
  display: flex;
  border: 1.5px solid #8CC63F;
  background-color: transparent;
  border-radius: 15px;
  width: 100%;
  height: 2rem;
  padding: 0.3rem;

  &::placeholder {
    color: #D9D9D9;
  }

  &:active {
    outline: none;
  }
`;

const PwdDiv = styled.div`
  background-color: #ECFFE0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  padding: 10px;
  width: 50%;
`;

const Button = styled.button`
  background-color: #FFC7C7;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border: none;
  border-radius: 10px;
  color: white;
  width: 20%;
`;

const Error = styled.div`
  color: red;
  font-size: 0.8rem;
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

export default function ChangePwModal_new({ email, userId, onClose, oldPassword }) {
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [doublepassword, setDoublepassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [doublePasswordError, setDoublePasswordError] = useState('');
    const [generalError, setGeneralError] = useState('');
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const { isLoggedIn, logout } = useAuth(); // useAuth를 이용하여 로그인 상태 가져오기

    const validatePassword = (password) => {
        const isLengthValid = password.length >= 6 && password.length <= 9;
        const hasSpecialCharAndNumber = /[!@#$%^&*(),.?":{}|<>]/.test(password) && /\d/.test(password);
        return isLengthValid && hasSpecialCharAndNumber;
    };

    useEffect(() => {
        if (password && !validatePassword(password)) {
            setPasswordError('비밀번호는 6자 이상 9자 이하, 특수문자와 숫자를 포함해야 합니다.');
        } else if (password === oldPassword) {
            setPasswordError('이전과 동일한 비밀번호는 사용하실 수 없습니다.');
        } else {
            setPasswordError('');
        }

        if (doublepassword && password !== doublepassword) {
            setDoublePasswordError('비밀번호가 일치하지 않습니다.');
        } else {
            setDoublePasswordError('');
        }
    }, [password, doublepassword, oldPassword]);

    const isFormFilled = password && doublepassword;

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleDoublepasswordChange = (e) => {
        setDoublepassword(e.target.value);
    };

    const handleChangePassword = async () => {
        if (!isFormFilled || password !== doublepassword) {
            setGeneralError('비밀번호가 일치하지 않거나 필수 필드가 비어 있습니다.');
            return;
        }

        try {
            const serverIp = process.env.REACT_APP_SERVER_IP;
            const response = await axios.put(`${serverIp}/change_password`, null, {
                params: {
                    new_password: password,
                    user_name: userId
                }
            });
            console.log('비밀번호 변경 응답:', response.data);
            alert('비밀번호 변경이 완료되었습니다! 다시 로그인해주세요.');
            handleLogout();
            onClose(); // ChangePwModal_new와 SignUpModal 모두 닫기
            navigate('/');
        } catch (error) {
            console.error('비밀번호 변경 오류:', error);
            setGeneralError('이전에 사용된 비밀번호로는 바꾸실 수 없습니다.');
        }
    };

    const handleLogout = () => {
        setShowLogoutModal(true);
        setTimeout(() => {
            logout();
            //setShowLogoutModal(false);
            navigate('/');
        }, 3000); // 3초 후 로그아웃 및 모달 닫기
    };


    return (
        <PwdDiv>
            <CustomColumn width='100%' alignItems='center' justifyContents='center'>
                <CustomFont color='black' font='1rem' fontWeight='bold'>비밀번호 변경하기</CustomFont>

                <CustomColumn width='80%'>
                    <CustomRow>
                        <CustomFont font='1rem' color='black'>새 비밀번호</CustomFont><CustomFont color='red' font='1rem'>*</CustomFont>
                    </CustomRow>
                    <InputForm type='password' placeholder='새로 사용하실 비밀번호를 입력하세요.' value={password} onChange={handlePasswordChange} />
                    {!password && <Error>필수 필드입니다.</Error>}
                    {passwordError && <Error>{passwordError}</Error>}
                </CustomColumn>

                <CustomColumn width='80%'>
                    <CustomRow>
                        <CustomFont font='1rem' color='black'>새 비밀번호 확인</CustomFont><CustomFont color='red' font='1rem'>*</CustomFont>
                    </CustomRow>
                    <InputForm type='password' placeholder='비밀번호를 한번 더 입력하세요.' value={doublepassword} onChange={handleDoublepasswordChange} />
                    {!doublepassword && <Error>필수 필드입니다.</Error>}
                    {doublePasswordError && <Error>{doublePasswordError}</Error>}
                </CustomColumn>

                <CustomRow width='100%' justifyContents='flex-end' alignItems='center'>
                    <Button onClick={handleChangePassword}>확인</Button>
                </CustomRow>

                {generalError && <Error>{generalError}</Error>}
            </CustomColumn>

            {showLogoutModal && (
                <>
                    <ModalOverlay />
                    <LogoutModal />
                </>
            )}
        </PwdDiv>
    );
}

import styled, { keyframes } from 'styled-components';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CustomColumn from '../../../../Components/Container/CustomColumn';
import CustomFont from '../../../../Components/Container/CustomFont';
import CustomRow from '../../../../Components/Container/CustomRow';

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
  margin-top: 0.5rem;
`;

const BuyModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 50%;
  height: 60vh;
  transform: translate(-50%, -50%);
  background-color: #ECFFE0;
  padding: 20px;
  border-radius: 50px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1001;
  background-image: url('Modal_PwChanged_back.png');
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

const moveAndRotate = keyframes`
  0% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(180deg);
  }
  100% {
    transform: translateY(0) rotate(360deg);
  }
`;

const StyledImg_sparkle = styled.img`
  position: fixed;
  top: 70px;
  left: 40px;
  width: ${props => props.width};
  height: ${props => props.height};
  animation: ${moveAndRotate} 1s linear infinite;
`;

const StyledImg_sparkle2 = styled.img`
  position: fixed;
  top: 120px;
  left: 100px;
  width: ${props => props.width};
  height: ${props => props.height};
  animation: ${moveAndRotate} 1s linear infinite;
`;

export default function ChangePwModal_new({ email, userId, onClose, oldPassword }) {
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [doublepassword, setDoublepassword] = useState('');
    const [error, setError] = useState('');
    const [pwChangeSuccess, setPwChangeSuccess] = useState(false);

    useEffect(() => {
        if (password && !validatePassword(password)) {
            setError('비밀번호는 6자 이상 9자 이하, 특수문자와 숫자를 포함해야 합니다.');
            return;
        }

        if (password === oldPassword) {
            setError('이전과 동일한 비밀번호는 사용하실 수 없습니다.');
            return;
        }

        if (password && doublepassword && password !== doublepassword) {
            setError('비밀번호가 일치하지 않습니다.');
            return;
        }

        setError('');
    }, [password, doublepassword, oldPassword]);

    const isFormFilled = password && doublepassword;

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleDoublepasswordChange = (e) => {
        setDoublepassword(e.target.value);
    };

    const validatePassword = (password) => {
        const isLengthValid = password.length >= 6 && password.length <= 9;
        const hasSpecialCharAndNumber = /[!@#$%^&*(),.?":{}|<>]/.test(password) && /\d/.test(password);
        return isLengthValid && hasSpecialCharAndNumber;
    };

    const handleChangePassword = async () => {
        if (error) {
            return;
        }

        if (!isFormFilled) {
            setError('모든 필드를 입력해 주세요.');
            return;
        }

        try {
            const serverIp = process.env.REACT_APP_SERVER_IP;
            const response = await axios.post(`${serverIp}/change_password`, null, {
                params: {
                    new_password: password,
                    user_name: userId
                }
            });
            console.log('비밀번호 변경 응답:', response.data);
            setPwChangeSuccess(true);
            setTimeout(() => {
                setPwChangeSuccess(false);
                onClose();
                navigate('/');
            }, 3000);
        } catch (error) {
            console.error('비밀번호 변경 오류:', error);
            setError('이전에 사용하신 비밀번호로는 변경하실 수 없습니다..');
        }
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
                    {password && <Error>{error}</Error>}
                </CustomColumn>

                <CustomColumn width='80%'>
                    <CustomRow>
                        <CustomFont font='1rem' color='black'>새 비밀번호 확인</CustomFont><CustomFont color='red' font='1rem'>*</CustomFont>
                    </CustomRow>
                    <InputForm type='password' placeholder='비밀번호를 한번 더 입력하세요.' value={doublepassword} onChange={handleDoublepasswordChange} />
                    {doublepassword && <Error>{error}</Error>}
                </CustomColumn>

                <CustomRow width='100%' justifyContents='flex-end' alignItems='center'>
                    <Button onClick={handleChangePassword}>확인</Button>
                </CustomRow>

                {pwChangeSuccess && (
                    <>
                        <ModalOverlay />
                        <BuyModal>
                            <StyledImg_sparkle src={'icon_sparkle.png'} width='100px' height='100px' />
                            <StyledImg_sparkle2 src={'icon_sparkle.png'} width='100px' height='100px' />
                        </BuyModal>
                    </>
                )}
            </CustomColumn>
        </PwdDiv>
    );
};

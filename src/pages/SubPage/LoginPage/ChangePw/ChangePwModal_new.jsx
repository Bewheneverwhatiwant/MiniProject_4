import styled from 'styled-components';
import React, { useState } from 'react';
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
  background-image: url('Modal_PwChanged.png');
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

export default function ChangePwModal_new({ email, userId, onClose }) {
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [doublepassword, setDoublepassword] = useState('');
    const [error, setError] = useState('');
    const [pwChangeSuccess, setPwChangeSuccess] = useState(false); // 비밀번호 변경 성공 모달 상태

    const isFormFilled = password && doublepassword;

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleDoublepasswordChange = (e) => {
        setDoublepassword(e.target.value);
    };

    const handleChangePassword = async () => {
        if (!isFormFilled || password !== doublepassword) {
            setError('비밀번호가 일치하지 않거나 필수 필드가 비어 있습니다.');
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
            setPwChangeSuccess(true); // 비밀번호 변경 성공 모달 표시
            setTimeout(() => {
                setPwChangeSuccess(false); // 3초 후 모달 닫기
                onClose(); // ChangePwModal_new와 SignUpModal 모두 닫기
                navigate('/');
            }, 3000);
        } catch (error) {
            console.error('비밀번호 변경 오류:', error);
            setError('비밀번호 변경에 실패했습니다.');
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
                    {!password && <Error>필수 필드입니다.</Error>}
                </CustomColumn>

                <CustomColumn width='80%'>
                    <CustomRow>
                        <CustomFont font='1rem' color='black'>새 비밀번호 확인</CustomFont><CustomFont color='red' font='1rem'>*</CustomFont>
                    </CustomRow>
                    <InputForm type='password' placeholder='비밀번호를 한번 더 입력하세요.' value={doublepassword} onChange={handleDoublepasswordChange} />
                    {!doublepassword && <Error>필수 필드입니다.</Error>}
                </CustomColumn>

                {error && <Error>{error}</Error>}

                <CustomRow width='100%' justifyContents='flex-end' alignItems='center'>
                    <Button onClick={handleChangePassword}>확인</Button>
                </CustomRow>

                {pwChangeSuccess && (
                    <>
                        <ModalOverlay />
                        <BuyModal />
                    </>
                )}
            </CustomColumn>
        </PwdDiv>
    );
};

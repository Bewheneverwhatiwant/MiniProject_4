import styled, { keyframes } from 'styled-components';
import CustomColumn from '../../../../../Components/Container/CustomColumn';
import CustomFont from '../../../../../Components/Container/CustomFont';
import CustomRow from '../../../../../Components/Container/CustomRow';
import StyledImg from '../../../../../Components/Container/StyledImg';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
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

export default function SignUpModal() {

    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [doublepassword, setDoublepassword] = useState('');
    const isFormFilled = password && doublepassword;
    const { isLoggedIn, logout } = useAuth(); // 로그인 정보 불러오기

    const Changed = () => {
        if (isFormFilled) {
            alert('비밀번호 변경이 완료되었습니다! 다시 로그인해주세요.');
            logout();
            navigate('/');
        }
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleDoublepasswordChange = (e) => {
        setDoublepassword(e.target.value);
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

                <CustomRow width='100%' justifyContents='flex-end' alignItems='center'>
                    <Button onClick={Changed}>확인</Button>
                </CustomRow>
            </CustomColumn>
        </PwdDiv>
    );
};

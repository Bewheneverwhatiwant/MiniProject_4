import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import StyledImg from '../Container/StyledImg';
import CustomRow from '../Container/CustomRow';

const HeaderContainer = styled.header`
position: fixed;
top: 0;
width: 100%;
z-index: 99;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 10px;

    background-color: white;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
`;

const HeaderButton = styled.button`
background-color: transparent;
font-size: 12px;
color: #979797;
text-align: center;
justify-content: center;

border: 2px solid #D9D9D9;
border-radius: 10px;
width: 80px;
padding: 10px;
`;

export default function Header() {

    const navigate = useNavigate();

    const Back = () => {
        navigate('/');
    }

    const Signup = () => {
        navigate('/signup');
    }

    const Login = () => {
        navigate('/login');
    }

    return (

        <HeaderContainer>
            <CustomRow width='97%' justifyContent='space-between'>
                <StyledImg src={'icon_logo.png'} width='100px' height='40px' onClick={Back} />
                <CustomRow width='10%' justifyContent='center'>
                    <HeaderButton onClick={Login}>로그인</HeaderButton>
                    <HeaderButton onClick={Signup}>회원가입</HeaderButton>
                </CustomRow>
            </CustomRow>
        </HeaderContainer>

    );
};
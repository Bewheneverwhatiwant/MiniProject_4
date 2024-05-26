import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../SubPage/AuthContext';

import CustomFont from '../../../Components/Container/CustomFont';
import CustomColumn from '../../../Components/Container/CustomColumn';
import CustomRow from '../../../Components/Container/CustomRow';
import StyledImg from '../../../Components/Container/StyledImg';

const ContainerCenter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 100%;
`;

const PageContainer = styled(ContainerCenter)`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-top: 8vh;
  padding-bottom: 5vh;
  gap: 20px;
  position: relative;
  background-color: white;
`;

export default function Component() {

    const { isLoggedIn } = useAuth(); // useAuth 훅에서 로그인 상태와 유저 정보를 가져옴
    const [userData, setUserData] = useState({ username: '', free_tickets: 0, paid_tickets: 0 });

    const navigate = useNavigate();

    return (
        <ContainerCenter>
            <PageContainer>
                <CustomColumn width='80%' justifyContent='center' alignItems='center' gap='2rem'>

                    <CustomFont color='black'>문서 구경 페이지</CustomFont>

                </CustomColumn>
            </PageContainer>
        </ContainerCenter>
    );
};

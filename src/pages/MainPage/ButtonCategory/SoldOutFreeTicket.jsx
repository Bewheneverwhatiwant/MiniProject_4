import styled from 'styled-components';
import CustomFont from '../../../Components/Container/CustomFont'; // <- 폰트 디자인 가능한 파일
import CustomColumn from '../../../Components/Container/CustomColumn'; // <- 세로정렬
import CustomRow from '../../../Components/Container/CustomRow'; // <- 가로 정렬
import StyledImg from '../../../Components/Container/StyledImg'; // <- 이미지 디자인 가능

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../SubPage/AuthContext';
import { useNavigate } from 'react-router-dom';

const ContainerCenter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 100%;
`;

const PageContainer = styled(ContainerCenter)`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 8vh;
  padding-bottom: 5vh;
  gap: 20px;
  position: relative;
  background-color: white;
  min-height: 100vh;
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

const Button1 = styled.button`
  background-color: #FFEBEB;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  padding: 20px;
  border: none;
  border-radius: 20px;
  width: 40%;
  height: 100px;
`;

const Button2 = styled.button`
  background-color: #C1EEA5;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  padding: 20px;
  border: none;
  border-radius: 20px;
  width: 40%;
  height: 100px;
`;

export default function SoldOutFreeTicket({ onClose }) {
    const { isLoggedIn } = useAuth(); // useAuth 훅에서 로그인 상태와 유저 정보를 가져옴
    const [userData, setUserData] = useState({ username: '', free_tickets: 0, paid_tickets: 0 });

    const navigate = useNavigate();

    const Buy = () => {
        navigate('/buyticketpage');
    }

    // !!수정 금지!!
    // 유저 보유 유/무료 티켓을 가져오기 위함
    useEffect(() => {
        const fetchUserData = async () => {
            if (isLoggedIn) {
                try {
                    console.log('사용자 데이터 불러오는 중...');
                    const response = await axios.get(`${process.env.REACT_APP_SERVER_IP}/user_total_info`);
                    console.log(response.data);
                    const userData = response.data.find(u => u.username === isLoggedIn);
                    if (userData) {
                        setUserData({
                            username: userData.username,
                            free_tickets: userData.free_tickets,
                            paid_tickets: userData.paid_tickets
                        });
                        console.log(userData);
                    }
                } catch (error) {
                    console.error(error);
                }
            } else {
                console.log('User is not logged in or user data is not available.');
            }
        };

        fetchUserData();
    }, [isLoggedIn]);

    const useTicket = async () => {
        if (userData.free_tickets >= 1) {
            // 무료 티켓 사용
            try {
                const response = await axios.post(`${process.env.REACT_APP_SERVER_IP}/update_free_user_tickets`, null, {
                    params: { user_name: userData.username, usedFreeTicketCount: 1 }
                });

                console.log('Updated free tickets:', response.data);
                alert('완료되었습니다. 다시 생성을 진행하세요.');

            } catch (error) {
                console.error(error);
                alert('티켓 사용 중 오류가 발생했습니다.');
            }
        } else {
            // 무료 티켓이 없는 경우
            const usePaidTicket = window.confirm('보유 티켓이 없습니다. 유료 티켓을 사용하시겠습니까?');
            if (usePaidTicket) {
                if (userData.paid_tickets >= 1) {
                    // 유료 티켓 사용
                    try {
                        const response = await axios.post(`${process.env.REACT_APP_SERVER_IP}/update_user_paid_tickets`, null, {
                            params: { user_name: userData.username, usedPaidTicketCount: 1 }
                        });

                        console.log('Updated paid tickets:', response.data);
                        alert('완료되었습니다. 다시 생성을 진행하세요.');

                    } catch (error) {
                        console.error(error);
                        alert('유료 티켓 사용 중 오류가 발생했습니다.');
                    }
                } else {
                    // 유료 티켓도 없는 경우
                    alert('보유한 유료 티켓이 없습니다. 구매 화면으로 이동합니다.');
                    navigate('/buyticketpage');
                }
            }
        }
    };

    return (
        <ModalOverlay onClick={onClose}>
            <BuyModal onClick={(e) => e.stopPropagation()}>
                <CustomColumn width='100%' alignItems='center' justifyContent='center' gap='2rem'>
                    <CustomRow width='100%' alignItems='center' justifyContent='space-around'>
                        <StyledImg src={'icon_boo_glass.png'} width='200px' height='230px' />
                        <CustomFont color='black' fontWeight='bold' font='1.5rem'>이런, 오늘의 무료 티켓을 모두 썼어요!</CustomFont>
                    </CustomRow>

                    <CustomRow width='100%' height='50%' alignItems='center' justifyContent='space-around'>
                        <Button1 onClick={useTicket}>
                            <StyledImg src={'icon_pinkCard.png'} width='80px' height='60px' />
                            <CustomFont color='black' font='1rem'>
                                보유 티켓 사용하기
                            </CustomFont>
                        </Button1>
                        <Button2 onClick={Buy}>
                            <StyledImg src={'icon_greenCard.png'} width='80px' height='60px' />
                            <CustomFont color='black' font='1rem'>
                                티켓 구매하러 가기
                            </CustomFont>
                        </Button2>
                    </CustomRow>
                </CustomColumn>
            </BuyModal>
        </ModalOverlay>
    );
};

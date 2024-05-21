import styled from 'styled-components';
import CustomFont from '../../../../../../Components/Container/CustomFont';
import CustomColumn from '../../../../../../Components/Container/CustomColumn';
import CustomRow from '../../../../../../Components/Container/CustomRow';
import StyledImg from '../../../../../../Components/Container/StyledImg';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../../../AuthContext';
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

const Divider = styled.div`
  height: 1px;
  width: 100%;
  background-color: white;
`;

const BuyModal = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    width: 50vh;
    height: 30vh;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const RealBuyButton = styled.button`
width: 100px;
padding: 10px;
background-color: #C1EEA580;
border: none;
border-radius: 20px;
display: flex;
align-items: center;
justify-content: center;
`;

const TicketDiv = styled.div`
display: flex;
flex-direction: row;
align-items: center;
justify-content: space-between;
border-radius: 20px;
background-color: rgba(193, 238, 165, 0.5);
border: none;
width: 100%;
height: 100px;
`;

const PM = styled.button`
display: flex;
justify-content: center;
align-items: center;
border: none;
background-color: white;
border-radius: 10px;
width: 40px;
height: 40px;
color: #8CC63F;
`;

export default function Component() {
    const [ticketCount, setTicketCount] = useState(1); // 초기값 및 최소값 1
    const [totalPrice, setTotalPrice] = useState(500); // 초기 총 가격 500원

    useEffect(() => {
        setTotalPrice(ticketCount * 500); // ticketCount가 변경될 때마다 총 가격을 업데이트
    }, [ticketCount]);

    const incrementCount = () => {
        setTicketCount(ticketCount + 1);
    };

    const decrementCount = () => {
        if (ticketCount > 1) {
            setTicketCount(ticketCount - 1);
        }
    };

    // 매일 5번 무려 질문 가능한, 24시간 단위 갱신되는 티켓 개수
    const [remainingFreeQuestions, setRemainingFreeQuestions] = useState(null); // 초기값을 null로 설정
    const { isLoggedIn } = useAuth(); // useAuth 훅에서 로그인 상태와 유저 정보를 가져옴
    // 닉네임, 보유 무료티켓(매일 5개 무료 x, 이벤트 등 보유하고 있는 무료 티켓 o), 보유 유료티켓
    const [userData, setUserData] = useState({ username: '', free_tickets: 0, paid_tickets: 0 });
    const [isRealBuy, setIsRealBuy] = useState(false); // 결제하기 모달에서 확인 버튼 클릭 시
    const [isBuying, setIsBuying] = useState(false);

    const navigate = useNavigate();

    const BuyFalse = () => {
        setIsBuying(false);
    }

    const RealBuyTrue = () => {
        setIsBuying(false);
        setIsRealBuy(true);
    }

    const finalBuy = () => {
        setIsRealBuy(false);
        navigate('/');
    }

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

    // 당일 무료 티켓 반환 및 업데이트 API 호출
    useEffect(() => {
        const fetchRemainingFreeQuestions = async () => {
            if (isLoggedIn && userData.username) {
                try {
                    console.log('무료 티켓 개수 불러오는 중');
                    const response = await axios.get(`${process.env.REACT_APP_SERVER_IP}/today_free_ask`, {
                        params: { user_name: userData.username }
                    });
                    console.log('남은 무료 티켓 개수는:', response.data);
                    setRemainingFreeQuestions(response.data); // 응답 데이터를 직접 설정
                    console.log('업데이트한 남은 무료 티켓 개수는:', response.data);
                } catch (error) {
                    console.error(error);
                }
            } else {
                console.log('User is not logged in or username is not available.');
            }
        };

        fetchRemainingFreeQuestions();
    }, [isLoggedIn, userData]);

    const paidTickets = userData.paid_tickets; // 사용자 보유 유료 티켓
    const freeTickets = userData.free_tickets // 사용자 보유 무료 티켓

    return (
        <ContainerCenter>
            <PageContainer>
                <CustomColumn width='80%' justifyContent='center' alignItems='center' gap='2rem'>

                    <CustomColumn width='100%' justifyContent='center' alignItems='center' >
                        <CustomRow width='100%' justifyContent='flex-start' alignItems='center'>
                            <CustomFont font='1.5rem' color='black'>구매하실 티켓의 수량을 선택해주세요.</CustomFont>
                        </CustomRow>

                        <TicketDiv>
                            <CustomRow width='20%' alignItems='center' justifyContent='space-around'>
                                <StyledImg src={'icon_ticket.png'} width='100px' height='60' />
                                <CustomFont font='1rem' color='#8CC63F' fontWeight='bold'>유료티켓</CustomFont>
                            </CustomRow>

                            <CustomRow width='20%' alignItems='center' justifyContent='space-around'>
                                <PM onClick={decrementCount}>
                                    <CustomFont color='#8CC63F' font='1rem' fontWeight='bold'>
                                        -
                                    </CustomFont>
                                </PM>
                                <CustomFont color='#8CC63F' font='1rem' fontWeight='bold'>{ticketCount}</CustomFont>
                                <PM onClick={incrementCount}>
                                    <CustomFont color='#8CC63F' font='1rem' fontWeight='bold'>
                                        +
                                    </CustomFont>
                                </PM>
                            </CustomRow>
                        </TicketDiv>

                        <CustomRow width='100%' justifyContent='flex-start' alignItems='center'>
                            <CustomFont font='1.5rem' color='black'>결제하실 가격을 확인해주세요.</CustomFont>
                        </CustomRow>

                        <TicketDiv>
                            <CustomRow width='95%' alignItems='center' justifyContent='flex-end'>
                                <CustomFont font='1rem' color='#8CC63F' fontWeight='bold'>
                                    500원 X {ticketCount} = {totalPrice}원
                                </CustomFont>
                            </CustomRow>
                        </TicketDiv>

                        <CustomRow width='80%' justifyContent='flex-end' alignItems='center' gap='0.5rem'>
                            <RealBuyButton onClick={RealBuyTrue}>
                                <CustomFont color='#8CC63F' font='1rem' fontWeight='bold'> 결제하기</CustomFont>
                            </RealBuyButton>
                            <RealBuyButton onClick={BuyFalse}>
                                <CustomFont color='#8CC63F' font='1rem' fontWeight='bold'>취소</CustomFont>
                            </RealBuyButton>
                        </CustomRow>

                    </CustomColumn>

                    {
                        isRealBuy && (
                            <BuyModal>
                                <CustomColumn width='100%' justifyContent='center' alignItems='center' >
                                    <CustomFont font='1rem' color='black'>결제가 완료되었습니다!</CustomFont>

                                    <CustomRow>
                                        <CustomFont color='black' fontWeight='bold' font='1rem'>오늘 남은 무료 질문 횟수</CustomFont>
                                        <CustomFont color='#8CC63F' fontWeight='bold' font='1rem'>
                                            {remainingFreeQuestions !== null ? `(${remainingFreeQuestions}/5)` : 'Loading...'}
                                        </CustomFont>
                                    </CustomRow>

                                    <CustomRow width='90%' justifyContent='space-between' alignItems='center'>
                                        <CustomFont color='#8CC63F' font='1rem'>내 보유 유료 티켓</CustomFont>
                                        <CustomFont color='#8CC63F' fontWeight='bold' font='1rem'>{paidTickets}장</CustomFont>
                                    </CustomRow>

                                    <Divider />

                                    <CustomRow width='90%' justifyContent='space-between' alignItems='center'>
                                        <CustomFont color='#8CC63F' font='1rem'>내 보유 무료 티켓</CustomFont>
                                        <CustomFont color='#8CC63F' fontWeight='bold' font='1rem'>{freeTickets}장</CustomFont>
                                    </CustomRow>

                                    <RealBuyButton onClick={finalBuy}>확인</RealBuyButton>
                                </CustomColumn>
                            </BuyModal>
                        )
                    }

                </CustomColumn>
            </PageContainer>
        </ContainerCenter>
    );
};

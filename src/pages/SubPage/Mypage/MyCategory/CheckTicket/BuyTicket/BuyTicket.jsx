import styled, { keyframes, css } from 'styled-components';
import CustomFont from '../../../../../../Components/Container/CustomFont';
import CustomColumn from '../../../../../../Components/Container/CustomColumn';
import CustomRow from '../../../../../../Components/Container/CustomRow';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../../../AuthContext';
import { useNavigate } from 'react-router-dom';
import CardCarousel from './CardCarousel';
import CustomModal from '../../../../../../Components/Container/CustomModal';
import StyledImg from '../../../../../../Components/Container/StyledImg';

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
    width: 60%;
    height: 60vh;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 100px 50px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    justify-content: center; 
    align-items: center; 
    z-index: 1001;
`;

const BarcordModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 60%;
  height: 50vh;
  transform: translate(-50%, -50%);
  background-color: #ECFFE0;
  border-radius: 50px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1001;
  background-image: url('Modal_barcord_back.png');
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
  z-index: 900;
`;

const RealBuyButton = styled.button`
    width: 120px;
    height: 50px;
    padding: 10px;
    background-color: ${({ disabled }) => disabled ? '#D9D9D9' : '#8CC63F'};
    border: ${({ border }) => border || 'none'};
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    margin-bottom: ${({ marginBottom }) => marginBottom || 'none'};

`;

const PM = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid #8CC63F;
    background-color: white;
    border-radius: 10px;
    width: 35px;
    height: 35px;
    color: #8CC63F;
    cursor: pointer;
`;

const CustomBox = styled.div`
    width: 700px;
    height: 300px;
    background-image: ${({ backgroundImage }) => backgroundImage || 'none'};
    background-size: cover;
    background-position: center;
    display: block;
    justify-content: flex-start;
    align-items: flex-start;
    position: relative;
    margin-bottom: 30px;
`;

const CustomText = styled.div`
    font-size: 1.2rem;
    color: #67A1BB;
    line-height: 2;
    text-align: left;
    margin-left: 60px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90%;
`;

const InputForm = styled.input`
    display: flex;
    border: 1.5px solid #A9A9A9;
    background-color: white;
    color: #A9A9A9;
    border-radius: 12px;
    width: 100%;
    height: 3rem;
    padding-left: 0.6rem;

    &::placeholder {
        color: #D9D9D9;
    }

    &:active {
    outline: none;  // 클릭 시 기본적으로 적용되는 아웃라인 제거
    }
`;

const AgreementCheckbox = styled.input.attrs({ type: 'checkbox' })`
  width: 20px;
  height: 20px;
  margin-right: 10px;
  cursor: pointer;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 60px;
  height: 60px;
  margin-bottom: -32px;
`;

const bounceAnimation = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const OverlappingImage = styled(StyledImg)`
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  ${props => props.isValid && css`
    animation: ${bounceAnimation} 0.5s ease-in-out infinite;
  `}
`;

const tiltAnimation = keyframes`
  0%, 100% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(10px);
  }
`;

const bounceAnimation_2 = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(20px);
  }
`;

const BarcordReader = styled.img`
  position: absolute;
  top: 200px;
  right: 300px;
  animation: ${tiltAnimation} 1s infinite;
  width: 100px;
  height: 100px;
`;

const TicketIcon = styled.img`
  position: absolute;
  bottom: 60px;
  left: 500px;
  animation: ${bounceAnimation_2} 1s infinite;
  width: 100px;
  height: 100px;
`;

export default function Component() {
    const [ticketCount, setTicketCount] = useState(1); // 초기값 및 최소값 1
    const [totalPrice, setTotalPrice] = useState(500); // 초기 총 가격 500원
    const [isChecked, setIsChecked] = useState(false); // 체크박스 상태
    const [barcord, setBarcord] = useState(false); // 결제 중입니다... 모달 창 상태

    // 체크박스 상태를 실시간으로 추적하여 결제 버튼 활성화
    useEffect(() => {
        // 여기서 상태 변경에 따라 버튼 활성화가 즉시 반영됨
    }, [isChecked]);


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

    const handleCheckboxChange = (e) => {
        setIsChecked(e.target.checked); // 체크박스 상태 업데이트
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

    const BuyTrue = () => {
        setIsBuying(true);
    }

    const BarcordTrue = () => {
        setBarcord(true);
    }

    const BarcordFalse = () => {
        setBarcord(false);
    }

    const finalBuy = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_SERVER_IP}/save_payment`, null, {
                params: {
                    user_name: userData.username,
                    tickets: ticketCount,
                    price: totalPrice,
                }
            });

            console.log('Payment Response:', response.data);
            console.log('Sent Data:', {
                user_name: userData.username,
                tickets: ticketCount,
                price: totalPrice,
            });

            // 티켓 개수 업데이트
            setUserData(prevUserData => ({
                ...prevUserData,
                paid_tickets: prevUserData.paid_tickets + ticketCount
            }));

            setIsBuying(false);
            setIsRealBuy(true);
        } catch (error) {
            console.error('Payment Error:', error);
        }
    };

    const handleRegisterClick = () => {
        setBarcord(true);
        setTimeout(() => {
            setBarcord(false);
            finalBuy();
            setIsRealBuy(true);
        }, 10000); // 나중에 4초로 다시 바꾸기
    };

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
                {/* 티켓 구매 안내 페이지 시작 */}
                <CustomColumn width='80%' justifyContent='center' alignItems='center' gap='2rem'>
                    <CustomColumn width='100%' justifyContent='center' alignItems='center' >
                        <CustomFont font='2.5rem' fontWeight='8px' color='black' textAlign='center' marginBottom='20px' className="bmjua-text">
                            티켓 구매 안내
                        </CustomFont>
                        <CustomBox backgroundImage="url('TicketBg.png')">
                            <CustomText>
                                무료티켓은 매일 5장씩 제공되고 있습니다.<br />
                                내 티켓 확인 후, 부족한 경우 구매해주세요.<br />
                                유료티켓은 한 장당 500원입니다.<br />
                                수량을 선택하셨다면 결제하기 버튼을 눌러 <br />다음 단계를 진행해주세요.
                            </CustomText>
                        </CustomBox>

                        <CustomRow width='52%' justifyContent='space-between' alignItems='center' marginTop='20px'>
                            <CustomFont font='1.5rem' color='black'>구매하실 티켓의 수량</CustomFont>

                            <CustomRow width='auto' alignItems='center' justifyContent='space-around'>
                                <PM onClick={decrementCount}>
                                    <CustomFont color='#8CC63F' font='1.5rem' fontWeight='bold'>
                                        -
                                    </CustomFont>
                                </PM>
                                <CustomFont color='#8CC63F' font='1.5rem' fontWeight='bold' margin='0 10px'>{ticketCount}</CustomFont>
                                <PM onClick={incrementCount}>
                                    <CustomFont color='#8CC63F' font='1.5rem' fontWeight='bold'>
                                        +
                                    </CustomFont>
                                </PM>
                            </CustomRow>

                        </CustomRow>

                        <CustomRow width='52%' justifyContent='space-between' alignItems='center' marginTop='20px'>
                            <CustomRow width='100%' justifyContent='space-between' alignItems='center' marginTop='10px'>
                                <CustomFont font='1.5rem' color='black' margin='0 10px 0 0'>결제하실 가격</CustomFont>
                                <CustomFont font='1.5rem' color='black'>
                                    500원 X {ticketCount} =
                                    <CustomFont font='1.5rem' color='#8CC63F'> {totalPrice}원</CustomFont>
                                </CustomFont>
                            </CustomRow>
                        </CustomRow>

                        <CustomColumn width='100%' justifyContent='center' alignItems='center' marginTop='20px'>
                            <CustomRow width='52%' justifyContent='flex-end' alignItems='center' marginTop='20px'>
                                <AgreementCheckbox id="agreement" onChange={handleCheckboxChange} />
                                <label htmlFor="agreement">
                                    <CustomFont color='black' font='1rem' fontWeight='bold'>
                                        '내 문서를 부탁해'의 전자상거래 약관에 동의합니다.
                                    </CustomFont>
                                </label>
                            </CustomRow>
                            <CustomRow width='52%' justifyContent='flex-end' alignItems='center' marginTop='20px'>
                                <CustomColumn width='30%' alignItems='center' justifyContent='center' gap='1px'>
                                    <ImageWrapper>
                                        <OverlappingImage src={'icon_boo_small.png'} width='60px' height='60px' isValid={isChecked} />
                                    </ImageWrapper>
                                    <RealBuyButton onClick={BuyTrue} disabled={!isChecked}>
                                        <CustomFont color='#FFFFFF' font='1.5rem' fontWeight='bold'> 결제하기</CustomFont>
                                    </RealBuyButton>
                                </CustomColumn>

                            </CustomRow>
                        </CustomColumn>

                    </CustomColumn>
                    {/* 티켓 안내 페이지 끝 */}

                    {/* 결제(카드 등록) 페이지 시작*/}
                    {
                        isBuying && (
                            <>
                                <ModalOverlay />
                                <CustomModal width='40%' padding='20px' onClose={BuyFalse}>

                                    <CustomColumn width='100%' justifyContent='center' alignItems='center'>

                                        <CustomFont font='1.8rem' fontWeight='500' color='black' className="bmjua-text">결제 수단을 등록하세요.</CustomFont>
                                        <CardCarousel />
                                        <CustomColumn width='100%' justifyContent='center' alignItems='center' gap='1rem'>
                                            <CustomColumn width='55%' justifyContent='center' alignItems='flex-start' gap='1rem'>
                                                <InputForm placeholder='CARD NUMBER' />
                                            </CustomColumn>

                                            <CustomColumn width='55%' justifyContent='center' alignItems='flex-start' gap='1rem'>
                                                <InputForm placeholder='CARDHOLDER NAME' />
                                            </CustomColumn>

                                            <CustomRow width='55%' justifyContent='center' alignItems='center' gap='1rem'>

                                                <InputForm type='' placeholder='MM' />
                                                <InputForm type='' placeholder='YY' />
                                                <InputForm type='' placeholder='CVV' />
                                            </CustomRow>

                                            <CustomRow width='100%' justifyContent='center' alignItems='center' gap='1rem'>
                                                <RealBuyButton marginBottom='30px' onClick={handleRegisterClick}>
                                                    <CustomFont color='#FFFFFF' font='1.2rem' fontWeight='400'>REGISTER</CustomFont>
                                                </RealBuyButton>

                                                <RealBuyButton marginBottom='30px' border='2px solid #8CC63F' backgroundColor='white' onClick={BuyFalse}>
                                                    <CustomFont color='#FFFFFF' font='1.2rem' fontWeight='400'>CANCEL</CustomFont>
                                                </RealBuyButton>
                                            </CustomRow>
                                        </CustomColumn>
                                    </CustomColumn>
                                </CustomModal>
                            </>
                        )
                    }

                    {
                        barcord && (
                            <>
                                <ModalOverlay />
                                <BarcordModal>
                                    <BarcordReader src='icon_barcordReader.png' />
                                    <TicketIcon src='icon_ticket.png' />

                                    <CustomColumn width='100%' height='100%' alignItems='center' justifyContent='flex-end' gap='1rem'>
                                        <CustomRow width='100%' height='100%' alignItems='flex-start' justifyContent='center'>
                                            <CustomFont color='white' font='1.5rem' fontWeight='bold'>결제 중입니다...</CustomFont>
                                        </CustomRow>
                                        <StyledImg src={'icon_booAndCart.png'} width='600px' height='300px' />
                                    </CustomColumn>
                                </BarcordModal>
                            </>
                        )
                    }

                    {
                        isRealBuy && (
                            // 1열
                            <>
                                <ModalOverlay />
                                <BuyModal>
                                    <CustomRow width='100%' height='100%' justifyContent='space-between' alignItems='center'>
                                        <CustomColumn width='50%' justifyContent='flex-end' alignItems='flex-end' textAlign='right'>
                                            <CustomFont font='3rem' color='black' >결제가</CustomFont>
                                            <CustomFont font='3rem' color='black' >완료되었습니다!</CustomFont>
                                            <CustomRow>
                                                <CustomFont color='black' fontWeight='bold' font='1rem'>오늘 남은 무료 질문 횟수</CustomFont>
                                                <CustomFont color='#8CC63F' fontWeight='bold' font='1rem'>
                                                    {remainingFreeQuestions !== null ? `(${remainingFreeQuestions}/5)` : 'Loading...'}
                                                </CustomFont>
                                            </CustomRow>
                                            <CustomRow width='90%' justifyContent='center' alignItems='flex-end' gap='0.1rem'>
                                                <StyledImg src={'icon_boo_small.png'} />
                                                <StyledImg src={'icon_boo_big.png'} />
                                                <StyledImg src={'icon_boo_middle.png'} />
                                            </CustomRow>
                                        </CustomColumn>
                                        {/* 2열 */}
                                        <CustomColumn width='50%' justifyContent='center' alignItems='center' gap='4rem'>
                                            <CustomFont color='#000000' font='1.8rem' fontWeight='500'>티켓 보유 현황</CustomFont>

                                            <CustomRow width='50%' justifyContent='space-between' alignItems='center'>
                                                <CustomFont color='#000000' font='1.4rem'>내 보유 유료 티켓</CustomFont>
                                                <CustomFont color='#8CC63F' fontWeight='bold' font='1.4rem'>{paidTickets}장</CustomFont>
                                            </CustomRow>

                                            <CustomRow width='50%' justifyContent='space-between' alignItems='center'>
                                                <CustomFont color='#000000' font='1.4rem'>내 보유 무료 티켓</CustomFont>
                                                <CustomFont color='#8CC63F' fontWeight='bold' font='1.4rem'>{freeTickets}장</CustomFont>
                                            </CustomRow>

                                            <RealBuyButton onClick={() => setIsRealBuy(false)}>
                                                <CustomFont color='#FFFFFF' font='1.3rem' fontWeight='400'>확인</CustomFont>
                                            </RealBuyButton>
                                        </CustomColumn>
                                    </CustomRow>
                                </BuyModal>
                            </>
                        )
                    }

                </CustomColumn>
            </PageContainer>
        </ContainerCenter>
    );
};

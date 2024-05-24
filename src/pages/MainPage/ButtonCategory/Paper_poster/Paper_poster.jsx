import styled, { keyframes } from 'styled-components';
import { useNavigate } from "react-router-dom";
import CustomColumn from '../../../../Components/Container/CustomColumn';
import CustomRow from '../../../../Components/Container/CustomRow';
import CustomFont from '../../../../Components/Container/CustomFont';
import StyledImg from '../../../../Components/Container/StyledImg';
import React, { useState, useEffect } from 'react';
import OpenAI from "openai";
import { useAuth } from '../../../SubPage/AuthContext';
import axios from 'axios';
import SoldOutFreeTicket from '../SoldOutFreeTicket';

const ContainerCenter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 100%;
  min-height: 100vh;
`;

const PageContainer = styled(ContainerCenter)`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-top: 8vh;
  padding-bottom: 5vh;
  gap: 20px;
  position: relative;
  background-color: white;

  align-items: center;
`;

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

const TextareaForm = styled.textarea`
  display: flex;
  border: 1.5px solid #8CC63F;
  background-color: transparent;
  border-radius: 15px;
  width: 100%;
  height: 4rem;
  padding: 0.3rem;

  &::placeholder {
    color: #D9D9D9;
  }

  &:active {
    outline: none;
  }
`;

const SendButton = styled.button`
  width: 60%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  color: white;
  border: none;
  border-radius: 20px;
  background-color: ${props => props.isActive ? '#8CC63F' : '#D9D9D9'};
  cursor: ${props => props.isActive ? 'pointer' : 'not-allowed'};
  pointer-events: ${props => props.isActive ? 'auto' : 'none'};
`;

const Boo_says = styled.div`
  width: 30%;
  height: 100px;
  background-color: rgba(140, 198, 63, 0.5);
  color: white;
  border: none;
  border-radius: 50%;
  padding: 1rem;
  font-size: 1rem;
  font-weight: bold;
  line-height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 0.8rem;
  margin-top: 5px; // InputForm 바로 아래에 표시되도록 margin-top 설정
`;

const LoadingMessage = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    width: 50vh;
    height: 50vh;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// Loader와 이미지를 결합하는 컴포넌트
const LoaderWithImage = styled.div`
  position: relative;
  border: 4px solid #f3f3f3; // Light grey
  border-top: 4px solid #8CC63F;
  border-radius: 50%;
  width: 200px;
  height: 200px;
  animation: ${spin} 2s linear infinite;

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    background-image: url('icon_boo_loading.png');
    background-size: cover;
    width: 100px;
    height: 100px;
    transform: translate(-50%, -50%);
  }
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

  `;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
`;

const ModalButton = styled.button`
  margin: 10px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: ${props => props.primary ? '#8CC63F' : '#D9D9D9'};
  color: white;
`;

export default function Component() {
  const [recipient, setRecipient] = useState('');
  const [volume, setVolume] = useState('');
  const [reason, setReason] = useState('');
  const [volumeError, setVolumeError] = useState('');

  // chat gpt ai api 관련
  const [sendContent, setSendContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [runGPT, setRunGPT] = useState(false);

  const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
  });

  const navigate = useNavigate();
  const { isLoggedIn } = useAuth(); // AuthContext에서 사용자명 가져오기

  useEffect(() => {
    if (!runGPT) {
      return;
    }

    setIsLoading(true);

    openai.chat.completions.create({
      messages: [
        {
          role: 'user',
          // content: sendContent,
          content: `다음의 정보를 바탕으로, 조건에 맞는 문서를 생성하라.
                ${sendContent}

                작성 가이드라인:
                - 이 문서는 어떤 기업, 상품, 매체, 공익 등 무언가를 공공연히 알리고 홍보하기 위한 목적으로 내용이 작성되어야 한다.
                - 사용자가 전달해준 정보를 전부 사용하여 문서를 생성해야 한다.
                - 운율이 있거나 규칙적인 발음의 문장으로 구성하여 사람들이 오래 기억할 수 있도록 문장을 구성해야 한다.`
        }],
      model: 'gpt-4-turbo',
    })
      .then((res) => {
        const content = res.choices[0].message.content;
        console.log(content);
        localStorage.setItem('content', content);
        navigate('/paperposterreply');
      })
      .catch((err) => {
        console.error("Error calling OpenAI API:", err);
      })
      .finally(() => {
        setIsLoading(false);
      });;
    setRunGPT(false);
  }, [sendContent])

  const [showModal, setShowModal] = useState(false);

  const handleAiReplyClick = () => {
    let content = `문서의 최대 분량 : ${volume} || 문서를 작성하는 이유 : ${reason} ||
    누구에게 : ${recipient}`;
    console.log(content);
    setRunGPT(true);
    setSendContent(content);

    const serverIp = process.env.REACT_APP_SERVER_IP;

    axios.post(`${serverIp}/save_doc_input`, null, {
      params: {
        user_name: isLoggedIn, // AuthContext에서 가져온 사용자명
        type: 'poster',
        target: recipient,
        amount: parseInt(volume), // volume을 정수로 변환
        text: '광고/포스터 카테고리에서 제공되지 않는 필드입니다.'
      }
    })
      .then(response => {
        console.log('API Response:', response.data);
        const responseMessage = response.data;
        const docIdMatch = responseMessage.match(/doc_id는 (\d+)/);
        if (docIdMatch) {
          const docId = docIdMatch[1];
          localStorage.setItem('doc_id', docId);
        }
      })
      .catch(error => {
        console.error('Error:', error.response ? error.response.data : error.message);
      });

    axios.put(`${serverIp}/update_user_daily_tickets`, null, {
      params: {
        user_name: isLoggedIn, // AuthContext에서 가져온 사용자명
        usedDailyTicketCount: 1
      }
    })
      .then(response => {
        console.log('Ticket API Response:', response.data);
      })
      .catch(error => {
        console.error('Ticket API Error:', error.response ? error.response.data : error.message);
      });
  };

  const handleVolumeChange = (e) => {
    const value = e.target.value;
    setVolume(value);
    if (value && !/^\d+$/.test(value)) {
      setVolumeError('숫자만 입력해주세요');
    } else if (parseInt(value, 10) > 3000) {
      setVolumeError('3000자 이하로 설정해야 합니다');
    } else {
      setVolumeError('');
    }
  };

  const handleSendButtonClick = () => {
    setShowModal(true);
  };

  const [showTicketAlert, setShowTicketAlert] = useState(false);

  const handleConfirm = async () => {
    setShowModal(false);

    const serverIp = process.env.REACT_APP_SERVER_IP;

    try {
      const todayFreeAskResponse = await axios.get(`${serverIp}/today_free_ask`, {
        params: { user_name: isLoggedIn }
      });

      if (todayFreeAskResponse.data < 1) {
        setShowTicketAlert(true);
        return;
      }

      handleAiReplyClick();

    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
    }
  };

  const handleTicketAlertConfirm = () => {
    setShowTicketAlert(false);
    navigate('/buypage');
  };

  const handleTicketAlertCancel = () => {
    setShowTicketAlert(false);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const handleTicketUsed = (category) => {
    setShowTicketAlert(false);
    handleAiReplyClick(category);
  };

  const isFormValid = recipient && volume && reason && !volumeError;

  return (
    <ContainerCenter>
      <PageContainer>
        <CustomColumn width='80%' gap='4rem' justifyContent='center' alignItems='center'>

          <CustomRow width='100%' gap='1rem' justifyContent='center' alignItems='center' >
            <StyledImg src={'icon_boo_glass.png'} />
            <Boo_says>광고/포스터, 나에게 맡겨!<br />정보가 구체적일 수록 좋아요!</Boo_says>
          </CustomRow>

          <CustomColumn width='60%' justifyContent='center' alignItems='center'>

            <CustomRow width='100%' justifyContent='flex-start' alignItems='center' gap='1rem'>
              <CustomFont color='black' font='1rem'>문서를 보여주고 싶은 대상을 설명해주세요</CustomFont>
              <CustomFont color='red' font='1rem'>*</CustomFont>
            </CustomRow>
            <InputForm value={recipient} onChange={(e) => setRecipient(e.target.value)} />
            {!recipient && <ErrorMessage>필수 필드입니다.</ErrorMessage>}

            <CustomRow width='100%' justifyContent='flex-start' alignItems='center' gap='1rem'>
              <CustomFont color='black' font='1rem'>문서의 분량을 설정해주세요</CustomFont>
              <CustomFont color='red' font='1rem'>*</CustomFont>
            </CustomRow>
            <InputForm placeholder='3000자 이내로 설정해주세요.' value={volume} onChange={handleVolumeChange} />
            {volumeError && <ErrorMessage>{volumeError}</ErrorMessage>}

            <CustomRow width='100%' justifyContent='flex-start' alignItems='center' gap='1rem'>
              <CustomFont color='black' font='1rem'>문서를 생성하는 이유를 알려주세요</CustomFont>
              <CustomFont color='red' font='1rem'>*</CustomFont>
            </CustomRow>
            <TextareaForm value={reason} onChange={(e) => setReason(e.target.value)} />
            {!reason && <ErrorMessage>필수 필드입니다.</ErrorMessage>}
          </CustomColumn>

          {/* <SendButton isActive={isFormValid}>문서 생성하기</SendButton> */}
          {!isLoading &&
            <SendButton isActive={isFormValid} onClick={handleSendButtonClick}>
              생성형 AI에게 문서 작성 요청하기
            </SendButton>
          }

          {showModal && (
            <ModalOverlay>
              <ModalContent>
                <p>티켓 1개를 차감하여 문서를 생성합니다.</p>
                <ModalButton primary onClick={handleConfirm}>확인</ModalButton>
                <ModalButton onClick={handleCancel}>취소</ModalButton>
              </ModalContent>
            </ModalOverlay>
          )}

          {showTicketAlert && (
            <SoldOutFreeTicket onClose={() => setShowTicketAlert(false)} onTicketUsed={handleTicketUsed} category="poster" />
          )}

          {isLoading &&
            <>
              <ModalOverlay />
              <LoadingMessage>
                <CustomColumn width='100%' gap='2rem' alignItems='center' justifyContent='center'>
                  <CustomColumn width='100%' gap='0.5rem' alignItems='center' justifyContent='center'>
                    <CustomFont color='#8CC63F' fontWeignt='bold'>Boo가 문서를 생성 중입니다.</CustomFont>
                    <CustomFont color='#8CC63F' fontWeignt='bold'>잠시만 기다려주세요...</CustomFont>
                    <CustomFont color='#8CC63F' fontWeignt='bold'><br />약 1분정도 소요될 수 있습니다...</CustomFont>
                  </CustomColumn>
                  <LoaderWithImage />
                </CustomColumn>
              </LoadingMessage>
            </>
          }
        </CustomColumn>
      </PageContainer>
    </ContainerCenter>
  );
};
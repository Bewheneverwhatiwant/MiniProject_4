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
  useEffect(() => {
    window.scrollTo(0, 0); // 페이지 로딩 시 스크롤을 맨 위로 설정
  }, []);

  const [volume, setVolume] = useState('');
  const [reason, setReason] = useState('');
  const [volumeError, setVolumeError] = useState('');

  const [who, setWho] = useState(''); // 누가
  const [recipient, setRecipient] = useState(''); // 누구에게
  const [atmosphere, setAtmosphere] = useState(''); // 어떤 분위기
  const [duzen, setDuzen] = useState(''); // 반말 또는 존댓발의 어투
  const [why, setWhy] = useState(''); // 편지 작성 이유
  const [lan, setLan] = useState(''); // 언어 입력 필드 추가


  // chat gpt ai api 관련
  const [sendContent, setSendContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [runGPT, setRunGPT] = useState(false);
  const [docId_chat, setDocId_chat] = useState(null);

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
                - 이 문서는 누군가에게 편지를 쓰기 위한 목적으로 내용이 작성되어야 한다.
                - 사용자가 전달해준 정보를 전부 사용하여 문서를 생성해야 한다.
                - 반드시 사용자가 지정한 언어로 내용을 생성해야 한다. 그 외 언어로는 절대 생성하지 마라.`
        }],
      model: 'gpt-4-turbo',
    })
      .then((res) => {
        const content = res.choices[0].message.content;
        console.log(content);
        localStorage.setItem('content', content);
        navigate('/paperletterreply');
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
    누가 : ${who} || 누구에게 : ${recipient} || 편지의 분위기는 : ${atmosphere} || 편지의 어투는 : ${duzen} 
    || 편지를 쓰는 이유는 : ${why} || 문서를 생성할 언어: ${lan}`;
    console.log(content);
    setRunGPT(true);
    setSendContent(content);

    // 환불 내역을 저장하기 위해, content를 로컬스토리지에 저장
    localStorage.setItem('gpt_content', content);

    const serverIp = process.env.REACT_APP_SERVER_IP;

    axios.post(`${serverIp}/save_doc_input`, null, {
      params: {
        user_name: isLoggedIn, // AuthContext에서 가져온 사용자명
        type: 'letter',
        target: recipient,
        amount: parseInt(volume), // volume을 정수로 변환
        text: why
      }
    })
      .then(response => {
        console.log('API Response:', response.data);
        const responseMessage = response.data;
        localStorage.setItem('doc_id', responseMessage);
        setDocId_chat(responseMessage);  // 문서 ID를 상태 변수에 저장
        console.log('로컬 스터리지에 저장된 doc_id는');
        console.log(docId_chat);

        // update_user_daily_tickets API 호출
        return axios.put(`${serverIp}/update_user_daily_tickets`, null, {
          params: {
            user_name: isLoggedIn, // AuthContext에서 가져온 사용자명
            usedDailyTicketCount: 1
          }
        });
      })
      .then(response => {
        console.log('Ticket API Response:', response.data);

        // create_ticket_history API 호출
        return axios.post(`${serverIp}/create_ticket_history`, null, {
          params: {
            user_name: isLoggedIn, // AuthContext에서 가져온 사용자명
            ticket_type: 'DAILY_FREE'
          }
        });
      })
      .then(response => {
        console.log('티켓 사용 내역 저장 완료');
      })
      .catch(error => {
        console.error('Error:', error.response ? error.response.data : error.message);
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

      // 문서 생성 횟수를 업데이트하는 API 호출
      const updateCountResponse = await axios.put(`${serverIp}/update_count`, null, {
        params: { user_name: isLoggedIn }
      });

      if (updateCountResponse.status === 200) {
        // const count = updateCountResponse.data.match(/문서 생성 횟수\s*:\s*(\d+)\s*회/)[1];
        // updateCountResponse.data를 문자열이 아닌 객체로 처리
        const count = updateCountResponse.data.count;  // 데이터 구조에 맞게 수정
        console.log(`당신의 문서 생성 횟수는: ${count}회입니다`);
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

  const isFormValid = who && recipient && volume && !volumeError && atmosphere && duzen && why && lan;

  return (
    <ContainerCenter>
      <PageContainer>
        <CustomColumn width='80%' gap='4rem' justifyContent='center' alignItems='center'>

          <CustomRow width='100%' gap='1rem' justifyContent='center' alignItems='center' >
            <StyledImg src={'icon_boo_glass.png'} />
            <Boo_says>편지, 나에게 맡겨!<br />정보가 구체적일 수록 좋아요!</Boo_says>
          </CustomRow>

          <CustomColumn width='60%' justifyContent='center' alignItems='center'>

            <CustomRow width='100%' justifyContent='flex-start' alignItems='center' gap='1rem'>
              <CustomFont color='black' font='1rem'>문서를 생성할 언어를 알려주세요</CustomFont>
              <CustomFont color='red' font='1rem'>*</CustomFont>
            </CustomRow>
            <InputForm value={lan} onChange={(e) => setLan(e.target.value)} />
            {!lan && <ErrorMessage>필수 필드입니다.</ErrorMessage>}

            <CustomRow width='100%' justifyContent='flex-start' alignItems='center' gap='1rem'>
              <CustomFont color='black' font='1rem'>누가 적어주는 편지인가요?</CustomFont>
              <CustomFont color='red' font='1rem'>*</CustomFont>
            </CustomRow>
            <InputForm value={who} onChange={(e) => setWho(e.target.value)} />
            {!who && <ErrorMessage>필수 필드입니다.</ErrorMessage>}

            <CustomRow width='100%' justifyContent='flex-start' alignItems='center' gap='1rem'>
              <CustomFont color='black' font='1rem'>누구에게 주는 편지인가요?</CustomFont>
              <CustomFont color='red' font='1rem'>*</CustomFont>
            </CustomRow>
            <InputForm value={recipient} onChange={(e) => setRecipient(e.target.value)} />
            {!recipient && <ErrorMessage>필수 필드입니다.</ErrorMessage>}

            <CustomRow width='100%' justifyContent='flex-start' alignItems='center' gap='1rem'>
              <CustomFont color='black' font='1rem'>어떤 분위기의 편지를 원하시나요?</CustomFont>
              <CustomFont color='red' font='1rem'>*</CustomFont>
            </CustomRow>
            <InputForm value={atmosphere} onChange={(e) => setAtmosphere(e.target.value)} />
            {!atmosphere && <ErrorMessage>필수 필드입니다.</ErrorMessage>}

            <CustomRow width='100%' justifyContent='flex-start' alignItems='center' gap='1rem'>
              <CustomFont color='black' font='1rem'>반말과 존댓말 중 어떤 어투의 편지를 원하시나요?</CustomFont>
              <CustomFont color='red' font='1rem'>*</CustomFont>
            </CustomRow>
            <InputForm value={duzen} onChange={(e) => setDuzen(e.target.value)} />
            {!duzen && <ErrorMessage>필수 필드입니다.</ErrorMessage>}

            <CustomRow width='100%' justifyContent='flex-start' alignItems='center' gap='1rem'>
              <CustomFont color='black' font='1rem'>편지를 쓰는 이유가 무엇인가요?</CustomFont>
              <CustomFont color='red' font='1rem'>*</CustomFont>
            </CustomRow>
            <InputForm value={why} onChange={(e) => setWhy(e.target.value)} />
            {!why && <ErrorMessage>필수 필드입니다.</ErrorMessage>}

            <CustomRow width='100%' justifyContent='flex-start' alignItems='center' gap='1rem'>
              <CustomFont color='black' font='1rem'>문서의 분량을 설정해주세요</CustomFont>
              <CustomFont color='red' font='1rem'>*</CustomFont>
            </CustomRow>
            <InputForm placeholder='3000자 이내로 설정해주세요.' value={volume} onChange={handleVolumeChange} />
            {volumeError && <ErrorMessage>{volumeError}</ErrorMessage>}
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
            <SoldOutFreeTicket onClose={() => setShowTicketAlert(false)} onTicketUsed={handleTicketUsed} category="letter" />
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
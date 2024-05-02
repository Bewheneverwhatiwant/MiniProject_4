import styled, { keyframes } from 'styled-components';
import { useNavigate } from "react-router-dom";
import CustomColumn from '../../../../Components/Container/CustomColumn';
import CustomRow from '../../../../Components/Container/CustomRow';
import CustomFont from '../../../../Components/Container/CustomFont';
import StyledImg from '../../../../Components/Container/StyledImg';
import React, { useState, useEffect } from 'react';
import OpenAI from "openai";

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

  display: flex;
  align-items: center;
  justify-content: center;
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
    height: 70vh;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const ColumnCenterContainer = styled.div`
display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    gap : ${props => props.$gap ? props.$gap : "10px"}
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Loader = styled.div`
  border: 4px solid #f3f3f3; /* Light grey */
  border-top: 4px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: ${spin} 2s linear infinite;
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
        navigate('/paperhirereply'); // ai 답변 페이지 만든 후 여기 수정하기
      })
      .catch((err) => {
        console.error("Error calling OpenAI API:", err);
      })
      .finally(() => {
        setIsLoading(false);
      });;
    setRunGPT(false);
  }, [sendContent])

  const handleAiReplyClick = () => {

    let content = `문서를 보내는 대상: ${recipient} || 문서의 최대 분량 : ${volume} || 문서를 작성하는 이유 : ${reason}`;
    console.log(content);
    setRunGPT(true);
    setSendContent(content);
  }

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

  const isFormValid = recipient && volume && reason && !volumeError;

  return (
    <ContainerCenter>
      <PageContainer>
        <CustomColumn width='80%' gap='4rem' justifyContent='center' alignItems='center'>

          <CustomRow width='100%' gap='1rem' justifyContent='center' alignItems='center' >
            <StyledImg src={'icon_boo_glass.png'} />
            <Boo_says>나에게 맡겨!</Boo_says>
          </CustomRow>

          <CustomColumn width='60%' justifyContent='center' alignItems='center'>

            <CustomRow width='100%' justifyContent='flex-start' alignItems='center' gap='1rem'>
              <CustomFont color='black' font='1rem'>문서를 보내는 대상을 설명해주세요</CustomFont>
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
            <SendButton isActive={isFormValid} onClick={handleAiReplyClick}>
              생성형 AI에게 법률 제안서 작성 요청하기
            </SendButton>
          }

          {isLoading &&
            <LoadingMessage>
              <ColumnCenterContainer>
                <CustomFont color='black'>응답을 생성중입니다</CustomFont>
                <CustomFont color='black'>잠시만 기다려주세요</CustomFont>
                <CustomFont color='black'><br />약 1분정도 소요될 수 있습니다</CustomFont>
                <Loader />
              </ColumnCenterContainer>
            </LoadingMessage>
          }
        </CustomColumn>
      </PageContainer>
    </ContainerCenter>
  );
};
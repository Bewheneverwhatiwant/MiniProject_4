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

export default function Component() {
  const [volume, setVolume] = useState('');
  const [reason, setReason] = useState('');
  const [volumeError, setVolumeError] = useState('');

  // 육하원칙에 따른 보고서 양식
  const [who, setWho] = useState(''); // 누가
  const [recipient, setRecipient] = useState(''); // 누구에게
  const [when, setWhen] = useState('');
  const [what, setWhat] = useState('');
  const [where, setWhere] = useState(' ');
  const [how, setHow] = useState('');
  const [why, setWhy] = useState('');

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
                - 이 문서는 어떤 사건이나 업무 또는 공부에 대해 보고서를 쓰기 위한 목적으로 내용이 작성되어야 한다.
                - 사용자가 전달해준 정보를 전부 사용하여 문서를 생성해야 한다.`
        }],
      model: 'gpt-4-turbo',
    })
      .then((res) => {
        const content = res.choices[0].message.content;
        console.log(content);
        localStorage.setItem('content', content);
        navigate('/papernoticereply');
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

    let content = `문서의 최대 분량 : ${volume} || 문서를 작성하는 이유 : ${reason} ||
    누가 : ${who} || 누구에게 : ${recipient} || 언제 : ${when} || 어디서 : ${where} || 무엇을 :${what} || 어떻게 : ${how} || 왜 : ${why}`;
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

  const isFormValid = who && where && how && why && when && recipient && volume && !volumeError;

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
              <CustomFont color='black' font='1rem'>누가 작성하는 보고서인가요?</CustomFont>
              <CustomFont color='red' font='1rem'>*</CustomFont>
            </CustomRow>
            <InputForm value={who} onChange={(e) => setWho(e.target.value)} />
            {!who && <ErrorMessage>필수 필드입니다.</ErrorMessage>}

            <CustomRow width='100%' justifyContent='flex-start' alignItems='center' gap='1rem'>
              <CustomFont color='black' font='1rem'>누구에게 제출하는 보고서인가요?</CustomFont>
              <CustomFont color='red' font='1rem'>*</CustomFont>
            </CustomRow>
            <InputForm value={recipient} onChange={(e) => setRecipient(e.target.value)} />
            {!recipient && <ErrorMessage>필수 필드입니다.</ErrorMessage>}

            <CustomRow width='100%' justifyContent='flex-start' alignItems='center' gap='1rem'>
              <CustomFont color='black' font='1rem'>언제 있었던 일을 보고하고 싶으신가요?</CustomFont>
              <CustomFont color='red' font='1rem'>*</CustomFont>
            </CustomRow>
            <InputForm value={when} onChange={(e) => setWhen(e.target.value)} />
            {!when && <ErrorMessage>필수 필드입니다.</ErrorMessage>}

            <CustomRow width='100%' justifyContent='flex-start' alignItems='center' gap='1rem'>
              <CustomFont color='black' font='1rem'>어떤 일을 보고하고 싶으신가요?</CustomFont>
              <CustomFont color='red' font='1rem'>*</CustomFont>
            </CustomRow>
            <InputForm value={what} onChange={(e) => setWhat(e.target.value)} />
            {!what && <ErrorMessage>필수 필드입니다.</ErrorMessage>}

            <CustomRow width='100%' justifyContent='flex-start' alignItems='center' gap='1rem'>
              <CustomFont color='black' font='1rem'>어떤 결과를 이끌어내셨나요?</CustomFont>
              <CustomFont color='red' font='1rem'>*</CustomFont>
            </CustomRow>
            <InputForm value={how} onChange={(e) => setHow(e.target.value)} />
            {!how && <ErrorMessage>필수 필드입니다.</ErrorMessage>}

            <CustomRow width='100%' justifyContent='flex-start' alignItems='center' gap='1rem'>
              <CustomFont color='black' font='1rem'>어디서 일어난 일인가요?</CustomFont>
              <CustomFont color='red' font='1rem'>*</CustomFont>
            </CustomRow>
            <InputForm value={where} onChange={(e) => setWhere(e.target.value)} />
            {!where && <ErrorMessage>필수 필드입니다.</ErrorMessage>}

            <CustomRow width='100%' justifyContent='flex-start' alignItems='center' gap='1rem'>
              <CustomFont color='black' font='1rem'>왜 그런 결과가 도출되었나요?</CustomFont>
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
            <SendButton isActive={isFormValid} onClick={handleAiReplyClick}>
              생성형 AI에게 법률 제안서 작성 요청하기
            </SendButton>
          }

          {isLoading &&
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
          }
        </CustomColumn>
      </PageContainer>
    </ContainerCenter>
  );
};
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import CustomColumn from "../../../../Components/Container/CustomColumn";
import CustomFont from "../../../../Components/Container/CustomFont";
import CustomRow from "../../../../Components/Container/CustomRow";
import StyledImg from "../../../../Components/Container/StyledImg";
import CustomCenter from '../../../../Components/Container/CustomCenter';

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

const SaveButton = styled.button`
  padding: 10px;
  margin: auto;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #f9f9f9;
  cursor: pointer;
`;

const ReplyDiv = styled.div`
width: 80%;
height: 500px;
background-color: rgba(255, 199, 199, 0.5);
border-radius: 20px;
inline-height: 1.5;
padding: 10px;
display: flex;
flex-direction: column;
`;

const Buttoms = styled.button`
width: ${props => props.width || '200px'};
hwight: 70px;
background-color: #FFC7C7;
border-radius: 10px;
padding: 10px;
display: flex;
justify-content: center;
align-items: center;
border: none;
`;

export default function Component() {

    const [content, setContent] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const storedContent = localStorage.getItem('content');
        if (storedContent) {
            setContent(storedContent);
        }
    }, []);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(content);
        alert("문서가 복사되었습니다.");
    };

    const handleSaveContent = () => {
        const existingContents = JSON.parse(localStorage.getItem('savedContents')) || [];
        existingContents.push(content);
        localStorage.setItem('savedContents', JSON.stringify(existingContents));
        console.log(content);
        navigate('/ai-mygen'); // 실제 모아보기 경로로 바꾸기
    };

    const BackToGen = () => {
        navigate('/paper_notice');
    }

    return (
        <ContainerCenter>
            <PageContainer>

                <CustomCenter>
                    <CustomFont color='#8CC63F' font='2rem' fontWeight='bold'>
                        Boo가 생성한 보고서가 도착했습니다!
                    </CustomFont>
                </CustomCenter>

                <ReplyDiv>
                    {content ? content : '답변이 없습니다.'}
                </ReplyDiv>

                {content && (
                    <CustomColumn width='100%' gap='1.5rem' justifyContent='center' alignItems='center'>
                        <CustomRow width='100%' gap='0.5rem'>
                            <Buttoms><CustomFont color="white" fontWeight='bold' onClick={copyToClipboard}>복사하기</CustomFont></Buttoms>
                            <Buttoms><CustomFont color="white" fontWeight='bold' onClick={BackToGen}>재생성하기</CustomFont></Buttoms>
                            <Buttoms onClick={handleSaveContent}>
                                <CustomFont color="white" fontWeight='bold'>저장하기</CustomFont>
                            </Buttoms>
                        </CustomRow>
                        <Buttoms width='620px'> <CustomFont color="white" fontWeight='bold'>카카오톡으로 공유하기</CustomFont></Buttoms>
                    </CustomColumn>
                )}

            </PageContainer>
        </ContainerCenter>
    );
}
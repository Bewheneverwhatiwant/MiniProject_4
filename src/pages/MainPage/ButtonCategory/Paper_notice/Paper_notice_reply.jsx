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

const BoxRadius = styled.div`
display : flex;
flex-direction : column;
flex-shrink : 0;
width: ${props => props.width || "100%"};
height: ${props => props.height || null};

padding: ${props => props.$padding || "20px 20px 40px 20px"};
margin : ${props => props.$is_container ? "-20px 0px 0px 0px" : null};
gap : ${props => props.$gap || "15px"};

border : ${props => props.$border || null};
border-radius : ${props => props.border_radius || "15px"};

color : ${props => props.color || null};
box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.25);
background : ${props => props.$background || "white"};
z-index: ${props => props.zindex || 0};
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

    return (
        <ContainerCenter>
            <PageContainer>

                <CustomCenter>
                    <CustomFont color='black'>
                        AI의 법률 제안서 작성이 완료되었습니다.
                    </CustomFont>
                </CustomCenter>

                <BoxRadius>
                    {content ? content : '답변이 없습니다.'}
                    {content && (
                        <SaveButton onClick={handleSaveContent}>
                            AI가 작성한 법률 제안서 보관하기
                        </SaveButton>
                    )}
                </BoxRadius>
            </PageContainer>
        </ContainerCenter>
    );
}
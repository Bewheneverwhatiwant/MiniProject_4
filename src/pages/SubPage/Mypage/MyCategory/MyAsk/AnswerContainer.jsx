import React from 'react';
import styled from 'styled-components';
import CustomRow from '../../../../../Components/Container/CustomRow';
import CustomFont from '../../../../../Components/Container/CustomFont';
import CustomColumn from '../../../../../Components/Container/CustomColumn';

const ContainerCenter = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    width: 300%;
`;

const PageContainer = styled(ContainerCenter)`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding-top: 5vh;
    padding-bottom: 5vh;
    gap: 20px;
    position: relative;
    background-color: white;
`;

const MyAnswerContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    background-color: #ffc7c7;
    border: none;
    border-radius: 15px;
    padding-top: 10px;
    padding-bottom: 10px;
    width: 100%;
    height: 130px;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.5);
    cursor: pointer;
`;

function AnswerContainer({ title, onClick }) {
  return (
    <ContainerCenter>
      <PageContainer>
        <CustomColumn width='80%' justifyContent='center' alignItems='flex-start' gap='2rem'>
          <MyAnswerContainer onClick={onClick}>
            <CustomRow alignItems='center'>
              <CustomFont color='#00000' font='1rem' fontWeight='bold'>{title}</CustomFont>
            </CustomRow>
          </MyAnswerContainer>
        </CustomColumn>
      </PageContainer>
    </ContainerCenter>
  );
}

export default AnswerContainer;

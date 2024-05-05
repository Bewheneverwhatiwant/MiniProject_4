import React, { useState } from 'react';
import CustomRow from "../../Components/Container/CustomRow";
import styled from 'styled-components';
import StyledImg from "../../Components/Container/StyledImg";
import CustomFont from "../../Components/Container/CustomFont";
import CustomColumn from "../../Components/Container/CustomColumn";
import ImgCarousel from './MainPage_banner';
import Buttons from './MainPage_buttons';

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
`;

const Boo_says = styled.div`
  width: 30%;
  height: 20vh;
  background-color: rgba(140, 198, 63, 0.5);
  color: #78AB34;
  border: none;
  border-radius: 50%;
  padding: 1rem;
  margin: 1rem;
  font-size: 1rem;
  font-weight: bold;

  display: flex;
  align-items: center;
  justify-content: center;
`;


export default function Component() {
  const [showBoo, setShowBoo] = useState(false);

  return (
    <ContainerCenter>
      <PageContainer>
        <CustomColumn width='100%' justifyContent='center' alignItems='center' gap='5rem'>
          <CustomColumn width='100%' justifyContent='center' alignItems='center' gap='1rem'>


            {showBoo && <Boo_says onMouseEnter={() => setShowBoo(true)} onMouseLeave={() => setShowBoo(false)}>로그인 후 모든 기능을 이용할 수 있어요!</Boo_says>}

            <CustomColumn width='100%' justifyContent='center' alignItems='center' gap='1rem'>
              <CustomRow width='100%' justofyContent='center' alignItems='center'>
                <CustomRow width='20%' justifyContent='center' alignItems='flex-end' gap='0.1rem' onMouseEnter={() => setShowBoo(true)}>
                  <StyledImg src={'icon_boo_small.png'} />
                  <StyledImg src={'icon_boo_big.png'} />
                  <StyledImg src={'icon_boo_middle.png'} />
                </CustomRow>
              </CustomRow>
            </CustomColumn>
          </CustomColumn>

          <CustomColumn justifyContent='center' alignItems='flex-start' gap='0.3rem'>
            <CustomFont color='#C1EEA5' font='0.6rem' fontWeight='bold'>⚝ Boo 위에 마우스를 올려보세요.</CustomFont>
            <CustomFont fontWeight='bold' color='black' font='2rem'>각종 문서, AI가 생성해드릴게요!</CustomFont>
          </CustomColumn>

          <ImgCarousel />

          <Buttons />

        </CustomColumn>
      </PageContainer>
    </ContainerCenter>
  );
};
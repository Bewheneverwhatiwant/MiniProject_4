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

export default function Component() {
  return (
    <ContainerCenter>
      <PageContainer>
        <CustomColumn width='100%' justifyContent='center' alignItems='center' gap='5rem'>

          <CustomRow width='90%' justifyContent='center' alignItems='flex-end' gap='0.1rem'>
            <StyledImg src={'icon_boo_small.png'} />
            <StyledImg src={'icon_boo_big.png'} />
            <StyledImg src={'icon_boo_middle.png'} />
          </CustomRow>

          <CustomFont fontWeight='bold' color='black' font='2rem'>각종 문서, AI가 생성해드릴게요!</CustomFont>

          <ImgCarousel />

          <Buttons />

        </CustomColumn>
      </PageContainer>
    </ContainerCenter>
  );
};
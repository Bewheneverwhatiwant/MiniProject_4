import styled from 'styled-components';
import CustomFont from '../../../../../Components/Container/CustomFont';
import CustomColumn from '../../../../../Components/Container/CustomColumn';
import CustomRow from '../../../../../Components/Container/CustomRow';
import StyledImg from '../../../../../Components/Container/StyledImg';

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
  justify-content: flex-start;
  padding-top: 8vh;
  padding-bottom: 5vh;
  gap: 20px;
  position: relative;
  background-color: white;
`;

const BuyButton = styled.button`
display: flex;
align-items: center;
justify-content: center;
cursor: pointer;
padding: 0.5rem;
border: none;
border-radius: 10px;
width: 150px;
color: white;
background-color: #8CC63F;
`

const MyTicketContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  background-color: #C1EEA580;
  border: none;
  border-radius: 20px;

  padding-top: 10px;
  padding-bottom: 10px;
  width: 100%;
  height: 300px;
`;

const Divider = styled.div`
  height: 1px;
  width: 100%;
  background-color: white;
`;


export default function Component() {
  return (
    <ContainerCenter>
      <PageContainer>
        <CustomColumn width='80%' justifyContent='center' alignItems='center' gap='2rem'>

          <CustomRow width='100%' justifyContent='space-between' align-items='center'>
            <CustomRow>
              <CustomFont color='black' fontWeight='bold' font='1.5rem'>오늘 남은 무료 질문 횟수</CustomFont>
              <CustomFont color='#8CC63F' fontWeight='bold' font='2rem'>(1/5)</CustomFont>
            </CustomRow>

            <BuyButton>
              <CustomFont color='white' fontWeight='bold' font='1.5rem'>티켓 구매</CustomFont>
            </BuyButton>
          </CustomRow>

          <MyTicketContainer>
            <CustomRow width='90%' justifyContent='space-between' alignItems='center'>
              <CustomRow>
                <StyledImg src={'icon_ticket.png'} />
                <CustomFont color='#8CC63F' font='1.3rem'>내 보유 유료 티켓</CustomFont>
              </CustomRow>

              <CustomFont color='#8CC63F' fontWeight='bold' font='1.3rem'>4장</CustomFont>
            </CustomRow>

            <Divider />

            <CustomRow width='90%' justifyContent='space-between' alignItems='center'>
              <CustomRow>
                <StyledImg src={'icon_ticket.png'} />
                <CustomFont color='#8CC63F' font='1.3rem'>내 보유 무료 티켓</CustomFont>
              </CustomRow>

              <CustomFont color='#8CC63F' fontWeight='bold' font='1.3rem'>2장</CustomFont>
            </CustomRow>
          </MyTicketContainer>

          <CustomRow width='100%' justifyContent='flex-start' align-items='center'>
            <CustomFont color='black' fontWeight='bold' font='1.5rem'>티켓 결제 내역</CustomFont>
          </CustomRow>

          <MyTicketContainer>
            <CustomRow width='90%' justifyContent='space-between' alignItems='center'>
              <CustomFont color='white' font='1.3rem'>2024.04.02.14:23</CustomFont>
              <CustomFont color='white' font='1.3rem'>티켓 4장</CustomFont>
              <CustomFont color='white' font='1.3rem'>40000원</CustomFont>
            </CustomRow>

            <Divider />

            <CustomRow width='90%' justifyContent='space-between' alignItems='center'>
              <CustomFont color='white' font='1.3rem'>2024.04.02.14:23</CustomFont>
              <CustomFont color='white' font='1.3rem'>티켓 4장</CustomFont>
              <CustomFont color='white' font='1.3rem'>40000원</CustomFont>
            </CustomRow>
          </MyTicketContainer>

        </CustomColumn>
      </PageContainer>
    </ContainerCenter>
  );
};
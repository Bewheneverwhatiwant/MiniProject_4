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

// 나중에 서버에서 데이터 받아오는 형식으로 고치기
const remainingFreeQuestions = 1;
const paidTickets = 4;
const freeTickets = 2;
const ticketHistory = [
  {
    date: '2024.04.02.14:23',
    tickets: 4,
    price: '40000원',
  },
  {
    date: '2024.04.02.14:23',
    tickets: 4,
    price: '40000원',
  },
];


export default function Component() {
  return (
    <ContainerCenter>
      <PageContainer>
        <CustomColumn width='80%' justifyContent='center' alignItems='center' gap='2rem'>

          <CustomRow width='100%' justifyContent='space-between' align-items='center'>
            <CustomRow>
              <CustomFont color='black' fontWeight='bold' font='1.5rem'>오늘 남은 무료 질문 횟수</CustomFont>
              <CustomFont color='#8CC63F' fontWeight='bold' font='2rem'>({remainingFreeQuestions}/5)</CustomFont>
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

              <CustomFont color='#8CC63F' fontWeight='bold' font='1.3rem'>{paidTickets}장</CustomFont>
            </CustomRow>

            <Divider />

            <CustomRow width='90%' justifyContent='space-between' alignItems='center'>
              <CustomRow>
                <StyledImg src={'icon_ticket.png'} />
                <CustomFont color='#8CC63F' font='1.3rem'>내 보유 무료 티켓</CustomFont>
              </CustomRow>

              <CustomFont color='#8CC63F' fontWeight='bold' font='1.3rem'>{freeTickets}장</CustomFont>
            </CustomRow>
          </MyTicketContainer>

          <CustomRow width='100%' justifyContent='flex-start' align-items='center'>
            <CustomFont color='black' fontWeight='bold' font='1.5rem'>티켓 결제 내역</CustomFont>
          </CustomRow>

          <MyTicketContainer>
            {ticketHistory.map((ticket, index) => (
              <>
                <CustomRow key={index} width='90%' justifyContent='space-between' alignItems='center'>
                  <CustomFont color='white' font='1.3rem'>{ticket.date}</CustomFont>
                  <CustomFont color='white' font='1.3rem'>티켓 {ticket.tickets}장</CustomFont>
                  <CustomFont color='white' font='1.3rem'>{ticket.price}</CustomFont>
                </CustomRow>
                {index < ticketHistory.length - 1 && <Divider key={`divider-${index}`} />}
              </>
            ))}
          </MyTicketContainer>

        </CustomColumn>
      </PageContainer>
    </ContainerCenter>
  );
};
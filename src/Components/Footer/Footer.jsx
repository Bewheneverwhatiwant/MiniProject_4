import { styled } from 'styled-components';
import CustomColumn from '../Container/CustomColumn';

const FooterContainer = styled.footer`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;

width: 100%;
height: 10vh;
background-color: #575757;
color: white;
gap: 10px;
`;

const Detail = styled.a`
font-size: 10px;
font-family: 'RIDIBatang';
color: white;
`;

const Out = styled.button`
background: transparent;
border: none;
font-size: 10px;
font-family: 'RIDIBatang';
color: white;
text-decoration: underline;
`;

export default function Component() {
    return (
        <FooterContainer>
            <CustomColumn width='100%' alignItems='center' gap='0.6rem'>
                <Detail>내 문서를 부탁해</Detail>
                <Out>서비스 탈퇴</Out>
            </CustomColumn>
        </FooterContainer>
    );
};
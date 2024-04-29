import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import CustomRow from '../../Components/Container/CustomRow';
import CustomColumn from '../../Components/Container/CustomColumn';

const ButtonsContainer = styled.header`
width: 100%;
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;
gap: 1rem;
background-color: transparent;
`;

const Button = styled.button`
background-color: ${props => props.backColor || 'white'};
color: black;
align-items: center;
justify-content: center;

border: none;
border-radius: 20px;
width: 20rem;
height: 7rem;
padding: 20px;
box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
cursor: pointer;
`;

export default function Component() {

    const navigate = useNavigate();

    // 사과문을 생성하는 페이지로 이동
    const paper_sorry = () => {
        navigate('/paper_sorry');
    }

    // 보고서를 생성하는 페이지로 이동
    const paper_notice = () => {
        navigate('/paper_notice');
    }

    // 편지를 생성하는 페이지로 이동
    const paper_letter = () => {
        navigate('/paper_letter');
    }

    //광고/포스터를 생성하는 페이지로 이동
    const paper_poster = () => {
        navigate('/paper_poster');
    }

    // 이력서를 생성하는 페이지로 이동
    const paper_job = () => {
        navigate('/paper_job');
    }

    // 모집/채용공고를 생성하는 페이지로 이동
    const paper_hire = () => {
        navigate('/paper_hire');
    }

    return (

        <ButtonsContainer>
            <CustomColumn width='100%' alignItems='center' justifyContents='center' gap='2rem'>
                <CustomRow width='100%' alignItems='center' justifyContents='center' gap='2rem' >
                    <Button backColor='#FFEBEB' onClick={paper_sorry}>사과문</Button>
                    <Button backColor='#ECFFE0' onClick={paper_notice}>보고서</Button>
                    <Button backColor='#FFF6E0' onClick={paper_letter}>편지</Button>
                </CustomRow>

                <CustomRow width='100%' alignItems='center' justifyContents='center' gap='2rem'>
                    <Button backColor='#DFF2FF' onClick={paper_poster}>광고/포스터</Button>
                    <Button backColor='#F4E5FF' onClick={paper_job}>이력서</Button>
                    <Button backColor='#EBEBEB' onClick={paper_hire}>모집/채용공고</Button>
                </CustomRow>
            </CustomColumn>
        </ButtonsContainer>

    );
};
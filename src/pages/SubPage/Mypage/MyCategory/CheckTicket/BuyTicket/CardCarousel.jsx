import { useState, useEffect } from "react";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CarouselContainer = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
`;

const CarouselSlider = styled.div`
  display: flex;
  transition: transform 0.3s ease-in-out;
  width: 300%;
  align-items: center;
  justify-content: center;
`;

const CarouselItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 33.33%; /* 3개의 아이템이 동일한 너비를 갖도록 설정 */
  width: 33.33%; /* 각 아이템의 너비를 33.33%로 설정 */
  padding-bottom: 10px;
`;

const StyledImage = styled.img`
  width: 400px;
  height: 250px;
`;

const DotContainer = styled.div`
  position: relative;
  bottom: 10px;
  align-items: center;
  justify-content: center;
  display: flex;
  margin: 10px;
`;

const Dot = styled.div`
  padding: 5px;
  margin-right: 5px;
  cursor: pointer;
  border-radius: 50%;
  background: ${props => props.isActive ? 'limegreen' : 'grey'};
`;

export default function CardCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const apiData_hire = Array.from({ length: 3 });

    // 슬라이더 자동 이동 타이머 설정
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex(prevIndex =>
                prevIndex === apiData_hire.length - 1 ? 0 : prevIndex + 1
            );
        }, 2000);
        return () => clearInterval(timer);
    }, [apiData_hire.length]);

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    return (
        <CarouselContainer>
            <CarouselSlider style={{ transform: `translateX(-${currentIndex * (100 / apiData_hire.length)}%)` }}>
                {apiData_hire.map((_, index) => (
                    <CarouselItem key={index}>
                        <StyledImage src={`icon_card_ex${index + 1}.png`} alt={`Slide ${index + 1}`} />
                    </CarouselItem>
                ))}
            </CarouselSlider>

            <DotContainer>
                {apiData_hire.map((_, index) => (
                    <Dot key={index} isActive={currentIndex === index} onClick={() => goToSlide(index)} />
                ))}
            </DotContainer>
        </CarouselContainer>
    )
}

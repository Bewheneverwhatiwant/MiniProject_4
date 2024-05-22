import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import CustomRow from './CustomRow';
import CustomFont from './CustomFont';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  display: flex;
  flex-direction: ${props => props.flexDirection || 'column'};
  width: ${props => props.width || 'auto'};
  max-height: ${props => props.maxHeight || '90vh'}; /* max-height 설정 */
  gap: ${props => props.gap || '30px'};
  align-items: ${props => props.alignItems || 'flex-start'};
  justify-content: ${props => props.justifyContent || 'flex-start'};
  padding-bottom: ${props => props.paddingBottom || '10px'};
  
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  right: 10px;
  background: none;
  border: 2px solid white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
`;

const Circle = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background-color: ${props => props.color || '#F0F0F0'};
  border: none;
`;

const ModalHeader = styled.div`
  background-color: #3C3C3C;
  width: 100%;
  height: 40px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const ChildDiv = styled.div`
width: 100%;
overflow-y: auto; /* 콘텐츠가 max-height를 넘어설 때만 스크롤바가 생김 */
max-height: ${props => props.maxHeight || '90vh'}; /* max-height 설정 */

/* 스크롤바 스타일링 */
&::-webkit-scrollbar {
  width: 10px;
}

&::-webkit-scrollbar-thumb {
  background-color: #8CC63F;
  border-radius: 10px;
}

&::-webkit-scrollbar-track {
  background-color: #f0f0f0;
  border-radius: 10px;
}
`

const FeatherImage = styled.img`
  position: absolute;
  width: 100px; /* 적절한 크기로 설정 */
  height: 100px; /* 적절한 크기로 설정 */
  z-index: 1001; /* 모달보다 높은 z-index */
`;

const CustomModal = ({ children, flexDirection, width, maxHeight, gap, alignItems, justifyContent, padding, onClose }) => {

    useEffect(() => {
        // 모달이 열릴 때 body의 overflow를 hidden으로 설정
        document.body.style.overflow = 'hidden';

        // 컴포넌트가 unmount될 때 body의 overflow를 auto로 설정
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    const modalRef = useRef(null);
    const [featherPosition, setFeatherPosition] = useState({ right: 0, bottom: 0 });

    useEffect(() => {
        const modalElement = modalRef.current;
        if (modalElement) {
            const handleResize = () => {
                const { right, bottom } = modalElement.getBoundingClientRect();
                setFeatherPosition({
                    right: window.innerWidth - right - 50,
                    bottom: window.innerHeight - bottom - 100
                });
            };
            handleResize();
            window.addEventListener('resize', handleResize);
            return () => {
                window.removeEventListener('resize', handleResize);
            };
        }
    }, [modalRef.current]);


    return (
        <>
            <ModalOverlay>
                <ModalContainer
                    ref={modalRef}
                    flexDirection={flexDirection}
                    width={width}
                    maxHeight={maxHeight}
                    gap={gap}
                    alignItems={alignItems}
                    justifyContent={justifyContent}
                    padding={padding}
                >
                    <ModalHeader>
                        <CustomRow width='90%' alignItems='center' justifyContent='space-between'>
                            <CustomRow width='30%' alignItems='center' justifyContent='space-around'>
                                <Circle color='#EC6A5E' />
                                <Circle color='#F4BF4F' />
                                <Circle color='#61C554' />
                            </CustomRow>
                            <CloseButton onClick={onClose}>
                                <CustomFont color='white' font='1rem' fontWeight='bold'>
                                    X
                                </CustomFont>
                            </CloseButton>
                        </CustomRow>
                    </ModalHeader>
                    <ChildDiv maxHeight={maxHeight}>
                        {children}
                    </ChildDiv>
                </ModalContainer>
            </ModalOverlay>
            <FeatherImage
                src={'icon_feather.png'}
                style={{
                    right: `${featherPosition.right}px`,
                    bottom: `${featherPosition.bottom}px`
                }}
            />
        </>
    );
};

export default CustomModal;

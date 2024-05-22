
import React, { useState, useEffect } from 'react';
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
  height: ${props => props.height || 'auto'};
  max-height: 80vh;
  gap: ${props => props.gap || '30px'};
  align-items: ${props => props.alignItems || 'flex-start'};
  justify-content: ${props => props.justifyContent || 'flex-start'};

  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  position: relative;
  padding-bottom: 10px;
`;

const ChildDiv = styled.div`
overflow-y: auto; /* 세로 스크롤 추가 */

  /* 스크롤바 스타일링 */
  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #3C3C3C;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-track {
    background-color: #f0f0f0;
    border-radius: 10px;
  }

  width: 100%;
  max-height: 80vh;
`;

const CloseButton = styled.button`
  position: absolute;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  right: 10px;
  background: none;
  border: 2px solid white;
  font-size: 1.5rem;
  cursor: pointer;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
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

const CustomModal = ({ children, flexDirection, width, height, gap, alignItems, justifyContent, padding, onClose }) => {

    useEffect(() => {
        // 모달이 열릴 때 body의 overflow를 hidden으로 설정
        document.body.style.overflow = 'hidden';

        // 컴포넌트가 unmount될 때 body의 overflow를 auto로 설정
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    return (
        <ModalOverlay>
            <ModalContainer
                flexDirection={flexDirection}
                width={width}
                height={height}
                gap={gap}
                alignItems={alignItems}
                justifyContent={justifyContent}
                padding={padding}
            >
                <ModalHeader>
                    <CustomRow width='100%' alignItems='center' justifyContent='space-between'>
                        <CustomRow width='30%' alignItems='center' justifyContent='center' gap='1rem'>
                            <Circle color='#EC6A5E' />
                            <Circle color='#F4BF4F' />
                            <Circle color='#61C554' />
                        </CustomRow>
                        <CloseButton onClick={onClose}>
                            <CustomFont color='white' font='0.7rem' fontWeight='bold'>
                                x
                            </CustomFont>
                        </CloseButton>
                    </CustomRow>
                </ModalHeader>

                <ChildDiv>
                    {children}
                </ChildDiv>
            </ModalContainer>
        </ModalOverlay>
    );
};

export default CustomModal;

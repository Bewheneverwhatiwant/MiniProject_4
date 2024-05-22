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
  max-height: ${props => props.maxHeight || '90vh'};
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
  overflow-y: auto;
  max-height: ${props => props.maxHeight || '90vh'};

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
`;

const FeatherImage = styled.img`
  position: absolute;
  width: 100px;
  height: 100px;
  z-index: 1001;
`;

const CustomModal = ({ children, flexDirection, width, maxHeight, gap, alignItems, justifyContent, padding, onClose }) => {
    const modalRef = useRef(null);
    const [featherPosition, setFeatherPosition] = useState({ right: 0, bottom: 0 });

    useEffect(() => {
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    useEffect(() => {
        const handleResize = () => {
            if (modalRef.current) {
                const { right, bottom } = modalRef.current.getBoundingClientRect();
                setFeatherPosition({
                    right: window.innerWidth - right - 50,
                    bottom: window.innerHeight - bottom + 100
                });
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
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

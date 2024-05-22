import React from 'react';
import styled from 'styled-components';

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
  gap: ${props => props.gap || '30px'};
  align-items: ${props => props.alignItems || 'flex-start'};
  justify-content: ${props => props.justifyContent || 'flex-start'};
  padding: ${props => props.padding || '10px'};
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`;

const CustomModal = ({ children, flexDirection, width, height, gap, alignItems, justifyContent, padding, onClose }) => {
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
                <CloseButton onClick={onClose}>-</CloseButton>
                {children}
            </ModalContainer>
        </ModalOverlay>
    );
};

export default CustomModal;

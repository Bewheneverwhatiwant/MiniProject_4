import React from 'react';
import styled from 'styled-components';

const ChatContainer = styled.div`
    display: flex;
    flex-direction: ${(props) => (props.isMe ? 'row-reverse' : 'row')};
    align-items: flex-start;
    margin: 10px;
`;

const OwlImage = styled.img`
    width: 50px;
    height: 50px;
    margin: ${(props) => (props.isMe ? '0 0 0 10px' : '0 10px 0 0')};
`;

const SpeechBubble = styled.div`
    border: 3px solid #8CC63F;
    background-color: #FFFBF0;
    border-radius: 150px;
    border-top-left-radius: ${(props) => (props.isMe ? '150px' : '0')};
    border-top-right-radius: ${(props) => (props.isMe ? '0' : '150px')};
    padding: 10px;
    max-width: 70%;
    word-wrap: break-word;
`;

const CustomChat = ({ text, imageSrc, isMe }) => {
    const defaultImage = '/path/to/icon_boo_glass.png';
    return (
        <ChatContainer isMe={isMe}>
            <OwlImage src={imageSrc || defaultImage} alt="Owl Icon" isMe={isMe} />
            <SpeechBubble isMe={isMe}>
                {text}
            </SpeechBubble>
        </ChatContainer>
    );
};

export default CustomChat;

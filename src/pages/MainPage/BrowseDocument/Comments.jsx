// Comments.jsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useAuth } from '../../SubPage/AuthContext';

import CustomColumn from '../../../Components/Container/CustomColumn';
import CustomRow from '../../../Components/Container/CustomRow';
import CustomFont from '../../../Components/Container/CustomFont';
import StyledImg from '../../../Components/Container/StyledImg';

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

const CommentModal = styled.div`
  background: white;
  padding: 1rem;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 30%;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  border: 2px solid #8CC63F;
  border-radius: 20px;
`;

const Input_2 = styled.input`
  width: 90%;
  padding: 0.5rem;
  border: 1px solid #8CC63F;
  border-radius: 10px;
`;

const Button = styled.button`
width: 30%;
  padding: 10px;
  background-color: #8cc63f;
  border: none;
  color: white;
  cursor: pointer;
  border-radius: 20px;
  height: 5vh;

  &:hover {
    background-color: #78ab34;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const CommentContainer = styled.div`
width: 100%;
  max-height: 200px;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #ccc;

  overflow-y: auto;

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

const CommentItem = styled.div`
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.7rem;
`;

const Content = styled.div`
width: 90%;
display: flex;
align-items: center;
justify-content: flex-start;
background-color: #C1EEA5;
border-radius: 10px;
padding: 10px;
color: black;
line-height: 1rem;
`;

const Content_edit = styled.div`
width: 90%;
display: flex;
flex-direction: column;
align-items: center;
justify-content: flex-start;
background-color: #FFEDFC;
border-radius: 10px;
padding: 10px;
color: black;
line-height: 1rem;
gap: 0.7rem
`;

const EditDelete = styled.button`
border: none;
background-color: #C1EEA5;
padding: 10px;
border-radius: 20px;
display: flex;
align-items: center;
justify-content: center;

cursor: pointer;

&:hover {
    background-color: #78ab34;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const LikeContent = styled.button`
background-color: transparent;
display: flex;
align-items: center;
justify-content: center;
border: none;
cursor: pointer;
`;

const ButtonX = styled.button`
border: none;
border-radius: 20px;
background-color: #D9D9D9;
padding: 6px;
color: white;
`;

export default function Comments({ docName, docUserName, onClose }) {
    const [comment, setComment] = useState('');
    const { isLoggedIn, logout } = useAuth(); // useAuth를 이용하여 로그인 상태 가져오기
    const [userData, setUserData] = useState({ username: '' });
    const [comments, setComments] = useState([]);
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [newContent, setNewContent] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            console.log('댓글 컴포넌트 정보 요청 시작');
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_IP}/user_total_info`);
                console.log(response.data);
                const user = response.data.find(user => user.username === isLoggedIn);
                if (user) {
                    console.log('유저 확인!');
                    setUserData({ username: user.username, });
                    console.log({ username: user.username, });
                }
            } catch (error) {
                console.error('Failed to fetch user data', error);
            }
        };

        if (isLoggedIn) {
            fetchUserData();
        }
    }, [isLoggedIn]);

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleCommentSubmit = async () => {
        try {
            if (!userData.username) {
                console.error('사용자 정보가 없습니다.');
                console.log('댓글을 달려고 하는 문서 정보는');
                console.log(docUserName);
                console.log(docName);
                return;
            }

            // 현재 로그인한 사용자의 이름을 user_name으로 사용
            const response = await axios.get(`${process.env.REACT_APP_SERVER_IP}/get_doc_id`, {
                params: { user_name: docUserName, doc_name: docName }
            });

            const docId = response.data;

            await axios.post(`${process.env.REACT_APP_SERVER_IP}/create_comment`, null, {
                params: { doc_id: docId, user_name: userData.username, content: comment }
            });

            alert('댓글을 성공적으로 작성했습니다!');
            console.log('댓글을 달려고 하는 문서 정보는');
            console.log(docUserName);
            console.log(docName);
            setComment(''); // 댓글 입력란 초기화

            // 댓글 목록 갱신
            const commentsResponse = await axios.get(`${process.env.REACT_APP_SERVER_IP}/get_document_comments`, {
                params: { doc_id: docId }
            });
            setComments(commentsResponse.data);

        } catch (error) {
            console.error('댓글 달기 실패', error);
            console.log('댓글을 달려고 하는 문서 정보는');
            console.log(docUserName);
            console.log(docName);
        }
    };

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_IP}/get_doc_id`, {
                    params: { user_name: docUserName, doc_name: docName }
                });
                const docId = response.data;
                const commentsResponse = await axios.get(`${process.env.REACT_APP_SERVER_IP}/get_document_comments`, {
                    params: { doc_id: docId }
                });
                setComments(commentsResponse.data);
            } catch (error) {
                console.error('댓글을 불러오는 데 실패했습니다.', error);
            }
        };

        fetchComments();
    }, [docName, docUserName]); // 모달이 열릴 때마다 댓글 목록을 가져옴

    const handleEditClick = (commentId, currentContent) => {
        setEditingCommentId(commentId);
        setNewContent(currentContent);
    };

    const handleEditChange = (e) => {
        setNewContent(e.target.value);
    };

    const handleEditSubmit = async (commentId) => {
        try {
            await axios.put(`${process.env.REACT_APP_SERVER_IP}/update_comment`, null, {
                params: { comment_id: commentId, new_content: newContent }
            });

            alert('나의 댓글이 성공적으로 수정되었습니다!');
            setEditingCommentId(null);
            setNewContent('');

            // 댓글 목록 갱신
            const response = await axios.get(`${process.env.REACT_APP_SERVER_IP}/get_doc_id`, {
                params: { user_name: docUserName, doc_name: docName }
            });

            const docId = response.data;
            const commentsResponse = await axios.get(`${process.env.REACT_APP_SERVER_IP}/get_document_comments`, {
                params: { doc_id: docId }
            });
            setComments(commentsResponse.data);
        } catch (error) {
            console.error('댓글 수정 실패', error);
        }
    };

    const handleCancelEdit = () => {
        setEditingCommentId(null);
        setNewContent('');
    };

    const handleDeleteClick = async (commentId) => {
        try {
            await axios.delete(`${process.env.REACT_APP_SERVER_IP}/delete_comment`, {
                params: { comment_id: commentId }
            });

            alert('댓글이 삭제되었습니다!');

            // 댓글 목록 갱신
            const response = await axios.get(`${process.env.REACT_APP_SERVER_IP}/get_doc_id`, {
                params: { user_name: docUserName, doc_name: docName }
            });

            const docId = response.data;
            const commentsResponse = await axios.get(`${process.env.REACT_APP_SERVER_IP}/get_document_comments`, {
                params: { doc_id: docId }
            });
            setComments(commentsResponse.data);
        } catch (error) {
            console.error('댓글 삭제 실패', error);
        }
    };

    const handleLikeClick = async (commentId) => {
        // 좋아요 클릭 시 프론트엔드 상태 즉시 업데이트
        setComments(prevComments =>
            prevComments.map(comment =>
                comment.id === commentId ? { ...comment, likeCount: (comment.likeCount || 0) + 1 } : comment
            )
        );

        try {
            await axios.put(`${process.env.REACT_APP_SERVER_IP}/update_comment_like`, null, {
                params: { comment_id: commentId }
            });

            console.log('댓글 좋아요 성공');

            // 댓글의 좋아요 수를 갱신하기 위해 서버에서 데이터 가져오기
            const likeResponse = await axios.get(`${process.env.REACT_APP_SERVER_IP}/get_comment_likes`, {
                params: { comment_id: commentId }
            });
            const updatedLikes = likeResponse.data.likeCount;
            console.log(commentId);
            console.log(updatedLikes);

            // 이걸 추가하면 상태 업데이트 시 자꾸 에러남-> 잠시 빼두기
            // // 서버 응답을 기반으로 댓글 목록을 다시 설정하여 증가된 likeCount를 반영
            // setComments(prevComments =>
            //     prevComments.map(comment =>
            //         comment.id === commentId ? { ...comment, likeCount: updatedLikes } : comment
            //     )
            // );

        } catch (error) {
            console.error('댓글 좋아요 실패', error);
        }
    };


    return (
        <ModalOverlay>
            <CommentModal>
                <CustomColumn width='100%' alignItems='center' justifyContent='center'>
                    <CustomRow width='100%' alignItems='center' justifyContent='space-between'>
                        <CustomFont font="1rem" color="#558811" fontWeight='bold'>댓글을 입력하세요.</CustomFont>
                        <ButtonX onClick={onClose}>X</ButtonX>
                    </CustomRow>

                    <CustomRow width='100%' alignItems='center' justifyContent='space-between' gap='1rem'>
                        <Input
                            type="text"
                            value={comment}
                            onChange={handleCommentChange}
                            placeholder="미풍양속을 해치지 않는 댓글을 달아주세요."
                        />

                        <Button onClick={handleCommentSubmit}>
                            <CustomFont color='white' fontWeight='bold' font='1rem'>작성하기</CustomFont>
                        </Button>
                    </CustomRow>

                    <CommentContainer>
                        {comments.length > 0 ? (
                            comments.map((commentItem, index) => (
                                <CommentItem key={index}>
                                    <CustomRow width='90%' alignItems='center' justifyContent='flex=start'>
                                        <CustomFont color='#8CC63F' font='1rem' fontWeight='bold'>{commentItem.userName}</CustomFont>
                                        <CustomRow>
                                            <LikeContent onClick={() => handleLikeClick(commentItem.id)}>
                                                <StyledImg src={'icon_like_button.png'} width='20px' height='20px' />
                                            </LikeContent>

                                            <CustomFont color='#558811' font='0.9rem' fontWeight='bold'>
                                                좋아요 {commentItem.likeCount}개
                                            </CustomFont>
                                        </CustomRow>
                                    </CustomRow>
                                    <Content>
                                        <CustomFont color='black' font='1rem'>{commentItem.content}</CustomFont>
                                    </Content>
                                    {userData.username === commentItem.userName && (
                                        <CustomColumn width='90%' alignItems='center' justifyContent='space-between' gap='0.7rem'>
                                            <CustomRow width='100%' alignItems='center' justifyContent='space-between' gap='0.7rem'>

                                                <CustomRow>
                                                    <EditDelete onClick={() => handleEditClick(commentItem.id, commentItem.content)}>
                                                        <CustomFont color='#558811' font='0.7rem' fontWeight='bold'>
                                                            수정
                                                        </CustomFont>
                                                    </EditDelete>
                                                    <EditDelete onClick={() => handleDeleteClick(commentItem.id)}>
                                                        <CustomFont color='#558811' font='0.7rem' fontWeight='bold'>
                                                            삭제
                                                        </CustomFont>
                                                    </EditDelete>
                                                </CustomRow>
                                            </CustomRow>
                                            {editingCommentId === commentItem.id && (
                                                <Content_edit>
                                                    <Input_2
                                                        type="text"
                                                        value={newContent}
                                                        onChange={handleEditChange}
                                                        placeholder="수정할 내용을 입력하세요."
                                                    />
                                                    <CustomRow width='100%' alignItems='center' justifyContent='space-between'>
                                                        <EditDelete
                                                            onClick={() => handleEditSubmit(commentItem.id)}
                                                            disabled={!newContent.trim()}
                                                        >
                                                            <CustomFont color='#558811' font='0.7rem' fontWeight='bold'>
                                                                수정완료
                                                            </CustomFont>
                                                        </EditDelete>
                                                        <EditDelete onClick={handleCancelEdit}>
                                                            <CustomFont color='#558811' font='0.7rem' fontWeight='bold'>
                                                                취소
                                                            </CustomFont>
                                                        </EditDelete>
                                                    </CustomRow>
                                                </Content_edit>
                                            )}
                                        </CustomColumn>
                                    )}
                                </CommentItem>
                            ))
                        ) : (
                            <CustomFont color='gray' font='1rem'>아직 댓글이 없습니다</CustomFont>
                        )}
                    </CommentContainer>
                </CustomColumn>
            </CommentModal>
        </ModalOverlay>
    );
}

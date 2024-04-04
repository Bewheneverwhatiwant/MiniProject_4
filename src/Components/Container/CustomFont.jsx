import styled from 'styled-components';

const CustomFont = styled.a`
  font-size: ${props => props.font || '0.8rem'};
  color: ${props => props.color || '#F0F0F0'};
  font-weight: ${props => props.fontWeight || 'normal'};
`;

export default CustomFont;
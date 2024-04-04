import styled from 'styled-components';

const CustomCenter = styled.div`
  display: flex;
  align-items: center;
  width: ${props => props.width || 'auto'};
  height: ${props => props.height || 'auto'};
`;

export default CustomCenter;
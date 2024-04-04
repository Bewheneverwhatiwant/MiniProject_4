import styled from 'styled-components';

const CustomColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: ${props => props.width || 'auto'};
  height: ${props => props.height || 'auto'};
  gap: ${props => props.gap || '30px'};
  align-items: ${props => props.alignItems || 'flex-start'};
  justify-content: ${props => props.justifyContent || 'flex-start'};
`;

export default CustomColumn;
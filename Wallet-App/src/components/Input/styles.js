import styled, { css } from 'styled-components/native';

import FeatherIcon from 'react-native-vector-icons/Feather';

export const Container = styled.View`
  width: 350px;
  height: 60px;
  padding: 0 16px;
  background: #fff;
  margin: 8px auto;
  border-width: 1px;
  border-color: #232129;

  ${props =>
    props.isFocused &&
    css`
      border-color: #232129;
    `}

  flex-direction: row;
  align-items: center;
`;

export const TextInput = styled.TextInput`
  flex: 1;
  color: #000;
  font-size: 16px;
`;

export const Icon = styled(FeatherIcon)`
  margin-right: 8px;
`;

import React from 'react';

import { Container, ButtonText } from './styles';

function Button({ children, ...rest }) {
  return (
    <Container {...rest}>
      <ButtonText>{children}</ButtonText>
    </Container>
  );
}

export default Button;

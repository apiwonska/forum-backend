import React from 'react';
import ReactDOM from 'react-dom';

import SVGIcon from '../../icons/SVGIcon';
import {
  ModalBackground,
  ModalBody,
  Header,
  Title,
  CloseButton,
  Content,
} from './style';

export default ({ title, children, handleDismiss }) => {
  return ReactDOM.createPortal(
    <ModalBackground onClick={handleDismiss}>
      <ModalBody onClick={(e) => e.stopPropagation()}>
        <Header>
          <CloseButton onClick={handleDismiss}>
            <SVGIcon name="x_mark" />
          </CloseButton>
          <Title>{title}</Title>
        </Header>
        <Content>{children}</Content>
      </ModalBody>
    </ModalBackground>,
    document.querySelector('#modal')
  );
};

import React from 'react';
import PT from 'prop-types';

const MenuButton = ({onPress = () => {}, disabled = false, title, fontSize=16}) => {
  return (
    <div
      style={{ fontSize }}
      className="menuButton"
      onClick={onPress}>{title}</div>
  );
};

MenuButton.propTypes = {
  onPress: PT.func,
  disabled: PT.bool,
  title: PT.string.isRequired
};

export { MenuButton };
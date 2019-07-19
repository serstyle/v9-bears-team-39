import React from 'react';
import Button from '@material-ui/core/Button';

export default function OutlinedButtons(props) {
  // eslint-disable-next-line react/prop-types
  const {
    name,
    onClick,
    variant,
    color,
    className,
    size,
    icon,
    disabled,
  } = props;
  return (
    <Button
      variant={variant}
      onClick={onClick}
      color={color}
      className={className}
      size={size}
      disabled={disabled}
    >
      {icon}
      {name}
    </Button>
  );
}

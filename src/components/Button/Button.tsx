import { ReactElement } from 'react';
import { ButtonProps } from '../../types/button';
import styles from './Button.module.scss';

function Button({ children, ...props }: ButtonProps): ReactElement {
  return (
    <button style={styles} {...props}>
      {children}
    </button>
  );
};

export default Button;

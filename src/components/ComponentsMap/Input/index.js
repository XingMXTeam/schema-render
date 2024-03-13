import React, { Input as NextInput } from '@alifd/next';
import { PropTypes } from 'mobx-react';

function Input(props) {
  return <NextInput {...props} onChange={props.onChange}></NextInput>;
}

Input.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default Input;

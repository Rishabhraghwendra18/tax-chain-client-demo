import React from 'react';
import { Form } from "react-bootstrap";
import './index.css';

function Select({onChange,children,placeholder,styles,disabled}) {
  return (
    <Form.Control
    as="select"
    style={{
      background: 'black',
      color: 'white',
      border: '1px solid lightgrey',
      ...styles
    }}
    onChange={onChange}
    className="custom-select"
    placeholder={placeholder}
    disabled={disabled}
    >
        {children}
    </Form.Control>
  )
}

export default Select;
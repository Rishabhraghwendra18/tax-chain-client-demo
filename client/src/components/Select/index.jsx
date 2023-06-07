import React from 'react';
import { Form } from "react-bootstrap";
import './index.css';

function Select({onChange,children,placeholder,styles,disabled}) {
  return (
    <Form.Select
    // as="select"
    style={{
      background: 'black',
      color: 'white',
      border: '1px solid lightgrey',
      ...styles
    }}
    custom
    onChange={onChange}
    className="custom-select"
    placeholder={placeholder}
    disabled={disabled}
    >
        {children}
    </Form.Select>
  )
}

export default Select;
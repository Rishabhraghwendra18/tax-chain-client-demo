import React from 'react'
import './index.css';

function Button({children,onClick=()=>{},style,type,disabled}) {
  return (
    <button onClick={onClick} style={style} className='custom-green-button' type={type} disabled={disabled}>{children}</button>
  )
}

export default Button;  
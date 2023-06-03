import React from 'react'
import './index.css';

function Button({children,onClick=()=>{},style,type}) {
  return (
    <button onClick={onClick} style={style} className='custom-green-button' type={type}>{children}</button>
  )
}

export default Button;  
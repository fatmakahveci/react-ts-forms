'use client';

import React from "react";
import './Card.css';

const Card = (props: any) => {
  return (
    <div className={`card ${props.cssName}`}>
        {props.children}
    </div>
  )
}

export default Card;
"use client";

import './rabbit.css';

export function RabbitAnimation() {
  return (
    <div 
      className="animation-container absolute right-0 top-1/2 -translate-y-1/2 z-50 cursor-pointer hidden md:flex" 
      onClick={() => {
        document.getElementById('interactive-console')?.scrollIntoView({ behavior: 'smooth' });
      }}
    >
      <div className="rabbit-wrapper">
        <div className="rabbit">
          <div className="ears left-ear"></div>
          <div className="ears right-ear"></div>
          <div className="face">
            <div className="eyes left-eye"></div>
            <div className="eyes right-eye"></div>
            <div className="blush left-blush"></div>
            <div className="blush right-blush"></div>
            <div className="nose"></div>
            <div className="mouth"></div>
          </div>
        </div>
        <div className="speech-bubble">Check out my AI!</div>
      </div>
    </div>
  );
}

import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

// Importing all 24 images
import cs1 from '../Images/cs1.png'; import cs2 from '../Images/cs2.png';
import cs3 from '../Images/cs3.png'; import cs4 from '../Images/cs4.png';
import cs5 from '../Images/cs5.png'; import cs6 from '../Images/cs6.png';
import cs7 from '../Images/cs7.png'; import cs8 from '../Images/cs8.png';
import cs9 from '../Images/cs9.png'; import cs10 from '../Images/cs10.png';
import cs11 from '../Images/cs11.png'; import cs12 from '../Images/cs12.png';
import cs13 from '../Images/cs13.png'; import cs14 from '../Images/cs14.png';
import cs15 from '../Images/cs15.png'; import cs16 from '../Images/cs16.png';
import cs17 from '../Images/cs17.png'; import cs18 from '../Images/cs18.png';
import cs19 from '../Images/cs19.png'; import cs20 from '../Images/cs20.png';
import cs21 from '../Images/cs21.png'; import cs22 from '../Images/cs22.png';
import cs23 from '../Images/cs23.png'; import cs24 from '../Images/cs24.png';

const logos = [
  cs1, cs2, cs3, cs4, cs5, cs6, cs7, cs8, cs9, cs10, 
  cs11, cs12, cs13, cs14, cs15, cs16, cs17, cs18, cs19, cs20, 
  cs21, cs22, cs23, cs24
];

const LogoTicker = () => {
  return (
    <TickerWrapper>
      <motion.div
        className="track"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 40, ease: "linear", repeat: Infinity }}
      >
        {/* Duplicating the array to ensure an infinite, seamless loop */}
        {[...logos, ...logos].map((src, index) => (
          <LogoItem key={index}>
            <img src={src} alt={`Service provider ${index + 1}`} />
          </LogoItem>
        ))}
      </motion.div>
    </TickerWrapper>
  );
};

const TickerWrapper = styled.div`
  width: 100%;
  overflow: hidden;
  padding: 10px 0;
  background: #ffffff;
  border-bottom: 1px solid #e2e8f0;
  border-top: 1px solid #e2e8f0;

  .track {
    display: flex;
    gap: 10px; /* Adhering to max 10px constraint */
    width: max-content;
  }
`;

const LogoItem = styled.div`
  flex: 0 0 auto;
  width: 100px; 
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  border: 1px solid #f1f5f9;
  border-radius: 6px;
  background: #f8fafc;
  
  img { 
    width: 90%; 
    height: 90%; 
    object-fit: contain; 
    // filter: grayscale(0.8);
    transition: all 0.3s ease;
  }

  &:hover img { 
    filter: grayscale(0); 
    transform: scale(1.15);
  }
`;

export default LogoTicker;
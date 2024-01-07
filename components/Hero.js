import Image from 'next/image';
import styled from "styled-components";

const StyledHero = styled.div`
  background-color: #232323;
  height: 50%; 
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("/images/hero.png");
`;

const StyledText = styled.div`
  text-align: center;
  color: white;
  z-index: 1;
  padding: 100px;
`;

export default function Hero() {
  return (
    <StyledHero>
      <Image
        src="/images/hero.png"
        alt="Hero"
        layout="fill"
        objectFit="cover"
        quality={100}
      />
      <StyledText>
        <h1>Your Hero Text</h1>
        <p>Additional information or description</p>
        
      </StyledText>
    </StyledHero>
  );
}

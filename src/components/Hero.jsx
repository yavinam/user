import React from "react";
import { useStore } from "../zustand";

const Hero = () => {
  const { increaseCount } = useStore();
  return (
    <>
      <div>Hero</div>
      <button onClick={increaseCount}>Increment</button>
    </>
  );
};

export default Hero;

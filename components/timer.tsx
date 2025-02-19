"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";

const Timer = () => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(
    () => {
      if(isActive) {
        timerRef.current = window.setInterval(
          () => {
            setSeconds((prev) => prev + 1);
          },
          1000
        );
      } else {
        if(timerRef.current) {
          window.clearInterval(timerRef.current);
        }
      }
      return () => {
        if(timerRef.current) {
          window.clearInterval(timerRef.current);
        }
      };
    },
    [isActive]
  );

  const onStart = () => setIsActive(true);
  const onStop = () => setIsActive(false);
  const onReset = () => {
    setIsActive(false);
    setSeconds(0);
  };

  return (<>
    <div className="flex flex-col items-center justify-center w-full bg-gray-200 p-1">
      <div className="flex items-center justify-center text-3xl font-semibold bg-white p-1 mb-1">
        time: {seconds}
      </div>
      <div className="flex items-center justify-center w-full p-1">
        <Button size="sm" className="ml-4" onClick={onStart} disabled={isActive}>Start</Button>
        <Button size="sm" className="ml-4" onClick={onStop} disabled={!isActive}>Stop</Button>
        <Button size="sm" className="ml-4" onClick={onReset}>Reset</Button>
      </div>
    </div>
  </>);

};

export default Timer;
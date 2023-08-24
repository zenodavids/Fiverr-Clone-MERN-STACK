import React, { useState, useEffect } from 'react';

const CountDown = ({ initialTimeLeft }) => {
  const [timeLeft, setTimeLeft] = useState(initialTimeLeft);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  function calculateTimeLeft() {
    const targetDateString = '2023-08-30T00:23:00';
    const targetDate = new Date(targetDateString);
    const now = Date.now();
    const difference = targetDate - now;

    if (difference < 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  }

  if (!timeLeft) {
    return null;
  }

  const { days, hours, minutes, seconds } = timeLeft;

  return (
    <>
      {' '}
      {days === 0 && hours === 0 && minutes === 0 && seconds === 0 ? (
        <div className='text-3xl font-bold'>CountDown Completed!</div>
      ) : (
        <span className='font-bold text-5xl text-yellow-300'>
          {days} : {hours} : {minutes} : {seconds}
        </span>
      )}
    </>
  );
};

export async function getServerSideProps() {
  const initialTimeLeft = calculateTimeLeft();
  return { props: { initialTimeLeft } };
}

export default CountDown;

import { Link } from '@remix-run/react';

const Welcome = () => {
  return (
    <>
      <h1>Welcome!</h1>
      <div>
        <p>
          Have you ever wanted to see what your best lap times were in different sim racing games?
          Maybe you want to see how fast you were in a specific vehicle on that track. Now with the
          SimRacing Tracker you can input your fastest times for each track, car and series
          (iRacing).
        </p>
      </div>

      <h2>Getting Started</h2>
      <p>
        First you will need to create an account. Please follow the{' '}
        <Link to="/signup" className="inline-link">
          Sign-Up
        </Link>{' '}
        page to create your account in order to save you data.
      </p>
    </>
  );
};

export default Welcome;

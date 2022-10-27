import { Link } from '@remix-run/react';

import { getUser } from '../utils/session.server';

const Welcome = () => {
  return (
    <>
      <h1 className="text-6xl font-normal leading-normal mt-0 mb-2">Welcome!</h1>
      <div>
        <p>
          Have you ever wanted to see what your best lap times were in different sim racing games?
          Maybe you want to see how fast you were in a specific vehicle on that track. Now with the
          SimRacing Tracker you can input your fastest times for each track, car and series.
        </p>
      </div>
      {getUser === null && (
        <>
          <h2>Getting Started</h2>
          <p>
            First you will need to create an account. Please follow the{' '}
            <Link
              to="/auth/signup"
              className="text-black underline font-extrabold text-xl hover:bg-yellow-500 hover:text-black hover:font-extrabold"
            >
              Sign-Up
            </Link>{' '}
            page to create your account in order to save you data.
          </p>
        </>
      )}
    </>
  );
};

export default Welcome;

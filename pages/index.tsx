import { useState } from 'react';
// import Dashboard from './dashboard';
// import Welcome from './welcome';

// import { getUser } from '../utils/session.server';

// export const loader = async ({ request }) => {
//   const user = await getUser(request);
//   const data = {
//     user,
//   };
//   return data;
// };

const Home = () => {
  //const [isLoggedIn, setIsLoggedIn] = useState(false);
  // return <>{isLoggedIn ? <Dashboard /> : <Welcome />}</>;
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
    </>
  );
};

export default Home;

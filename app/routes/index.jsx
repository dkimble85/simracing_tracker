import { useState } from 'react';
import Dashboard from './dashboard';
import Welcome from './welcome';

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  return <>{isLoggedIn ? <Dashboard /> : <Welcome />}</>;
};

export default Home;

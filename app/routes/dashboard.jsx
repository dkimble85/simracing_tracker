import { Link } from '@remix-run/react';

const Dashboard = () => {
  return (
    <>
      <h1>Dashboard</h1>
      <div>
        <Link className="btn" to="/times">
          View Times
        </Link>
      </div>
    </>
  );
};

export default Dashboard;

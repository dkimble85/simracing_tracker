import { Link } from '@remix-run/react';

const Time = () => {
  const user = {
    name: 'Danny',
  };

  const data = null;

  return (
    <>
      <div className="page-header">
        <h1>Times for {user.name}</h1>
        <Link to="/times/new" className="btn">
          Post New Time
        </Link>
      </div>
      <div className="page-content">{data ? data : `No times posted yet for ${user.name}`}</div>
    </>
  );
};

export default Time;

import { useLoaderData, Link } from '@remix-run/react';
import { db } from '../../utils/db.server';

export const loader = async () => {
  const data = {
    // can just use findMany() to find all posts or you can define what is retrieved and how it is returned
    times: await db.time.findMany({
      take: 20,
      select: { id: true, time: true, track: true, game: true, vehicle: true, createdAt: true },
      orderBy: { game: 'desc' },
    }),
  };

  return data;
};

const Time = () => {
  const { times } = useLoaderData();

  const data = null;

  return (
    <>
      <div className="page-header">
        <h1>Times</h1>
        <Link to="/times/new" className="btn">
          Post New Time
        </Link>
      </div>
      <ul className="times-list">
        {times.map((time) => (
          <li key={time.id}>
            <Link to={time.id}>
              <h3>{time.time}</h3>
              {time.track}
              <br />
              {time.vehicle}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Time;

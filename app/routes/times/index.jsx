import { useLoaderData, Link } from '@remix-run/react';
import { db } from '../../utils/db.server';

export const loader = async () => {
  const data = {
    // can just use findMany() to find all times or you can define what is retrieved and how it is returned
    times: await db.trackTimes.findMany(),
  };

  return data;
};

const Time = () => {
  const { times } = useLoaderData();

  return (
    <>
      <div className="flex justify-between items-center mb-10">
        <h1>Times</h1>
        <Link to="/times/new" className="btn">
          Post New Time
        </Link>
      </div>
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-slate-300 border-b">
                  <tr>
                    <th
                      scope="col"
                      className="text-large font-large text-black px-6 py-4 text-left"
                    >
                      Game
                    </th>
                    <th
                      scope="col"
                      className="text-large font-large text-black px-6 py-4 text-left"
                    >
                      Track
                    </th>
                    <th
                      scope="col"
                      className="text-large font-large text-black px-6 py-4 text-left"
                    >
                      Vehicle
                    </th>
                    <th
                      scope="col"
                      className="text-large font-large text-black px-6 py-4 text-left"
                    >
                      Time
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {times.map((time) => (
                    <tr
                      key={time.id}
                      className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100 [padding:0.75rem]"
                    >
                      <td>{time.game}</td>
                      <td>{time.track}</td>
                      <td>{time.vehicle}</td>
                      <td>{time.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Time;

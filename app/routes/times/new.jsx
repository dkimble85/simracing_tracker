import { Link } from '@remix-run/react';
import { redirect } from '@remix-run/node';
import { db } from '../../utils/db.server';

export const action = async ({ request }) => {
  const form = await request.formData();
  const game = form.get('game');
  const track = form.get('track');
  const vehicle = form.get('vehicle');
  const time = form.get('time');

  const fields = {
    game,
    track,
    vehicle,
    time,
    updatedAt: new Date('2022-04-01T14:21:00+0200'),
    createdAt: new Date('2022-03-31T14:21:00+0200'),
  };

  const trackTime = await db.trackTimes.create({ data: fields });

  return redirect(`/times/${trackTime.id}`);
};

const NewTime = () => {
  return (
    <>
      <div className="page-header">
        <h1>Post New Time</h1>
        <Link to="/times" className="btn btn-reverse">
          Back
        </Link>
      </div>

      <div className="page-content">
        <form method="POST">
          <div className="form-control">
            <label htmlFor="game">Game</label>
            <input type="text" name="game" id="game" />
          </div>
          <div className="form-control">
            <label htmlFor="track">Track</label>
            <input type="text" name="track" id="track" />
          </div>
          <div className="form-control">
            <label htmlFor="vehicle">Vehicle</label>
            <input type="text" name="vehicle" id="vehicle" />
          </div>
          <div className="form-control">
            <label htmlFor="time">Time</label>
            <input type="text" name="time" id="time" />
          </div>
          <button type="submit" className="btn btn-block">
            Add Time
          </button>
        </form>
      </div>
    </>
  );
};

export default NewTime;

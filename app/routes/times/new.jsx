import { Link, useActionData } from '@remix-run/react';
import { redirect, json } from '@remix-run/node';
import { db } from '../../utils/db.server';

const validate = (field, length) => {
  if (typeof length !== 'number') return;
  if (typeof field !== 'string' || field.length < length) {
    return `Game should be at least ${length} characters long`;
  }
};

const badRequest = (data) => {
  return json(data, { status: 400 });
};

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
    updatedAt: new Date().getTime(),
    createdAt: new Date().getTime(),
  };

  const fieldErrors = {
    game: validate(game, 3),
    track: validate(track, 3),
    vehicle: validate(vehicle, 3),
    time: validate(time, 5),
  };

  // Check if there are fields errors (validation) and return a bad request (400) with the field errors and values
  if (Object.values(fieldErrors).some(Boolean)) {
    console.log(fieldErrors);
    return badRequest({ fieldErrors, fields });
  }

  // Action to create new Track Times in DB
  const trackTime = await db.trackTimes.create({ data: fields });

  return redirect(`/times/${trackTime.id}`);
};

const NewTime = () => {
  const actionData = useActionData();
  return (
    <>
      <div className="flex justify-between items-center mb-10">
        <h1>Post New Time</h1>
        <Link to="/times" className="btn">
          Back
        </Link>
      </div>

      <div className="page-content">
        <form method="POST">
          <div className="form-control">
            <label htmlFor="game">Game</label>
            <input type="text" name="game" id="game" defaultValue={actionData?.fields?.game} />
            <div className="text-red">
              <p>{actionData?.fieldErrors?.game && actionData?.fieldErrors?.game}</p>
            </div>
          </div>
          <div className="form-control">
            <label htmlFor="track">Track</label>
            <input type="text" name="track" id="track" defaultValue={actionData?.fields?.track} />
            <div className="text-red">
              <p>{actionData?.fieldErrors?.track && actionData?.fieldErrors?.track}</p>
            </div>
          </div>
          <div className="form-control">
            <label htmlFor="vehicle">Vehicle</label>
            <input
              type="text"
              name="vehicle"
              id="vehicle"
              defaultValue={actionData?.fields?.vehicle}
            />
            <div className="text-red">
              <p>{actionData?.fieldErrors?.vehicle && actionData?.fieldErrors?.vehicle}</p>
            </div>
          </div>
          <div className="form-control">
            <label htmlFor="time">Time</label>
            <input type="text" name="time" id="time" defaultValue={actionData?.fields?.time} />
            <div className="text-red">
              <p>{actionData?.fieldErrors?.time && actionData?.fieldErrors?.time}</p>
            </div>
          </div>
          <button
            id="submitBtn"
            type="submit"
            className="block bg-yellow-400 text-black border-none rounded px-5 py-3 m-1 cursor-pointer no-underline text-base"
          >
            Add Time
          </button>
        </form>
      </div>
    </>
  );
};

export default NewTime;

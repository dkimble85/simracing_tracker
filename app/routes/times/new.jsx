import { Link, useActionData } from '@remix-run/react';
import { redirect, json } from '@remix-run/node';
import { db } from '../../utils/db.server';

const validate = (field, length) => {
  if (typeof length !== 'number') return;
  if (typeof field !== 'string' || field.length < length) {
    return `Game should be at least ${length} characters long`;
  }
};

// const validateGame = (game) => {
//   if (typeof game !== 'string' || game.length < 3) {
//     return 'Game should be at least 3 characters long';
//   }
// };

// const validateTrack = (track) => {
//   if (typeof track !== 'string' || track.length < 3) {
//     return 'Track should be at least 5 characters long';
//   }
// };

// const validateVehicle = (vehicle) => {
//   if (typeof vehicle !== 'string' || vehicle.length < 3) {
//     return 'Vehicle should be at least 3 characters long';
//   }
// };

// const validateTime = (time) => {
//   if (typeof time !== 'string' || time.length < 5) {
//     return 'Time should be at least 5 characters long';
//   }
// };

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

  if (Object.values(fieldErrors).some(Boolean)) {
    console.log(fieldErrors);
    return json({ fieldErrors, fields }, { status: 400 });
  }

  const trackTime = await db.trackTimes.create({ data: fields });

  return redirect(`/times/${trackTime.id}`);
};

const NewTime = () => {
  const actionData = useActionData();
  return (
    <>
      <div className="page-header">
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
            <div className="error">
              <p>{actionData?.fieldErrors?.game && actionData?.fieldErrors?.game}</p>
            </div>
          </div>
          <div className="form-control">
            <label htmlFor="track">Track</label>
            <input type="text" name="track" id="track" defaultValue={actionData?.fields?.track} />
            <div className="error">
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
            <div className="error">
              <p>{actionData?.fieldErrors?.vehicle && actionData?.fieldErrors?.vehicle}</p>
            </div>
          </div>
          <div className="form-control">
            <label htmlFor="time">Time</label>
            <input type="text" name="time" id="time" defaultValue={actionData?.fields?.time} />
            <div className="error">
              <p>{actionData?.fieldErrors?.time && actionData?.fieldErrors?.time}</p>
            </div>
          </div>
          <button id="submitBtn" type="submit" className="btn">
            Add Time
          </button>
        </form>
      </div>
    </>
  );
};

export default NewTime;

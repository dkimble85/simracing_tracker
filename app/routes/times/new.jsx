import { Link } from '@remix-run/react';

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

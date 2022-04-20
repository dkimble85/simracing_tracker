import { Link } from '@remix-run/react';

const SignUp = () => {
  return (
    <>
      <div className="page-header">
        <h1>Sign-Up for a new account</h1>
        <Link to="/" className="btn btn-reverse">
          Back
        </Link>
      </div>

      <div className="page-content">
        <form method="POST">
          <div className="form-control">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" />
          </div>
          <div className="form-control">
            <label htmlFor="username">Username</label>
            <input type="text" name="username" id="username" />
          </div>
          <div className="form-control">
            <label htmlFor="pword">Password</label>
            <input type="password" name="pword" id="pword" />
          </div>
          <button type="submit" className="btn btn-block">
            Sign Up
          </button>
        </form>
      </div>
    </>
  );
};

export default SignUp;

import { Link } from '@remix-run/react';

const SignUp = () => {
  return (
    <>
      <div className="flex justify-between items-center mb-10">
        <h1>Sign-Up for a new account</h1>
        <Link to="/" className="btn bg-white text-black border-black">
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
          <button
            type="submit"
            className="block bg-yellow-400 text-black border-none rounded px-5 py-3 m-1 cursor-pointer no-underline text-base max-w-1/4"
          >
            Sign Up
          </button>
        </form>
      </div>
    </>
  );
};

export default SignUp;

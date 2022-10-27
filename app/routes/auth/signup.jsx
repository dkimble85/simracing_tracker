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
          <div className="my-5 mx-0">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="my-5 mx-0">
            <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="my-5 mx-0">
            <label htmlFor="pword" className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              name="pword"
              id="pword"
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
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

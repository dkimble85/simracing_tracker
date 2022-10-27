import { useActionData } from '@remix-run/react';
import { redirect, json } from '@remix-run/node';
import { createUserSession, login } from '../../utils/session.server';

function validateUsername(username) {
  if (typeof username !== 'string' || username.length < 3) {
    return 'Username must be at least 3 characters';
  }
}

function validatePassword(password) {
  if (typeof password !== 'string' || password.length < 6) {
    return 'Password must be at least 6 characters';
  }
}

function badRequest(data) {
  return json(data, { status: 400 });
}

export const action = async ({ request }) => {
  const form = await request.formData();
  const loginType = form.get('loginType');
  const username = form.get('username');
  const password = form.get('password');

  const fields = { loginType, username, password };

  const fieldErrors = {
    username: validateUsername(username),
    password: validatePassword(password),
  };

  if (Object.values(fieldErrors).some(Boolean)) {
    return badRequest({ fieldErrors, fields });
  }

  switch (loginType) {
    case 'login': {
      // Find user
      const user = await login({ username, password });

      // Check user
      if (!user) {
        return badRequest({
          fields,
          fieldErrors: { username: 'Invalid credentials' },
        });
      }

      // Create Session
      return createUserSession(user.user_id, '/times');
    }
    case 'register': {
      // Check if user exists
      // const userExists = await db.user.findFirst({
      //   where: {
      //     username,
      //   },
      // });
      // if (userExists) {
      //   return badRequest({
      //     fields,
      //     fieldErrors: { username: `User ${username} already exists` },
      //   });
      // }
      // Create user
      // const user = await register({ username, password });
      // if (!user) {
      //   return badRequest({
      //     fields,
      //     formError: 'Something went wrong',
      //   });
      // }
      // Create session
      // return createUserSession(user.id, '/posts');
    }
    default: {
      return badRequest({
        fields,
        formError: 'Login type is invalid',
      });
    }
  }
};

const Login = () => {
  const actionData = useActionData();

  return (
    <div className="max-w-full m-auto">
      <div className="block">
        <h1 className="text-6xl font-normal leading-normal mt-0 mb-2 text-center">Login</h1>
      </div>

      <div>
        <form method="POST">
          <fieldset className="p-4 rounded">
            <legend>Login or Register</legend>
            <label className="mr-3 border-black">
              <input
                type="radio"
                name="loginType"
                value="login"
                className="max-w-1/2"
                defaultChecked={
                  !actionData?.fields?.loginType || actionData?.fields?.loginType === 'login'
                }
              />{' '}
              Login
            </label>

            <label className="mr-3">
              <input
                type="radio"
                name="loginType"
                value="register"
                className="max-w-1/2"
                defaultChecked={actionData?.fields?.loginType === 'register'}
              />{' '}
              Register
            </label>
          </fieldset>
          <div className="my-5 mx-0">
            <label htmlFor="username" className="block">
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              defaultValue={actionData?.fields?.username}
              className="h-10 m-2 py-1 px-2 border border-black rounded-md"
            />
            <div className="text-red">
              {actionData?.fieldErrors?.username ? (
                <p className="form-validation-error" role="alert" id="username-error">
                  {actionData.fieldErrors.username}
                </p>
              ) : null}
            </div>
          </div>

          <div className="my-5 mx-0">
            <label htmlFor="password" className="block">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              defaultValue={actionData?.fields?.password}
              className="h-10 m-2 py-1 px-2 border border-black rounded-md"
            />
            <div className="text-red">
              {actionData?.fieldErrors?.password ? (
                <p className="form-validation-error" role="alert" id="password-error">
                  {actionData.fieldErrors.password}
                </p>
              ) : null}
            </div>
          </div>

          <button
            className="block bg-yellow-400 text-black border-none rounded px-5 py-3 m-1 cursor-pointer no-underline text-base"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

import { Links, Link, NavLink, LiveReload, Meta, Outlet, useLoaderData } from '@remix-run/react';
import { db } from './utils/db.server';
import { getUser } from './utils/session.server';

import tailwindstyles from './tailwind.css';

export const meta = () => ({
  charset: 'utf-8',
  viewport: 'width=device-width,initial-scale=1',
  description:
    'An app to track your best times across different series, tracks and cars in Sim Racing games',
  keywords: 'react, remix, iRacing, sim racing, javascript',
});

export const links = () => [{ rel: 'stylesheet', href: tailwindstyles }];

export const loader = async ({ request }) => {
  const user = await getUser(request);
  const data = {
    user,
  };
  return data;
};

export default function App() {
  return (
    <Document title="SimRacing Tracker">
      <Layout>
        <Outlet />
      </Layout>
    </Document>
  );
}

const Document = ({ children, title }) => {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
        <title>{title ? title : 'SimRacing Tracker'}</title>
      </head>
      <body>
        {children}
        {process.env.NODE_ENV === 'development' ? <LiveReload /> : null}
      </body>
    </html>
  );
};

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div className="flex">
        <SideNav />
        <Content>{children}</Content>
      </div>
    </>
  );
};

const Header = () => {
  const { user } = useLoaderData();

  const convertNameCaps = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  return (
    <div className="flex">
      <nav className="flex grow flex-row-reverse justify-between items-center py-2 px-7 uppercase bg-black">
        <ul className="flex justify-between items-center">
          {user ? (
            <li className="ml-5 text-white">
              <form action="/auth/logout" method="POST">
                <button type="submit" className="btn">
                  Logout {convertNameCaps(user.username)}
                </button>
              </form>
            </li>
          ) : (
            <li className="ml-5 pr-2">
              <Link
                className="text-white uppercase text-md font-bold hover:text-zinc-600 hover:border-b-zinc-700"
                to="/auth/login"
              >
                Login
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

const SideNav = () => {
  const { user } = useLoaderData();

  let activeStyle = {
    backgroundColor: '#facc15',
    fontSize: '16px',
    fontWeight: 'bold',
  };

  return (
    <div className="w-40 h-full shadow-md bg-white absolute">
      <ul className="relative pt-3">
        <li className="relative">
          <NavLink
            className="flex items-center text-sm py-4 px-12 h-12 overflow-hidden text-gray-800 text-ellipsis whitespace-nowrap hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out"
            to="/"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Home
          </NavLink>
        </li>
        {user && (
          <li className="relative">
            <NavLink
              className="flex items-center text-sm py-4 px-12 h-12 overflow-hidden text-gray-800 text-ellipsis whitespace-nowrap hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out"
              to="/times"
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              Times
            </NavLink>
          </li>
        )}
      </ul>
    </div>
  );
};

export const Content = ({ children }) => {
  return <div className="order-2 ml-40 px-8 pt-3 grow">{children}</div>;
};

export function ErrorBoundary({ error }) {
  console.log(error);
  return (
    <Document title="SimRacing Tracker - Error">
      <Layout>
        <h1>Error</h1>
        <p>{error.message}</p>
      </Layout>
    </Document>
  );
}

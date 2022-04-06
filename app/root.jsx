import { Links, Link, LiveReload, Meta, Outlet } from '@remix-run/react';

import tailwindstyles from './tailwind.css';
import styles from './styles/global.css';

export const meta = () => ({
  charset: 'utf-8',
  viewport: 'width=device-width,initial-scale=1',
  description:
    'An app to track your best times across different series, tracks and cars in iRacing',
  keywords: 'react, remix, iRacing, javascript',
});

export const links = () => [
  { rel: 'stylesheet', href: styles },
  { rel: 'stylesheet', href: tailwindstyles },
];

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
  return (
    <div className="flex">
      <nav className="navbar grow flex-row-reverse">
        <ul className="nav">
          <li>Logged in user</li>
        </ul>
      </nav>
    </div>
  );
};

const SideNav = () => {
  return (
    <div className="w-40 h-full shadow-md bg-white absolute">
      <ul className="relative pt-3">
        <li className="relative">
          <Link
            className="flex items-center text-sm py-4 px-12 h-12 overflow-hidden text-gray-800 text-ellipsis whitespace-nowrap hover:text-gray-900 hover:bg-gray-300 transition duration-300 ease-in-out"
            to="/"
          >
            Home
          </Link>
        </li>
        <li className="relative">
          <Link
            className="flex items-center text-sm py-4 px-12 h-12 overflow-hidden text-gray-800 text-ellipsis whitespace-nowrap hover:text-gray-900 hover:bg-gray-300 transition duration-300 ease-in-out"
            to="/times"
          >
            Times
          </Link>
        </li>
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

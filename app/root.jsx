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
      <nav className="navbar">
        <Link to="/" className="logo">
          Home
        </Link>

        <ul className="nav">
          <li>Logged in user</li>
        </ul>
      </nav>
      <div className="container">{children}</div>
    </>
  );
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

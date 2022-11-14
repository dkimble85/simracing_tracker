import Link from 'next/link';

const Header = () => {
  return (
    <>
      <div className="bg-black p-2 text-white flex">
        <h1 className="text-3xl font-bold text-white">Racing Time Tracker</h1>
        <Link className="ml-auto p-2 underline" href="/login">
          Login
        </Link>
      </div>
    </>
  );
};

export default Header;

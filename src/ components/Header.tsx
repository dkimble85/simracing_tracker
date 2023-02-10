import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Header = () => {
  const { data: session } = useSession();
  return (
    <header>
      <div className="flex flex-row gap-8 bg-black p-4 text-2xl text-white">
        <div>
          <h1>Sim Racing Time Tracker</h1>
        </div>
        <div className="ml-auto">
          <button
            className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
            onClick={session ? () => void signOut() : () => void signIn()}
          >
            {session ? "Sign out" : "Sign in"}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

const Home = () => {
  return (
    <div className="py-2 px-8">
      <main className="px-4 my-2 mx-8 min-h-screen flex flex-1 flex-col w-3/4">
        <h1 className="text-2xl py-3">
          Welcome to your personal journal!
        </h1>
        <div>
          This is a place where you can express your feelings, keep
          track of your journal entries, and catalog your thoughts.
          Mental health is undervalued in today&apos;s society and on
          average it isn&apos;t even considered by older generations.
        </div>
        <div>
          Login with your credentials or register a new account to
          start your journaling journey!
        </div>
      </main>
    </div>
  );
};

export default Home;

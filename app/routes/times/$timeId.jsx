import { redirect } from '@remix-run/node';
import { Link, useLoaderData, useParams } from '@remix-run/react';
import { db } from '../../utils/db.server';

export const loader = async ({ params }) => {
  const time = await db.trackTimes.findUnique({
    where: { id: params.timeId },
  });

  if (!time) throw new Error('Time not found');

  const data = { time };
  return data;
};

export const action = async ({ request, params }) => {
  const form = await request.formData();
  if (form.get('_method') === 'delete') {
    const post = await db.trackTimes.findUnique({
      where: { id: params.timeId },
    });

    if (!post) throw new Error('Time not found');

    await db.trackTimes.delete({ where: { id: params.timeId } });

    return redirect('/times');
  }
};

function Time() {
  const { time } = useLoaderData();

  return (
    <div>
      <div className="flex justify-between items-center mb-10">
        <h1>Time {time.time}</h1>
        <Link to="/times" className="btn">
          Back
        </Link>
      </div>

      <div className="page-content">
        <div>{time.vehicle}</div>
        <div>{time.track}</div>
        <div>{time.game}</div>
      </div>

      <div className="flex justify-between items-center mt-7">
        <form method="POST">
          <input type="hidden" name="_method" value="delete" />
          <button className="block border-none rounded m-1 cursor-pointer no-underline bg-red-900 text-white border-red-900 text-sm px-3 py-2">
            Delete
          </button>
        </form>
      </div>
    </div>
  );
}

export default Time;

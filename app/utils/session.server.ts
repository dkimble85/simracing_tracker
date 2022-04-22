import bcrypt from 'bcrypt';
import { db } from './db.server';
import { createCookieSessionStorage, redirect } from '@remix-run/node';
import { NULL } from 'sass';

// Login user
export const login = async ({ username, password }) => {
  const user = await db.user.findUnique({
    where: {
      username,
    },
  });

  if (!user) return null;

  // Check password
  const isCorrectPassword = await bcrypt.compare(password, user.passwordHash);

  if (!isCorrectPassword) return null;

  return user;
};

// Get Session Secret
const sessionSecret = process.env.SESSION_SECRET;

if (!sessionSecret) throw new Error('No Session Secret');

// Create Session Storage
const storage = createCookieSessionStorage({
  cookie: {
    name: 'iracingtracker_session',
    secure: process.env.NODE_ENV === 'production',
    secrets: [sessionSecret],
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 60,
    httpOnly: true,
  },
});

// Create session
export const createUserSession = async (userId: string, redirectTo: string) => {
  const session = await storage.getSession();
  session.set('userId', userId);

  return redirect(redirectTo, {
    headers: {
      'Set-Cookie': await storage.commitSession(session),
    },
  });
};

// Get User Session
export const getUserSession = (request: Request) => {
  return storage.getSession(request.headers.get('Cookie'));
};

// Get logged in user
export const getUser = async (request: Request) => {
  const session = await getUserSession(request);
  const userId = session.get('userId');

  // Check if userId is in session
  if (!userId || typeof userId !== 'string') return null;

  try {
    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
    });

    return user;
  } catch (error) {
    return null;
  }
};

// Log out user and destroy session
export const logout = async (request: Request) => {
  const session = await storage.getSession(request.headers.get('Cookie'));

  return redirect('/auth/logout', {
    headers: {
      'Set-Cookie': await storage.destroySession(session),
    },
  });
};

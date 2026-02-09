import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// Mock function to generate a random username
const generateRandomUsername = () => {
  const adjectives = [
    'Red',
    'Green',
    'Blue',
    'Yellow',
    'Purple',
    'Orange',
    'Black',
    'White',
    'Grey',
  ];
  const nouns = [
    'Panther',
    'Tiger',
    'Lion',
    'Jaguar',
    'Leopard',
    'Bear',
    'Wolf',
    'Fox',
    'Eagle',
  ];
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const number = Math.floor(Math.random() * 100);
  return `${adjective}${noun}${number}`;
};

export async function POST(request: Request) {
  const { email } = await request.json();

  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 });
  }

  // Check if user already has a username in cookies
  const cookieStore = cookies();
  const existingUsername = cookieStore.get('username')?.value;

  if (existingUsername) {
    return NextResponse.json({ username: existingUsername });
  }

  // Generate a new username and set it in cookies
  const username = generateRandomUsername();
  cookieStore.set('username', username, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24, // 1 day
  });

  return NextResponse.json({ username });
}

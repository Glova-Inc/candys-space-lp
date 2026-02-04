import { next } from '@vercel/edge';

const USERNAME = 'candy';
const PASSWORD = 'space2025';

export default function middleware(request: Request) {
  const authHeader = request.headers.get('authorization');

  if (authHeader) {
    const [scheme, encoded] = authHeader.split(' ');
    if (scheme === 'Basic' && encoded) {
      const decoded = atob(encoded);
      const [user, pass] = decoded.split(':');
      if (user === USERNAME && pass === PASSWORD) {
        return next();
      }
    }
  }

  return new Response('Authentication required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Candy\'s Space"',
      'Content-Type': 'text/plain',
    },
  });
}

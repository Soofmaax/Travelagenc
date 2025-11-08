import { toNextJsHandler } from 'better-auth/next';
import { auth } from '../../../../lib/auth';

export const GET = toNextJsHandler(auth);
export const POST = toNextJsHandler(auth);
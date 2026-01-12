// Vercel Serverless Function - Logout
import { serialize } from 'cookie';

export default function handler(req, res) {
    // Clear the cookie
    const clearCookie = serialize('discord_user', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 0,
        path: '/',
    });
    
    res.setHeader('Set-Cookie', clearCookie);
    res.redirect(process.env.FRONTEND_URL + '?logout=success');
}

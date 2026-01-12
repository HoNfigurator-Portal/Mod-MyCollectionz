// Vercel Serverless Function - Get Current User
import { parse } from 'cookie';

export default function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_URL || '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    
    try {
        const cookies = parse(req.headers.cookie || '');
        const userCookie = cookies.discord_user;
        
        if (userCookie) {
            const user = JSON.parse(userCookie);
            return res.json({
                loggedIn: true,
                user: user
            });
        }
        
        return res.json({
            loggedIn: false,
            user: null
        });
        
    } catch (error) {
        console.error('User check error:', error);
        return res.json({
            loggedIn: false,
            user: null
        });
    }
}

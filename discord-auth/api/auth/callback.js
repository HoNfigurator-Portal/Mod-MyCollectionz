// Vercel Serverless Function - Discord OAuth Callback
import { serialize } from 'cookie';

export default async function handler(req, res) {
    const { code } = req.query;
    
    if (!code) {
        return res.redirect(process.env.FRONTEND_URL + '?login=failed&error=no_code');
    }
    
    try {
        // Exchange code for access token
        const tokenResponse = await fetch('https://discord.com/api/oauth2/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                client_id: process.env.DISCORD_CLIENT_ID,
                client_secret: process.env.DISCORD_CLIENT_SECRET,
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: process.env.VERCEL_URL 
                    ? `https://${process.env.VERCEL_URL}/api/auth/callback`
                    : 'http://localhost:3000/api/auth/callback',
            }),
        });
        
        const tokenData = await tokenResponse.json();
        
        if (tokenData.error) {
            console.error('Token error:', tokenData);
            return res.redirect(process.env.FRONTEND_URL + '?login=failed&error=token');
        }
        
        // Get user info
        const userResponse = await fetch('https://discord.com/api/users/@me', {
            headers: {
                Authorization: `Bearer ${tokenData.access_token}`,
            },
        });
        
        const userData = await userResponse.json();
        
        // Get user's guilds
        const guildsResponse = await fetch('https://discord.com/api/users/@me/guilds', {
            headers: {
                Authorization: `Bearer ${tokenData.access_token}`,
            },
        });
        
        const guildsData = await guildsResponse.json();
        
        // Check if user is in your Discord server
        const guildId = process.env.DISCORD_GUILD_ID;
        const isMember = Array.isArray(guildsData) && guildsData.some(g => g.id === guildId);
        
        // Create user object
        const user = {
            id: userData.id,
            username: userData.username,
            displayName: userData.global_name || userData.username,
            avatar: userData.avatar 
                ? `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.png`
                : `https://cdn.discordapp.com/embed/avatars/${parseInt(userData.discriminator || '0') % 5}.png`,
            isMember: isMember,
        };
        
        // Store user data in cookie (encrypted in production)
        const userCookie = serialize('discord_user', JSON.stringify(user), {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7, // 7 days
            path: '/',
        });
        
        res.setHeader('Set-Cookie', userCookie);
        res.redirect(process.env.FRONTEND_URL + '?login=success');
        
    } catch (error) {
        console.error('OAuth error:', error);
        res.redirect(process.env.FRONTEND_URL + '?login=failed&error=server');
    }
}

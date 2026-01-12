// Vercel Serverless Function - Discord OAuth Start
export default function handler(req, res) {
    const clientId = process.env.DISCORD_CLIENT_ID;
    const redirectUri = encodeURIComponent(process.env.VERCEL_URL 
        ? `https://${process.env.VERCEL_URL}/api/auth/callback`
        : 'http://localhost:3000/api/auth/callback');
    
    const scope = encodeURIComponent('identify guilds');
    
    const authUrl = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}`;
    
    res.redirect(authUrl);
}

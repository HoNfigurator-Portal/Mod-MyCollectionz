# 🎮 HoN Reborn - Discord OAuth (Vercel)

Discord Login สำหรับเว็บไซต์ HoN Reborn บน Blogger

## 📁 โครงสร้างไฟล์

```
discord-auth/
├── api/
│   └── auth/
│       ├── discord.js   # เริ่ม OAuth flow
│       ├── callback.js  # รับ callback จาก Discord
│       ├── user.js      # ดึงข้อมูล user
│       └── logout.js    # Logout
├── vercel.json          # Vercel config
├── package.json
├── .env.example
└── frontend-code.js     # โค้ดสำหรับใส่ใน index.html
```

## 🚀 วิธีติดตั้ง

### Step 1: สร้าง Discord Application

1. ไปที่ https://discord.com/developers/applications
2. กด **New Application** → ตั้งชื่อ "HoN Reborn"
3. ไปที่ **OAuth2 > General**
4. คัดลอก **Client ID** และ **Client Secret**
5. ใน **Redirects** เพิ่ม:
   - `http://localhost:3000/api/auth/callback` (local)
   - `https://your-app.vercel.app/api/auth/callback` (production)

### Step 2: Deploy ไป Vercel

#### วิธีที่ 1: ใช้ Vercel CLI

```bash
# ติดตั้ง Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy (รันใน folder discord-auth)
cd discord-auth
vercel

# ตั้งค่า Environment Variables
vercel env add DISCORD_CLIENT_ID
vercel env add DISCORD_CLIENT_SECRET
vercel env add DISCORD_GUILD_ID
vercel env add FRONTEND_URL

# Deploy production
vercel --prod
```

#### วิธีที่ 2: ใช้ Vercel Dashboard

1. Push โค้ดไป GitHub
2. ไปที่ https://vercel.com/new
3. Import repository
4. เพิ่ม Environment Variables:
   - `DISCORD_CLIENT_ID` = Client ID จาก Discord
   - `DISCORD_CLIENT_SECRET` = Client Secret จาก Discord
   - `DISCORD_GUILD_ID` = `1258436633696608256`
   - `FRONTEND_URL` = `https://kim22tv.blogspot.com`
5. กด Deploy!

### Step 3: อัพเดท Discord Redirect URL

หลัง deploy จะได้ URL เช่น `https://hon-reborn-auth.vercel.app`

กลับไป Discord Developer Portal → OAuth2 → Redirects:
```
https://hon-reborn-auth.vercel.app/api/auth/callback
```

### Step 4: เพิ่มโค้ดใน index.html

ดูไฟล์ `frontend-code.js` แล้วคัดลอก HTML, CSS, JavaScript ไปใส่

⚠️ **สำคัญ:** เปลี่ยน `AUTH_API_URL` เป็น Vercel URL ของคุณ:
```javascript
const AUTH_API_URL = 'https://hon-reborn-auth.vercel.app';
```

## 🔗 API Endpoints

| Endpoint | Description |
|----------|-------------|
| `GET /api/auth/discord` | เริ่ม OAuth → redirect ไป Discord |
| `GET /api/auth/callback` | Discord callback → redirect กลับเว็บ |
| `GET /api/auth/user` | ดึงข้อมูล user ปัจจุบัน |
| `GET /api/auth/logout` | Logout → ลบ cookie |

## 📝 Response Format

### /api/auth/user

**Logged in:**
```json
{
    "loggedIn": true,
    "user": {
        "id": "123456789",
        "username": "player1",
        "displayName": "Player One",
        "avatar": "https://cdn.discordapp.com/avatars/...",
        "isMember": true
    }
}
```

**Not logged in:**
```json
{
    "loggedIn": false,
    "user": null
}
```

## ✅ ข้อดีของ Vercel

- ✨ **ฟรี** - 100GB bandwidth/เดือน
- ⚡ **เร็ว** - Edge network ทั่วโลก
- 🔄 **Auto Deploy** - Push GitHub = Deploy อัตโนมัติ
- 🔒 **HTTPS** - ฟรี SSL certificate
- 📊 **Analytics** - ดู traffic ได้

## 🔧 Local Development

```bash
cd discord-auth
npm install
npm run dev
```

จะรันที่ http://localhost:3000

---

Made with ❤️ for HoN Reborn Community

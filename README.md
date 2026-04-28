# Life OS — Personal Operating System (PWA)

ระบบจัดการชีวิตส่วนตัวแบบ PWA (Progressive Web App)
ใช้งานได้ทั้งบนมือถือและคอมพิวเตอร์ ติดตั้งเป็นแอพได้ ทำงาน offline ได้

## ✨ Features

5 หน้าหลัก:

| หน้า | รายละเอียด |
|------|-----------|
| 📅 **Today** | ตารางเวลา 06:00-23:00 ติ๊กเสร็จได้ + มื้ออาหาร + CFA + คลิป |
| 📋 **Pipeline** | งานทั้งหมด แบ่งหมวด CFA / Investment / Content / Personal + drag&drop + deadline |
| 🍱 **Meals** | Meal plan รายสัปดาห์ + สูตรอาหาร + แคลอรี่ + น้ำดื่ม 8 แก้ว |
| 💚 **Wellness** | Sleep log + Mood เช้า/เย็น + Work hours (เตือน >8 ชม.) + Exercise |
| 🎯 **Goals** | CFA roadmap (Level 1/2/3) + Content goals + Personal goals + Monthly review |

นอกนั้นมี:
- 🤖 **AI Assistant** — ส่ง prompt + context ของคุณไปที่ Claude ผ่าน clipboard แล้ว paste คำตอบกลับมา
- ⬇️ **Export / Import JSON** — backup ข้อมูลด้วยตัวเอง
- 📲 **Add to Home Screen** — ติดตั้งเป็นแอพ (offline)
- 🌐 **Mobile-first** — bottom nav บนมือถือ, sidebar บน PC, swipe gestures, pull-to-refresh
- 🌙 **Dark theme** + ฟอนต์ Sarabun (ภาษาไทยทั้งหมด)

---

## 🚀 ทดลองใช้แบบ Local

ใช้ web server ใดก็ได้ — ไม่ควรเปิดด้วย `file://` (service worker จะไม่ทำงาน)

### วิธีง่ายที่สุด: Python
```bash
cd Desktop/life-os
python -m http.server 8000
```
เปิด http://localhost:8000

### หรือ Node.js
```bash
npx serve life-os
```

### หรือใช้ VS Code Live Server extension
คลิกขวาที่ `index.html` → "Open with Live Server"

---

## 🌍 Deploy ฟรี (เลือก 1 วิธี)

### 1. GitHub Pages (ฟรี, ตั้งค่าครั้งเดียว)
1. สร้าง repo บน GitHub ชื่อ `life-os`
2. Push โฟลเดอร์นี้ขึ้นไป:
   ```bash
   cd Desktop/life-os
   git init
   git add .
   git commit -m "init Life OS"
   git branch -M main
   git remote add origin https://github.com/<USERNAME>/life-os.git
   git push -u origin main
   ```
3. ที่ repo → Settings → Pages → Source: `main` / `(root)` → Save
4. รอ 1-2 นาที จะได้ URL: `https://<USERNAME>.github.io/life-os/`

### 2. Netlify (ลากวาง — ง่ายสุด)
1. ไปที่ https://app.netlify.com/drop
2. ลากโฟลเดอร์ `life-os` ทั้งโฟลเดอร์ลงไป
3. ได้ URL ทันที เช่น `https://life-os-xxx.netlify.app`

### 3. Vercel
```bash
npx vercel
```
เลือก folder → deploy → ได้ URL

> 💡 **PWA จะติดตั้งได้ก็ต่อเมื่อเปิดผ่าน HTTPS** (GitHub Pages / Netlify / Vercel มีให้อัตโนมัติ)

---

## 📱 ติดตั้งเป็นแอพ

### iOS (iPhone / iPad)
1. เปิด URL ของแอพใน **Safari** (ต้อง Safari เท่านั้น)
2. กดปุ่ม Share (กล่องลูกศรขึ้น) ที่ด้านล่าง
3. เลือก **"Add to Home Screen" / "เพิ่มไปยังหน้าจอโฮม"**
4. กด Add → จะมี icon Life OS ขึ้นที่หน้าจอ
5. เปิดได้แบบ full-screen เหมือนแอพจริง

### Android
1. เปิด URL ของแอพใน **Chrome**
2. จะมี banner "Install Life OS" ขึ้นที่ด้านล่าง — กดเลย
3. หรือ เมนู ⋮ → **"ติดตั้งแอป" / "Install app"**
4. แอพจะอยู่ใน app drawer เหมือนแอพปกติ

### Desktop (Chrome / Edge)
1. เปิด URL
2. กด icon "ติดตั้ง" ที่มุมขวาบน address bar (รูปจอ + ลูกศร)
3. หรือ เมนู ⋮ → "Install Life OS..."

---

## 💾 Backup ข้อมูล

ข้อมูลทั้งหมดเก็บอยู่ใน **localStorage** ของ browser

### Export (สำรองข้อมูล)
- Sidebar (PC) → กด **⬇️ Export**
- หรือ มือถือ → กดปุ่ม `⋯` ที่ topbar → Export ข้อมูล (JSON)
- ได้ไฟล์ `life-os-backup-YYYY-MM-DD.json`

### Import (กู้คืน)
- กด **⬆️ Import** → เลือกไฟล์ที่ export ไว้
- ⚠️ ข้อมูลปัจจุบันจะถูกเขียนทับ

### แนะนำ
- Export ทุกสัปดาห์ เก็บไว้ใน Google Drive / iCloud
- ถ้าล้าง browser cache ข้อมูลจะหาย — ต้องมี backup เสมอ

---

## 🤖 AI Assistant

ใช้งานร่วมกับ Claude ได้ (offline mode — copy/paste ผ่าน clipboard):

1. กดปุ่ม 🤖 ที่ topbar
2. เลือก template (เช่น "ช่วยจัดตารางวันนี้") หรือพิมพ์เอง
3. กด **📋 Copy ไป Claude** — ระบบจะ copy prompt + context ของคุณ (ตารางวันนี้, pipeline, water, work hours)
4. เปิด Claude / ChatGPT / Gemini แล้ววาง
5. คัดลอกคำตอบกลับมาวางในช่อง response

---

## 🎨 Tech Stack

- **Vanilla HTML / CSS / JavaScript** — ไม่มี build step ไม่มี dependency
- **PWA** — service worker (cache-first) + manifest.json
- **localStorage** — เก็บข้อมูลฝั่ง client
- **Sarabun font** — ภาษาไทยอ่านสบาย
- **Touch gestures** — swipe ซ้าย/ขวา เปลี่ยนหน้า, pull-to-refresh

ขนาดรวม < 60KB — โหลดเร็วทั้งบน 3G และ offline

---

## 📁 โครงสร้างไฟล์

```
life-os/
├── index.html          # entry point + service worker registration
├── manifest.json       # PWA manifest
├── service-worker.js   # offline cache
├── styles.css          # ทุก style (dark theme, mobile-first)
├── app.js              # ทุก logic + sample data
├── icons/
│   ├── icon-192.png    # PWA icon
│   └── icon-512.png    # PWA icon (high-res)
└── README.md
```

---

## 🛠 Roadmap (ต่อไป)

- [ ] GitHub Gist sync (cloud backup อัตโนมัติ)
- [ ] Push notification เตือนตามเวลา
- [ ] Charts สำหรับ sleep/mood/work hours แบบรายเดือน
- [ ] Multi-day view สำหรับ time blocks
- [ ] Markdown notes ใน goals

---

## 📝 License

ใช้งานส่วนตัว แก้ไขได้อิสระ

# 🏠 Manzil App – Dev Setup

Minimal guide to build the Docker environment and launch the mobile app in simulator.

---

## ⚙️ Prerequisites

Make sure you have the following installed:

- Docker & Docker Compose
- Node.js (v18+ recommended)
- React Native CLI (`npm install -g react-native-cli`)
- Xcode (macOS) or Android Studio (Windows/Linux/macOS)

---

## 🐳 Build & Run Docker Environment

### 1. Clone the Repository

```bash
git clone https://github.com/your-org/manzil.git
cd manzil
```

### 2. Add `.env` File

Create a `.env` file in the root (same level as `docker-compose.yml`) with the following content:

```env
SQL_ENGINE=django.contrib.gis.db.backends.postgis
SQL_DATABASE=appdb
SQL_USER=appuser
SQL_PASSWORD=apppassword
SQL_HOST=db
SQL_PORT=5432
```

> 🔐 **Important:** Do NOT commit this `.env` file. Keep it local. Use `.env.example` as a safe reference.

### 3. Build and Start Docker Containers

```bash
docker-compose up --build
```

This spins up the Django backend, PostgreSQL with PostGIS, Redis, and the React Native Metro bundler.

---

## 📱 Launch React Native App in Simulator

### 1. Install Frontend Dependencies

```bash
cd frontend
npm install
```

### 2. Run the App

#### iOS (macOS only)

```bash
npx react-native run-ios
```

Requires Xcode + iOS simulator.

#### Android

```bash
npx react-native run-android
```

Requires Android Studio with emulator/device properly set up.

---

## ✅ Done

App should now be running locally 🎉

- Check the simulator – it should load the Welcome screen after Splash.
- Metro server is available at `http://localhost:8081` (already started by Docker).

---

### 🔁 Useful Docker Commands

Stop all:
```bash
docker-compose down
```

Rebuild:
```bash
docker-compose up --build --force-recreate
```

Restart specific service:
```bash
docker-compose restart backend
```

---

Happy coding! 💻

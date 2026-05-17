Here’s your same guide — cleaned up (no emojis), with **clear explanations + what’s happening under the hood + exact commands**.

---

# 1. What you are doing (concept)

You are building a **MERN stack app** and packaging each part into containers:

* MongoDB → database container
* Express/Node → backend container
* React → frontend container (served via Nginx)

Then Docker Compose:

* Creates a **network**
* Lets containers talk using service names
* Starts everything together with one command

---

# 2. Project structure

```
my-app/
│
├── backend/
│   ├── Dockerfile
│   └── source code
│
├── frontend/
│   ├── Dockerfile
│   └── source code
│
├── docker-compose.yml
```

**Why this structure?**

* Each service is isolated
* Docker Compose knows where to build each container from

---

# 3. Backend Dockerfile (Express)

`backend/Dockerfile`

```dockerfile
FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "start"]
```

## What’s happening under the hood

* `FROM node:18` → pulls Node.js image from Docker Hub
* `WORKDIR /app` → creates a working directory inside container
* `COPY package*.json ./` → copies dependency list
* `RUN npm install` → installs dependencies inside container
* `COPY . .` → copies your backend code
* `EXPOSE 5000` → tells Docker the app runs on port 5000
* `CMD` → starts your server

---

# 4. Frontend Dockerfile (React + Nginx)

`frontend/Dockerfile`

```dockerfile
FROM node:18 as build

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80
```

## Under the hood

This is a **multi-stage build**:

### Stage 1 (build React app)

* Compiles React into static files (`/build`)

### Stage 2 (Nginx server)

* Copies built files into Nginx
* Nginx serves them as a website

Why this matters:

* Smaller image
* Faster
* Production-ready

---

# 5. docker-compose.yml

```yaml
version: "3.8"

services:
  mongo:
    image: mongo
    container_name: mongo
    restart: always
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db

  backend:
    build: ./backend
    container_name: backend
    restart: always
    ports:
      - "5000:5000"
    depends_on:
      - mongo
    environment:
      - MONGO_URI=mongodb://mongo:27017/mydb

  frontend:
    build: ./frontend
    container_name: frontend
    restart: always
    ports:
      - "80:80"
    depends_on:
      - backend

volumes:
  mongo-data:
```

---

## What’s happening under the hood

### Docker Compose does:

1. Creates a network:

   ```
   my-app_default
   ```

2. Starts containers:

   * mongo
   * backend
   * frontend

3. DNS inside Docker:

   * `mongo` → Mongo container
   * `backend` → backend container

---

## Important concept: Service name = hostname

Inside backend:

```
mongodb://mongo:27017/mydb
```

NOT:

```
localhost
```

Because:

* `localhost` = same container
* `mongo` = another container in same network

---

# 6. Backend connection fix

In your backend code:

```js
mongoose.connect(process.env.MONGO_URI);
```

---

# 7. Frontend API URL

For now:

```
http://YOUR_SERVER_IP:5000
```

Later you should use:

* Reverse proxy (Nginx)
* Domain + SSL

---

# 8. Setup on Hostinger KVM1 VPS

## Connect to server

```bash
ssh root@YOUR_SERVER_IP
```

---

## Install Docker

```bash
apt update
apt install docker.io docker-compose -y
```

---

## Enable Docker

```bash
systemctl enable docker
systemctl start docker
```

Check:

```bash
docker --version
docker-compose --version
```

---

# 9. Upload your project

From your local machine:

```bash
scp -r my-app root@YOUR_SERVER_IP:/root/
```

---

# 10. Run your app

```bash
cd /root/my-app
docker-compose up -d --build
```

---

## What this command does

* `--build` → builds images from Dockerfiles
* `-d` → runs in background

---

## Check containers

```bash
docker ps
```

---

## Check logs

```bash
docker logs backend
docker logs frontend
docker logs mongo
```

---

# 11. Access your app

* Frontend → `http://YOUR_IP`
* Backend → `http://YOUR_IP:5000`

---

# 12. Common mistakes (explained)

### 1. Using localhost

Wrong:

```
mongodb://localhost:27017
```

Why wrong:

* Each container has its own localhost

---

### 2. React dev server in production

Wrong:

```
npm start
```

Why:

* Slow
* Not optimized
* Not secure

---

### 3. Ports not open

Fix:

```bash
ufw allow 80
ufw allow 5000
ufw allow 22
```

---

# 13. Better architecture (recommended)

Instead of exposing backend:

* Only expose frontend (port 80)
* Use Nginx reverse proxy

Example idea:

```
/api → backend
/ → frontend
```

---

# 14. Useful Docker commands

### Stop everything

```bash
docker-compose down
```

### Restart

```bash
docker-compose restart
```

### Rebuild

```bash
docker-compose up -d --build
```

### Remove everything

```bash
docker system prune -a
```

---

# 15. What you achieved

* Your app runs in isolated containers
* Easy to redeploy anywhere
* No dependency conflicts
* Production-ready base setup

---

If you want next step, I can show you:

* Nginx reverse proxy config (clean URLs like `/api`)
* Free SSL setup with domain
* CI/CD with GitHub auto deploy

Just tell me what you want next.

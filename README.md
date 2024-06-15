Local Setup (Docker)
----
- Make sure ports 5432 and 6379 are free on your system, or change the ports in .env.docker

```
cp .env.example .env
docker-compse up -d --build
```
- Easy Peezy :)

Local Setup (Without Docker)
---
- Make sure you have Node >= 20, PostgreSQL and Redis installed on your system
```
cp .env.example .env
npm install 
```
Open 2 terminals

Type this in 1st terminal (app runs here)
```
npm run dev
```

Type this in 2nd terminal (queue worker runs here)
```
node ace queue:listen
```
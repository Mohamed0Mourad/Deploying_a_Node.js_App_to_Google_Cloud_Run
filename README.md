
```markdown
# 🌍 Hello World App on Google Cloud Run

A simple **Node.js + Express** web app with a frontend UI, containerized with **Docker**, and deployed to **Google Cloud Run**. The app serves a styled HTML page with a dynamic name and an image of **Adel Shakl**.

---

## 📁 Project Structure

```plaintext
helloworldproject/
├── Dockerfile                 # Dockerfile for containerization 🐳
├── package.json               # Project dependencies and scripts 📦
├── server.js                  # Express server setup 🌐
├── public/                    # Frontend files 🎨
│   ├── index.html             # HTML structure 📝
│   ├── style.css              # Styles for the frontend 💅
│   └── adel-shakl.jpg         # Image of Adel Shakl 📸
├── images/                    # Screenshots for documentation 📸
│   ├── img1.png               # Build screenshot 🛠️
│   ├── img2.png               # Cloud Run deploy screenshot ☁️
│   ├── img3.png               # Web app running screenshot 🌍
│   └── img4.png               # Cloud Run dashboard screenshot 📊
```

---

## 🛠️ How It Works

- **Backend**: `Express.js` serves static frontend files.
- **Frontend**: Displays a dynamic greeting based on URL parameters (`?name=Adel`).
- **Docker**: The app is containerized with a **multi-stage Dockerfile** for minimal image size.
- **CI/CD**: Built and deployed via **Google Cloud Build** and **Cloud Run**.

---

## 📋 Setup Instructions

### ✅ Enable APIs & Configure Shell

Enable the required Cloud Run API and configure the region:

```bash
gcloud services enable run.googleapis.com
gcloud config set compute/region us-central1
export LOCATION="us-central1"
```

---

### 📂 Create Project Structure

Create your project folder and necessary directories:

```bash
mkdir helloworldproject && cd helloworldproject
mkdir public images
```

Inside the `public/` directory, add your files:

- `index.html`  
- `style.css`  
- `adel-shakl.jpg`  

Inside the `images/` directory, add the screenshots:

- `img1.png` (Cloud Build)
- `img2.png` (Cloud Run deploy)
- `img3.png` (Web app running)
- `img4.png` (Cloud Run dashboard)

---

### 🐳 Dockerfile (Multi-Stage)

Create a `Dockerfile` with multi-stage build for a minimal container:

```Dockerfile
# Stage 1: Install dependencies
FROM node:18-slim AS builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .

# Stage 2: Production-ready build
FROM node:18-slim
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app ./
RUN npm prune --production
EXPOSE 8080
CMD ["npm", "start"]
```

---

### 🔧 Run Locally (optional)

To run your app locally, use Docker:

```bash
docker build -t helloworldproject .
docker run -d -p 8080:8080 helloworldproject
```

Then, open Web Preview → Port 8080 in Cloud Shell or use `curl` to test locally:

```bash
curl localhost:8080
```

---

### ☁️ Deploy to Cloud Run

Push the container image and deploy it to Cloud Run:

1. **Build & Push the Container Image:**

```bash
gcloud builds submit --tag gcr.io/$GOOGLE_CLOUD_PROJECT/helloworldproject
```

2. **Deploy to Cloud Run:**

```bash
gcloud run deploy helloworld \
  --image gcr.io/$GOOGLE_CLOUD_PROJECT/helloworldproject \
  --allow-unauthenticated \
  --region=$LOCATION
```

After deployment, you will get a URL for your live app.

---

## 🖼️ Screenshots

| Step                          | Screenshot                |
|------------------------------|---------------------------|
| **Build with Cloud Build**    | ![Build](images/img1.png) |
| **Cloud Run Deployment**      | ![Deploy](images/img2.png)|
| **Web App Output**            | ![Web App](images/img3.png)|
| **Cloud Run Dashboard**       | ![Dashboard](images/img4.png)|

---

## 🧹 Cleanup (Optional)

To avoid charges, you can delete the container image and Cloud Run service:

```bash
gcloud container images delete gcr.io/$GOOGLE_CLOUD_PROJECT/helloworldproject
gcloud run services delete helloworld --region=us-central1
```

---

## 👨‍💻 Author

**Mohamed Mourad**  


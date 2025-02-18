# Travel Community Website

## Project Structure

```
travel-community-website/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── userController.js
│   ├── models/
│   │   └── User.js
│   ├── routes/
│   │   └── userRoutes.js
│   ├── utils/
│   ├── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   └── Navbar.js
│   │   ├── pages/
│   │   │   └── Home.js
│   │   ├── services/
│   │   │   └── authService.js
│   │   ├── App.js
│   │   ├── index.js
├── ci-cd/
│   ├── github-actions/
│   │   └── main.yml
│   ├── kubernetes/
│   │   ├── backend-deployment.yaml
│   │   ├── frontend-deployment.yaml
│   │   ├── backend-service.yaml
│   │   ├── frontend-service.yaml
├── assets/
│   ├── images/
│   ├── styles/
├── Dockerfile
├── README.md
```

## Hosting on AWS Ubuntu 24 Server

1. **Download Code from GitHub:**
   - SSH into your AWS Ubuntu 24 server.
   - Install Git: `sudo apt-get install git`
   - Clone the repository: `git clone <repository-url>`

2. **Install Dependencies:**
   - Install Node.js and NPM: `sudo apt-get install nodejs npm`
   - Navigate to backend directory and install dependencies: `npm install`
   - Navigate to frontend directory and install dependencies: `npm install`

3. **Run the Application:**
   - Start the backend server: `npm start` (from the backend directory)
   - Start the frontend server: `npm start` (from the frontend directory)

4. **Access the Application:**
   - Use the primary DNS of your AWS server to access the application.

## CI/CD Pipeline and Kubernetes Setup

1. **GitHub Actions Workflow:**
   - Create a `.github/workflows` directory in your repository.
   - Add CI/CD workflow files for building, testing, and deploying the application.

2. **Kubernetes Manifests:**
   - Create Kubernetes manifests for deployments and services.
   - Save them in the `ci-cd/kubernetes` directory.
   - Apply the manifests to your Kubernetes cluster using `kubectl apply -f <manifest-file>`.

# Setup

Cluster url
aks-learn--arturresource-fda566-4i6eamgj.hcp.eastus.azmk8s.io

We use K3d Kubernetes Cluster for deploying javascript apps in Kubernetes

Start K3d Cluster:
```
k3d cluster start
```

## Container Generation and Cluster import

Direct to the "pingpong" directory (ex-js/401/pingpong):

Install all dependencies:
```sh
npm install
```

Create Docker image
```sh
docker build . -t pingpong401
```

Add Docker image to K3d internal Registry
```sh
k3d image import pingpong401
```

Direct to the "logout" directory (ex-js/401/logout):

Install all dependencies:
```sh
npm install
```

Create Docker image
```sh
docker build . -t logout401
```

Add Docker image to K3d internal Registry
```sh
k3d image import logout401
```

### Optional

Before building the Docker image it is recommanded to start the individual javascript files to see if the apps are actually running or throws some errors

```sh
node index.js
```

## Deployment in Kubernetes

The Postgres database is pulled automatically from docker hub. 

If not try
```sh
docker pull postgres:15
```

Direct to the directoy in the hierarchy above (So: ex-js/207):

Apply the yaml-files in the kubernetes cluster
```sh
kubectl apply -f kubernetes/ 
```

Get the pod name of the app
```sh
kubectl get pod
```

Log output of the app
```sh
kubectl logs <name of the pod>
```

Open Browser with url: 

For pingpong-app:
```
localhost:8081/logout
```


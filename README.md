# Kube-Notes-Notes
<div align="center">
  <img src="images/notes-background.jpg" alt="Node+PostGreSQL Logo" width="75%"/>
  <br><br>
</div>

This is a backend service that serves as a CRUD API for Notes.

It is part of an overall larger project which is a [Note Taking Web Application,](https://github.com/shahLLL/Kube-Notes-Infra) deployed and managed using [Kubernetes.](https://kubernetes.io/)

This project has been built using:
 - [Node.js](https://nodejs.org/en)
 - [Express](https://expressjs.com/)
 - [MongoDB](https://www.mongodb.com/)
 - [Redis](https://redis.io/)

This repository can be run using:
```
docker compose up --build
```

Before running, do remember to add a **.env** file in the root directory with the following fields:
```
NOTES_APP_PORT=[PORT_FOR APP] (Port for Overall Application)
JWT_SECRET=[JWT_SECRET_USED_IN_AUTH_SERVICE] (This should be coordinated with the Authentication Service being used)
MONGO_URI=[MONGODB_URI](This will be spun up by Docker-Compose)
REDIS_URL=[REDIS_URL] (This will be spun up by Docker-Compose)
MONGO_PORT=[MONGODB_PORT]
REDIS_PORT=[REDIS_PORT]
INGRESS=[INGRESS_URL/SOURCE] (This is where network-traffic/requests are expected to come from)
```

Contributions and feedback are more than welcomed.

When contributing to this project or using it in any way, please do pay attention to: [LICENSE](https://github.com/shahLLL/Kube-Notes-Notes?tab=Apache-2.0-1-ov-file)

☕☕☕CHEERS AND THANK YOU☕☕☕





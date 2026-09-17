# docker — containerization

Dockerfiles and Docker-related resources.

- `backend.Dockerfile` — production build of the FastAPI backend
- `frontend.Dockerfile` — production build served by a static server (nginx)

The `docker-compose.yml` at the repo root orchestrates: `postgres` (data store), `backend` (API), `frontend` (web console).

Dev notes:

- During development, apps run on the host (`uvicorn --reload`, Vite HMR) while only Postgres runs in Docker.
- `docker compose up --build` gives a full-stack demo.
- `docker compose down -v` wipes volumes (resets lab data).
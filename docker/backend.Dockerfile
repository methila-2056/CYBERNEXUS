# Production image for the CYBERNEXUS FastAPI backend.
# Context root is the repository root; builds onto the local packages later.

FROM python:3.12-slim AS runtime

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1

WORKDIR /app

# Install the backend package (Python 3.12 only, minimal image).
COPY backend/pyproject.toml README.md ./
COPY backend/app ./app
COPY backend/alembic.ini ./
COPY backend/alembic ./alembic

RUN pip install --upgrade pip && pip install .

# Run migrations then serve. HEALTHCHECK only needs the DB probe.
EXPOSE 8000

# Entrypoint runs migrations before starting uvicorn.
CMD ["sh", "-c", "alembic upgrade head && uvicorn app.main:app --host 0.0.0.0 --port 8000"]
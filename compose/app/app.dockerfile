# Stage 1: Build React static files
FROM node:20 AS frontend-build

WORKDIR /app/frontend
COPY ./src/static/tenant-ui/package.json ./src/static/tenant-ui/package.json ./
RUN yarn install
COPY ./src/static/tenant-ui/ ./
RUN yarn build


# Stage 2: Django backend
FROM python:3.12-alpine AS app

WORKDIR /app

# Install system dependencies
# libpq is for psycopg2, gcc, musl-dev, etc., are needed for compilation
RUN apk add --no-cache \
    libpq \
    gcc \
    musl-dev \
    postgresql-dev \
    nginx \
    python3-dev \
    py3-pip \
    py3-wheel \
    py3-virtualenv

# Copy application code
COPY ./src /app/
COPY ./requirements /app/requirements/

# Install Python dependencies
RUN pip install --no-cache-dir -r ./requirements/dev.txt

# Prepare static files for Nginx
RUN rm -rf /app/static \
    && mkdir -p /app/static/tenant-ui \
    && python develop.py collectstatic --noinput

# Copy React static files from frontend-build stage
COPY --from=frontend-build /app/frontend/dist/ ./static/tenant-ui/dist

# Nginx Configuration
RUN mkdir -p /run/nginx
# COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

# Expose ports
EXPOSE 8000 80

# Start Nginx and the Django app using a process manager
CMD ["sh", "-c", "nginx && python develop.py runserver 0.0.0.0:8000"]

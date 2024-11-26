# Multitenant Auth

**Multitenant Auth** is a project designed to explore creating multi-tenant applications using Django.
This implementation leverages the `django-tenant` library to handle tenant-specific schemas automatically,
enabling seamless data isolation and management for each tenant.

## Key Features

- Tenant-based schema creation and management.
- Pre-configured Docker setup for ease of deployment.
- Automatic database migrations for each tenant.
- Built-in React frontend served via Django.

---

## Prerequisites

Ensure you have the following installed:

- **Python 3**
- **Docker** and **Docker Compose**
- **Make**
- **PostgreSQL**

---

## Setup

This project uses Docker to simplify setup. Two Docker images are employed:

1. **Postgres** (Database)
2. **App** (Django and React)

### Steps to Build the Docker Images

1. Clone the repository:

   ```bash
   git clone https://github.com/mbauskar/multitenant-auth.git
   cd multitenant-auth
   ```

2. Build the Docker images:

   ```bash
   make build
   ```

   This command will:

   - Install all required Python packages.
   - Compile the React frontend into a production-ready build.
   - Prepare the necessary Docker images.

---

## Running & Initializing the Application

### Start the Application

Run the application using the following command:

```bash
make run
```

### Initial Setup

During the initialization process, the following actions are performed automatically:

- **Tenants**: Dummy tenants are created. For each tenant, `django-tenant` sets up individual schemas and runs the necessary migrations.
- **Products**: Example products are added for demonstration purposes.
- **Superuser**: A default superuser is created for administrative access.

You can then access the application via the configured port in your Docker setup.

---

## Additional Notes

- All tenant-specific data and operations are isolated via schemas.
- To customize tenant or product data, modify the relevant fixtures or initialization scripts.

# Medicus Labs™ – Premium Dermatology Analysis

Welcome to the Medicus Labs™ platform. This document provides all the necessary instructions to get your local development environment up and running.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Docker:** The entire application suite is containerized using Docker. You will need Docker and Docker Compose to run the services.
- **Git:** To clone the repository and manage versions.
- **A code editor:** Such as Visual Studio Code.

## Environment Setup

1.  **Clone the Repository:**

    If you have received this as a set of files, ensure they are all within a single project directory. If this were a Git repository, you would clone it.

2.  **Environment Variables:**

    The application requires several API keys to function correctly. These are managed via a `.env` file.

    Create a file named `.env` in the root directory of the project and add the following content:

    ```
    HUGGING_FACE_API_KEY=your_hugging_face_api_key_here
    RESEND_API_KEY=your_resend_api_key_here
    ```

    Replace `your_hugging_face_api_key_here` and `your_resend_api_key_here` with the actual API keys you have.

## Running the Application

The application is orchestrated using `docker-compose`.

1.  **Build and Start the Services:**

    Open a terminal in the root directory of the project and run the following command:

    ```bash
    docker-compose up --build
    ```

    This command will:
    - Build the Docker images for the backend and frontend services.
    - Start the containers for the backend, frontend, and PostgreSQL database.
    - Initialize the database with the schema defined in `database/schema.sql`.

2.  **Accessing the Application:**

    Once the services are running, you can access the different parts of the application:

    -   **Frontend Application:** Open your web browser and navigate to `http://localhost`.
    -   **Backend API:** The backend API is accessible at `http://localhost/api`. For example, the analysis endpoint is at `http://localhost/api/analysis/start`.

## Application Structure

-   `/app.py`: The main Flask application for the backend.
-   `/backend/`: Contains all backend service modules.
-   `/database/`: Holds the database schema.
-   `/frontend/`: The React-based frontend application.
-   `/Dockerfile`: Docker configuration for the backend.
-   `/frontend/Dockerfile`: Docker configuration for the frontend.
-   `/docker-compose.yml`: Orchestrates all the services.
-   `/.env`: (You need to create this) For storing your secret keys.

## Stopping the Application

To stop all the running services, press `Ctrl + C` in the terminal where `docker-compose` is running.

To remove the containers and network, you can run:

```bash
docker-compose down
```

This will stop and remove the containers, but will not delete the data in your database volume.

---

You now have a fully functional local deployment of the Medicus Labs™ platform.

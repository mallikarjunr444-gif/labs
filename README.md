# Medicus Labs™ – Accessible, AI-Assisted Healthcare Experiences

Building more accessible, AI-assisted healthcare experiences while keeping clinical decisions and care under qualified human professionals.

---

## 🌐 Project Resources & Links

| Resource | Link |
| :--- | :--- |
| **Company Website** | [medicuslabs.app](https://medicuslabs.app/) |
| **Existing Labs Project** | [GitHub – Labs](https://github.com/mallikarjunr444-gif/labs) |
| **New Healthcare Product** | [GitHub – MediCare](https://github.com/mallikarjunr444-gif/medicus-care) |
| **Founder Profile** | [LinkedIn – Mallikarjun R](https://www.linkedin.com/in/mallikarjunr-com/) |

---

## 🔭 Vision & Overview

### The Vision
Make useful, understandable health guidance easier to access—while keeping clinical decisions and care under qualified human professionals.

### About Medicus Labs
Medicus Labs is a health-technology initiative developing AI-assisted tools for patient education, early guidance, and better-prepared conversations with healthcare professionals. Its existing Medicus Labs web platform focuses on dermatology-oriented information and AI-assisted skin screening, alongside a medical reference library and clinical intake support. The wider vision is to build a connected set of practical, responsible digital-health experiences.

### New Product: MediCare
MediCare is an emerging AI healthcare companion under the Medicus Labs umbrella. It is being built around two focused experiences:
- **Dr. Smit:** An AI general-health guidance assistant for symptom triage and health education.
- **Dr. Ananya:** A mental-wellness companion for supportive conversations and evidence-informed self-care guidance.

The product is designed for multilingual interaction (including English, Kannada, and Hindi), with voice-oriented experiences planned as part of the broader interface.

### What Makes the Approach Different
- **Specialist-focused experiences:** Separate medical and mental-wellness knowledge pathways rather than one undifferentiated chatbot.
- **Safety by design:** Red-flag escalation, clear AI disclosure, no autonomous prescriptions, and no claim to replace a licensed clinician.
- **Knowledge-grounded development:** Curated medical and mental-wellness resources with source-aware knowledge management.
- **Built for accessibility:** A multilingual direction and conversational interface intended to reduce friction in seeking basic guidance.

---

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

## ⚠️ Stage & Clinical Notice

- **Project Stage:** Active development and validation. MediCare's public production deployment and some service integrations are still in progress; capabilities should be evaluated from the current demo and repository, not assumed to be fully production-ready.
- **Clinical Notice:** Medicus Labs and MediCare provide AI-assisted educational and pre-screening support. They do not provide autonomous diagnosis, prescriptions, or regulated medical care. Users should consult qualified healthcare professionals; emergencies require local emergency services.

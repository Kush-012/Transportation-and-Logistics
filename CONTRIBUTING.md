# CONTRIBUTING.md

## Thank you for your interest in our repository!

We welcome contributions to the **Transportation and Logistics** project. Whether you are fixing a bug, adding a feature, or improving documentation, any help from your end is appreciated.

---

## Getting Started

### 1. Prerequisites
Ensure you have the following installed:
<ul>
    <li> **Node.js** (v16+ recommended) <a href="https://nodejs.org/en/download"> Download Link! </a> </li>
    <li>**MongoDB** (Local or Atlas) <a href="https://www.mongodb.com/try/download/shell"> MongoDB Shell Download </a> <a href="https://www.mongodb.com/try/download/community"> MongoDB Community Server Download </a> </li>
    <li> **Redis** </li>
</ul>

### 2. Local Setup
<ol type="number">
    <li> **Fork** the repository on GitHub. </li>
    <li> **Clone** your fork:
    ```bash
    git clone https://github.com/YOUR-USERNAME/Transportation-and-Logistics.git
    cd Transportation-and-Logistics
    </li>
    <li> **Install Dependencies:**
    <ul>
        <li> **Backend:**
        ```bash
        cd b && npm install
        </li>
        <li> **Frontend:**
        ```bash
        cd f && npm install
        </li>
    </ul>
    </li>
    <li> **Configure Environment Variables:** Create a `.env` file in the root directory and fill in your credentials for MongoDB, JWT, SMTP, Redis, Cloudinary, Open Source Route (ORS), and Gemini API.</li>
</ol>

---

## Development Workflow


### Branching Policy
Always create a new branch for your work:

```bash
git checkout -b feature/your-feature name
#OR
git checkout -b bugfix/issue-description
```

### Running the App
<ul>
    <li>**Start Backend:** In the `/b` folder, run `cd b` then `nodemon index.js` Runs on: 'http://localhost:4500'</li>
    <li>**Start Frontend:** In the '/f' folder, run 'cd f' then 'npm run dev` Runs on: `http://localhost:5173' </li>
</ul>

### Contribution Guidelines

<ul>
    <li>**Code Quality:** Follow consistent indentation and naming conventions.</li>
    <li>**Commits:** Write clear, descriptive commit messages (e.g., `feat: add vehicle tracking API`).</li>
    <li>**API Testing:** Ensure any new endpoints are tested and documented.
    <ul><li>
    Current endpoints include `/signup`, `/login`, /addvehicle, /createbooking, and the /api/ai assistant.</li></ul></li>
</ul>

### Submitting Changes
<ol type="number">
    <li> **Push** your branch to your fork: `git push origin feature/your-feature-name`</li>
    <li>Open a **Pull Request (PR)** against the `main` branch.</li>
    <li>Provide a clear description of what your PR changes or fixes.</li>
</ol>

### Contact & Support
If you have questions, feel free to reach out:
<ul>
    <li>**Maintainer:** Kush Mehta</li>
    <li>**Linkedln:** <a href="https://www.linkedin.com/in/kushm1"> Click Here! </a> </li>
    <li> **GitHub:** <a href="https://github.com/Kush-012"> Click Here! </a> </li>
    <li> **Email:** kushmehta124@gmail.com </li>
</ul>

### Code of Conduct
By participating in this project, you agree to abide by our Code of Conduct:
<ul>
    <li>**Be respectful** and inclusive</li>
    <li>**Be collaborative** and constructive</li>
    <li>**Be patient** with newcomers</li>
    <li>**Focus on the project** goals</li>
    <li>**Report inappropriate behavior**</li>
</ul>

### Thank You!

Every contribution, no matter how small, makes Transportation-and-Logistics better for everyone. Whether you're fixing a typo, adding a feature, or helping with documentation, your efforts are appreciated!

### Happy Contributing! 
# Task Manager

A web-based task management application developed for the Practical Assignment 1 at Vistula University. This project demonstrates core web development concepts, Git version control, and structured team collaboration via GitHub.

## 🚀 Live Demo

**[View the Live Application](https://vistula-team-project-72011.github.io/vistula-task-manager/)**

*(Deployed via GitHub Pages)*

## 🔗 Collaboration Verification

The following merged Pull Requests fulfill the team collaboration requirement:

*   **My contribution to partner (73799):** [View Pull Request](https://github.com/vistula-team-project-73799/vistula-task-manager/pull/2)
*   **Partner's contribution to my repository:** [View Pull Request](https://github.com/vistula-team-project-72011/vistula-task-manager/pull/1)

## ✨ Features

*   **Task Management:** Core functionality to add, update, and delete tasks dynamically using JavaScript.
*   **Team Collaboration:** A dedicated contributor integration (`contribution.html`) that dynamically fetches and displays partner student IDs via an asynchronous API call to a static JSON resource.
*   **Strict Version Control:** Maintained using Git feature branches, fork-based collaboration, and Pull Request reviews to simulate professional team workflows.

## 🛠️ Technologies & Tools

*   **Frontend:** HTML5, CSS3, JavaScript (Vanilla / ES6+)
*   **Version Control:** Git, GitHub
*   **Deployment:** GitHub Pages
*   **Development Environment:** Visual Studio Code, Git Bash

## 📁 Repository Structure

*   `index.html` - The main entry point for the Task Manager interface.
*   `app.js` - Contains the application logic for managing tasks.
*   `config.json` - Configuration data for the core application.
*   `contribution.html` - The team contribution page featuring dynamic JavaScript fetch logic.
*   `contribution.json` - A static resource containing the integrated partner's student ID.

## 🤝 Collaboration Workflow

This project enforces a strict repository collaboration model:
1.  **Forking:** Collaborators must fork this repository.
2.  **Feature Branches:** Contributions are made on isolated branches (e.g., `feature/team-contribution`).
3.  **Pull Requests:** Modifications (such as adding the required `contribution.json` and `contribution.html`) are submitted via Pull Requests targeting the `main` branch.
4.  **Review & Merge:** The repository owner independently reviews and merges the incoming changes to complete the integration. 
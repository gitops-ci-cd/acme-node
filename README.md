# Acme Node

This repository serves as a **reference application** for [NodeJS](https://nodejs.org) that demonstrates best practices for local development and CI/CD workflows.

Designed to support local development with **VS Code** and **Docker** and a CI/CD pipeline via **GitHub Actions** and **Argo CD**, this project follows **GitOps methodologies** and **[trunk-based development](https://trunkbaseddevelopment.com/)** principles.

## Getting Started

1. Clone the Repository

    ```sh
    git clone https://github.com/gitops-ci-cd/acme-node.git
    cd acme-node

    brew bundle
    ```

1. Open in VS Code

    Open the repository in VS Code and, if prompted, Reopen in Container to initialize the development environment within Docker.

    The project includes a .devcontainer configuration, which:

    - Installs dependencies based on the project requirements.
    - Sets up a development environment within Docker for consistency (referencing the root docker compose file).

1. Use docker compose instead

    If you prefer to use Docker Compose directly, you can run the following command:

    ```sh
    docker compose watch
    ```

    This command starts the application in development mode, with [hot reloading enabled](https://docs.docker.com/compose/how-tos/file-watch/). Customize the [compose.override.yaml](https://docs.docker.com/compose/how-tos/multiple-compose-files/merge/) file as needed for additional settings.

1. Visit the Application

    Visit the application in your browser at <http://localhost:8080/api/v1/hello>.

## Usage

This project uses GitHub Actions for CI. See the following for more details:

- [Integration Workflow](https://github.com/gitops-ci-cd#integration-workflow)
- [Deployment Workflow](https://github.com/gitops-ci-cd#deployment-workflow)
- [local .github/workflows](./.github/workflows)
- [Check for new or pertinent actions](https://github.com/gitops-ci-cd/.github/actions/new)

Submit a PR to the main branch to trigger the CI. Merge the PR to trigger CD.

## Contributing

Refer to the [CONTRIBUTING.md](https://github.com/gitops-ci-cd/.github/blob/main/docs/CONTRIBUTING.md) for more information on how to contribute to this project. The "reference" is a living document and will evolve over time. Please contribute to the project by submitting issues and pull requests!

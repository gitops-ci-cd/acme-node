# Acme Node

This repository serves as a **reference application** for [NodeJS](https://nodejs.org) that demonstrates best practices for local development and CI/CD workflows. Designed to support **local development** with **VS Code** and **Docker** and a **CI/CD pipeline** via **GitHub Actions**, this project follows **GitOps methodologies** and **[trunk-based development](https://trunkbaseddevelopment.com/)** principles.

## Overview

This project follows a GitOps approach for deployments and trunk-based development for version control. This means:

- All deployments are managed through Git, treating the Git repository as the single source of truth for the deployment state. This enables automated deployments triggered by Git operations.
- All changes are integrated into the trunk branch (master/main/trunk) frequently, with minimal branching and quick merges, enabling a stable, continuously deployable codebase.

## Getting Started

The following instructions will guide you through setting up this project for local development and understanding the CI/CD workflow designed to keep deployments efficient and reliable.

Development Workflow

1. Create a Pull Request (PR):
    - Branch from main for your feature or fix.
    - PRs facilitate the following actions:
      - Linting checks for code style and formatting
      - Unit Testing ensures code quality and functionality
      - Ephemeral environment creation for manual testing
    - Ensure that the latest main is merged into your branch before merging the PR - this can and should be enforced by GitHub.
1. Merge to main:
    - After review and approval, merge to main.
    - A single image is built, with integration and end-to-end tests run to validate that the build is deployment-ready.
    - Once the tagged image is verified, it's promoted to production, ensuring consistency and reliability in the deployment process.
    - A release is then created and reflected within GitHub.

### GitOps and Trunk-Based Development

This project leverages GitOps principles, where:

- Git is the source of truth for deployments, with configuration files managed in this repository.
- Changes to the environment state are made through Git operations (e.g., merges to main), automatically triggering deployments.

Our development model follows trunk-based development for efficient collaboration and continuous integration:

- Small, Frequent Merges: Changes should be small and integrated into main regularly to reduce merge conflicts.
- Short-Lived Branches: Branches are kept short-lived, aiming for frequent merges to maintain a continuously deployable state.

## Setup & Local Development

1. Clone the Repository

    ```sh
    git clone https://github.com/dudo/acme-node.git
    cd acme-node

    brew bundle
    ```

1. Open in VS Code

    Open the repository in VS Code and, if prompted, Reopen in Container to initialize the development environment within Docker.

1. VS Code Dev Container

    The project includes a .devcontainer configuration, which:

    - Installs dependencies based on the project requirements.
    - Sets up a development environment within Docker for consistency (referencing the root docker compose file).

### Running the Application

Use Docker Compose to start the application and all required services. This has been proxied through [task commands](https://taskfile.dev/) for convenience:

```sh
task up
```

This command starts the application in development mode, with [hot reloading enabled](https://docs.docker.com/compose/how-tos/file-watch/). Customize the [compose.override.yml](https://docs.docker.com/compose/how-tos/multiple-compose-files/merge/) file as needed for additional settings.

### Testing, Linting, & General Development

To maintain code quality, use `lint` (though the linter should be active within VS Code - be on the lookout for squiggly lines!):

```sh
task lint
```

To verify functionality, run tests with `test`:

```sh
task test
```

To build a docker image, use `build`:

```sh
task build
```

`task` will also infer the base command, so you can use `--` (see [Taskfile.yml](./Taskfile.yml) for more details):

```sh
task -- install left-pad
```

For advanced configurations or extra flags, you're encouraged to directly use Docker Compose:

```sh
docker compose run --rm npm install left-pad
```

## CI/CD Workflow

This project uses GitHub Actions for CI. See [.github/workflows](./.github/workflows) for specifics. The workflow includes:

1. Pull Request (PR) Validation

    - Ephemeral Environment Testing
      - PRs build multiple images for testing, providing isolated environments for validation.
    - Unit Testing and Linting
      - Ensures all code meets quality standards before merging.
    - Merge Check
      - Requires that the latest main changes are merged into the PR before it can be merged.

1. Merge to main

    - Single Image Build
      - A single image is built from the default branch.
    - Integration and End-to-End Testing
      - Validates that the build is production-ready by running integration and end-to-end tests.

1. Tagging for Production Release

    Once changes are verified on main, the commit SHA can be tagged for production deployment. This tag can be added manually or through an automated approval process.

1. Promotion to Production

    - Production Deployment
      - The tagged image is promoted to production, ensuring that the same image tested in CI is deployed.
    - Rollback Strategy
      - Previous tagged images can be promoted if a rollback is needed.

## Troubleshooting

- Dev Container Not Starting
  - Ensure Docker Desktop is running, and you’ve installed the VS Code Remote - Containers extension.

- CI Build Failures
  - Confirm that environment variables and secrets are correctly configured in GitHub Actions.

- Permission Issues
  - Restart Docker or reset permissions as needed.

For further assistance, refer to the project’s CONTRIBUTING.md file or open an issue.

This README provides detailed instructions and context on how GitOps and trunk-based development are integrated into the workflow, making it clear for contributors to follow best practices. Let me know if there are additional details you’d like to include!

# Start from the official LTS Node image.
FROM node:22 AS builder

WORKDIR /usr/src/app

# Copy the package files and download the dependencies.
# This is done before copying the code to leverage Docker cache layers.
COPY package*.json ./

# Update npm to the latest version.
RUN npm install -g npm@latest
RUN npm install --silent --include=dev

# Copy the source code from the current directory to the working directory inside the container.
COPY . .

ENTRYPOINT [ "npm" ]

# Continue with the official LTS Node image to create a build artifact.
FROM node:22

WORKDIR /usr/src/app

# Copy application files from the base stage
COPY --from=builder /usr/src/app .

# Install only production dependencies from the lock file.
RUN npm ci --silent --production

EXPOSE 8080

# Define the entry point for the docker image.
# This is the command that will be run when the container starts.
CMD [ "start" ]

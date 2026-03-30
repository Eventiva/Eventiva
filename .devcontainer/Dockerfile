FROM mcr.microsoft.com/devcontainers/javascript-node:20

# Install pnpm globally
RUN npm install -g pnpm

# Install PostgreSQL client tools
RUN apt-get update && apt-get install -y \
    postgresql-client \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /workspace

# Copy package files for better caching
COPY package*.json ./
COPY pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install

# Copy project files
COPY . .

# Default command
CMD ["bash"]
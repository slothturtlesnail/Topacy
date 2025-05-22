# Use Caddy as the base image
FROM caddy:2.9.1-alpine

# Set working directory (this isn't necessary for Caddy but keeping it)
WORKDIR /var/www/html

# Copy application files to /var/www/html inside the container
COPY . /var/www/html

# Copy the Caddyfile to /etc/caddy (Caddy's default config directory)
COPY Caddyfile /etc/caddy/Caddyfile

# Expose the Caddy port (default 80 and 443)
# EXPOSE 80 443

# Run Caddy (entrypoint is already defined in the Caddy base image)
# CMD ["caddy", "run", "--config", "/app/Caddyfile"]
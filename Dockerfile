# Gunakan image PHP 8.2
FROM php:8.4-cli

# Install ekstensi yang dibutuhkan Laravel
RUN apt-get update && apt-get install -y unzip curl libpq-dev libpng-dev libzip-dev && docker-php-ext-install pdo pdo_mysql zip gd

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Set working directory
WORKDIR /app

# Copy seluruh file Laravel
COPY todoapp/ .

# Install dependensi Laravel
RUN composer install --no-interaction --prefer-dist --optimize-autoloader

# Expose port 8000
EXPOSE 8000

# Jalankan server Laravel
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
# Imagem base com PHP 8.4 e FPM
FROM php:8.4-fpm

# Define o diretório raiz da aplicação
ENV APP_DOCUMENT_ROOT /var/www/public

# Instala dependências essenciais do sistema
RUN apt-get update && apt-get install -y \
    libonig-dev \
    libzip-dev \
    unzip \
    nginx \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Instala extensões do PHP (sem gd)
RUN apt-get update && apt-get install -y \
    libonig-dev \
    libzip-dev \
    libicu-dev \
    libxml2-dev \
    unzip \
    nginx \
    && docker-php-ext-install pdo pdo_mysql \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

## Instala e habilita a extensão Imagick (opcional)
#RUN pecl install imagick-3.7.0 \
#    && docker-php-ext-enable imagick

# Instala o Composer
RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" \
    && php composer-setup.php --install-dir=/usr/local/bin --filename=composer \
    && rm composer-setup.php

# Configura permissões para o usuário www-data
RUN usermod -u 1000 www-data && groupmod -g 1000 www-data \
    && chown -R www-data:www-data /var/www

# Copia as configurações do Nginx e PHP-FPM
COPY nginx.conf /etc/nginx/nginx.conf
COPY php-fpm.conf /usr/local/etc/php-fpm.d/zz-custom.conf

# Expõe as portas padrão
EXPOSE 80 443

# Inicia o Nginx e PHP-FPM juntos
CMD ["/bin/bash", "-c", "php-fpm & nginx -g 'daemon off;'"]

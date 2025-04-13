# Projeto AP

Este documento fornece instruções detalhadas para a configuração do ambiente Docker necessário para o projeto.

## 📦 Instalação

Para configurar o projeto execute os comandos abaixo:

```bash
[[ -f .env ]] || cp .env.example .env
[[ -f .env.testing ]] || cp .env.testing.example .env.testing

docker compose up -d --build

# Acesse o container da aplicação:
docker exec -it php_ap bash

# Copie os comandos abaixo e execute no container:
chown -R $USER:www-data . \
&& find . -type f -exec chmod 664 {} \; \
&& find . -type d -exec chmod 775 {} \; \
&& chgrp -R www-data storage bootstrap/cache \
&& chmod -R ug+rwx storage bootstrap/cache \
&& composer install \
&& php artisan key:generate \
&& php artisan migrate \
&& php artisan db:seed \
&& php artisan tenants:migrate \
&& php artisan tenants:seed \
exit
```

# Rodar:
```bash
npm install
npm run build
```

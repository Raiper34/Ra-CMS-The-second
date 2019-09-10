RaCMS The Second
==
New version of modern content management system made by Filip Raiper Gulan.
Backend api and public pages are made by Laravel framework. Frontend is made by Angular framework.

Prerequisites
--
Node >=**10.0.0**  
npm >=**6.0.0**  
php >=**7.2.0**  
composer >=**1.0.0**  
mysql >=**14.14**

Optional prerequisites
--
nginx =>**1.14.0**

Installation
--
**Laravel project:**
1. Install php dependencies `composer install` in ra-cms-public-and-api  
2. setup rights for storage and bootstrap  
    `sudo chown -R $USER:www-data storage`  
    `sudo chown -R $USER:www-data bootstrap/cache`  
    `chmod -R 775 storage`  
    `chmod -R 775 bootstrap/cache`
3. Create and setup `.env` file
4. Comment `routes/web.php` file
5. Create database in mysql, migrate and populate this db  
`php artisan migrate:refresh --seed`
6. Uncomment `routes/web.php` file
7. Install passport `php artisan passport:install`
8. `php artisan storage:link`  

**Angular project:**
1. Install javascript dependencies `npm install` in ra-cms-admin
2. Change `base href` in  `src/index.html`
3. Change `enviroment.prod.ts` in `src/enviroments` with desired settings
4. Build project `ng build --prod`

Uses
--
http://gulan.sk

Useful links
--
[Nginx](https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-18-04-quickstart)  
[Mysql](https://phoenixnap.com/kb/how-to-install-mysql-on-ubuntu-18-04)  
[PHP composer](https://www.ionos.com/community/hosting/php/install-and-use-php-composer-on-ubuntu-1604/)  
[PHP 7.2](https://www.vultr.com/docs/configure-php-7-2-on-ubuntu-18-04)


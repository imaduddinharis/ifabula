# Ifabula Test NodeJS

## Framework

**Backend : Express**  
**Frontend : Vue3**  
**Database : MySQL**

## Dependencies

**Backend**  
* "apidoc": "^0.50.4",
* "cors": "^2.8.5",
* "crypto-js": "^4.1.1",
* "dotenv": "^16.0.0",
* "express": "^4.17.3",
* "knex": "^1.0.3",
* "log4js": "^6.4.1",
* "json2csv": "^5.0.7",
* "mysql": "^2.18.1",
* "nodemon": "^2.0.15",
* "request": "^2.88.2"

**Frontend**
* "@popperjs/core": "^2.11.4",
* "bootstrap": "^5.1.3",
* "core-js": "^3.21.1",
* "crypto-js": "^4.1.1",
* "register-service-worker": "^1.7.1",
* "simple-datatables": "^3.2.0",
* "vue": "^3.0.0",
* "vue-router": "^4.0.14"

## How to Run

```
First, clone this repository  
~$ git clone https://imaduddinharis/ifabula
``` 

### Backend

1. Install Dependencies 

``` 
~/backend# npm install
``` 

2. Create Database on your MySQL  

3. Create .env files with value

```
NODE_ENV={env to be used in knex setup, e.g: development}
PORT={port to use for api, e.g: 3000}
DBHOST={host mysql, e.g: 127.0.0.1}
DBUSER={user mysql, e.g: root}
DBPASSWORD={password user mysql, e.g: pa55w0rd}
DBPORT={port mysql, e.g: 3306}
DBNAME={database name, e.g: ifabula}
```

4. Migrate Database with command:

```
~/backend# npm run migrate-up
```

5. Add default user with seeder

```
~/backend# npm run seed-run

default user
username: user-test
password: password1234
```

6. Running API

```
dev with nodemon
~/backend# npm run dev
```

### Frontend

1. Install Dependencies 

``` 
~/frontend# npm install
``` 

2. Create .env.development files for dev serve with value

```
VUE_APP_TITLE={title app, e.g: Ifabula Digital Kreasi}
VUE_APP_STORAGE_KEY_LOGIN={app local storage key, e.g:ifabula-digital-kreasi}
VUE_APP_API_ENDPOINT={API Endpoint with /api, e.g: http://localhost:3000/api}
```

3. Create .env.production files for build with value

```
VUE_APP_TITLE={title app, e.g: Ifabula Digital Kreasi}
VUE_APP_STORAGE_KEY_LOGIN={app local storage key, e.g:ifabula-digital-kreasi}
VUE_APP_API_ENDPOINT={API Endpoint with /api, e.g: http://localhost:3000/api}
```

4. Running Web App

```
serve dev with
~/frontend# npm run serve

build with
~/frontend# npm run build

```

5. Additional

```
if you using apache for running build result in dist folder
create .htaccess file in dist with value:

RewriteEngine On 
RewriteBase / 
RewriteRule ^index\.html$ - [L] 
RewriteCond %{REQUEST_FILENAME} !-f 
RewriteCond %{REQUEST_FILENAME} !-d 
RewriteCond %{REQUEST_FILENAME} !-l 
RewriteRule . /index.html [L]

```


## Images
<img alt="login page" src="https://raw.githubusercontent.com/imaduddinharis/ifabula/master/screenshots/WhatsApp%20Image%202022-04-01%20at%206.53.29%20AM.jpeg" width="300">
<img alt="transaksi page" src="https://raw.githubusercontent.com/imaduddinharis/ifabula/master/screenshots/WhatsApp%20Image%202022-04-01%20at%206.53.24%20AM.jpeg" width="300">
<img alt="barang page" src="https://raw.githubusercontent.com/imaduddinharis/ifabula/master/screenshots/WhatsApp%20Image%202022-04-01%20at%206.53.25%20AM%20(1).jpeg" width="300">
<img alt="barang page" src="https://raw.githubusercontent.com/imaduddinharis/ifabula/master/screenshots/WhatsApp%20Image%202022-04-01%20at%206.53.25%20AM.jpeg" width="300">



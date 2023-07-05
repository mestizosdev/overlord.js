# Overlord.js
Create controllers, routes, services and generate model with sequelize. 

## Create folder controllers and create file
```
mkdir src/version/controllers
```
```
touch src/version/controllers/version.js
```
## Create folder routes and create file
```
touch src/version/routes.js
```
## Create model user
```
sequelize model:generate --name User --attributes \
username:string,\
password:string,\
email:string,\
status:boolean \
--underscored
```
## Migrate
```
sequelize db:migrate
```
```
sequelize db:migrate:undo
```
## Create seeder
```
sequelize seed:create --name users
```
## Seed
```
sequelize db:seed:all
```
```
sequelize db:seed:undo:all
```
## Create folder utils
```
mkdir src/utils
```
## Create file password.js
```
touch src/utils/password.js
```
## bcrypt
A library to help you hash passwords.
```
pnpm add bcrypt
```
## Create services folder for user 
```
mkdir src/user/services
```
## Create controller folder for user
```
mkdir src/user/controllers
```
## generate-password 
NodeJS library for generating cryptographically-secure passwords.
```
pnpm add generate-password
```
## Install all dependencies of the project
```
pnpm i
```
## Run
```
pnpm start
```
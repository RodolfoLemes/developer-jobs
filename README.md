# developer-jobs

## Sites
* https://programathor.com.br/
* https://app.vulpi.com.br/jobs -> https://api.vulpi.com.br/v1/board
* GeekHunter

## Instructions

### Development
* Configure .env file (use .env.example for reference) with credentials, secrets
and other configurations;
* Start postgresql database;
* Run:
```bash
yarn                         ## install
yarn typeorm migration:run   ## run migration
yarn dev:server              ## start dev server
```

### Production
* Configure .env file (use .env.example for reference) with credentials, secrets
and other configurations (IMPORTANT: you need to change typeORM vars to use the
production dist directory and *.js files instead of *.ts);
* Start postgresql database;
* Run:
```bash
yarn                         ## install
yarn build                   ## build with babel and webpack
yarn typeorm migration:run   ## run migrations
yarn start                   ## start server
```


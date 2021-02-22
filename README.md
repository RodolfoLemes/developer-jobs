# developer-jobs

API to return developers jobs from various developer employment sites.

## How to do

The idea is to build crawlers to catch developer job data.

The crawlers will run outside the API, searching and saving the data on database. **IT'S NOT NECESSARY FILTERS IN THIS STEP**.

The API will be responsable to make querys in database.

- Programathor;
- Vulpi;
- Geekhunter.

## Techs

### Database

- PostgreSQL;
- or MongoDB;

### API

- ExpressJS;
- Typescript;
- Cheerio;
- Axios;
- TypeORM.

### Production

- pm2 → nodejs library;
- chon → linux native, but has nodejs library
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


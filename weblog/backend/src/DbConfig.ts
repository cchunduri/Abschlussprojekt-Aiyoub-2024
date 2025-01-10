import {Pool} from "pg";

export class DbConfig {
  dbPool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT || 5432),
  });

  init() {
    this.dbPool.connect((err, client, done) => {
      if (err) {
        console.error('Error connecting to the database', err)
      } else {
        console.log('Successfully connected to Postgresql');
      }
    })
  }

  pool() {
    return this.dbPool;
  }

  setup = async () => {
    try {
      await this.pool().query(createWeblogUser)
      await this.pool().query(createPost)
      await this.pool().query(createComment)
      console.log(`done`);
    } catch (error) {
      console.log(error);
    }
  }
}

const createWeblogUser = `
  create table weblogusers
  (
    id         uuid      default uuid_generate_v4() not null primary key,
    username   varchar(255)                         not null,
    email      varchar(255)                         not null unique,
    password   varchar(255)                         not null,
    created_at timestamp default CURRENT_TIMESTAMP,
    updated_at timestamp default CURRENT_TIMESTAMP
  );
`;

const createPost = `
  create table posts
  (
    id         uuid                     default uuid_generate_v4() not null
      primary key,
    title      varchar(255)                                        not null,
    content    text                                                not null,
    user_id    uuid                                                not null
      references weblogusers
        on delete cascade,
    created_at timestamp with time zone default CURRENT_TIMESTAMP,
    updated_at timestamp with time zone default CURRENT_TIMESTAMP
  );
`;

const createComment = `
  create table comments
  (
    id         uuid                     default uuid_generate_v4() not null primary key,
    content    text                                                not null,
    post_id    uuid                                                not null
      references posts
        on delete cascade,
    user_id    uuid                                                not null
      references weblogusers
        on delete cascade,
    created_at timestamp with time zone default CURRENT_TIMESTAMP,
    updated_at timestamp with time zone default CURRENT_TIMESTAMP
  );
`;


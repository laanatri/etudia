CREATE TABLE users (
   id bigserial,
   username varchar(60) unique not null,
   firstname varchar(255) not null,
   lastname varchar(255) not null,
   email varchar(60) unique not null,
   password text not null,
   role varchar(60),
   created_at timestamptz not null default NOW(),
   updated_at timestamptz not null default NOW(),
   primary key(id)
);
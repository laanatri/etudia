CREATE TABLE users
(
    id         serial,
    username   varchar(100) unique not null,
    firstname  varchar(50)       not null,
    lastname   varchar(50)       not null,
    email      varchar(255) unique not null,
    password   text               not null,
    role       varchar(60),
    created_at timestamptz        not null default NOW(),
    updated_at timestamptz        not null default NOW(),
    primary key (id)
);
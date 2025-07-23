CREATE TABLE courses
(
    id         bigserial,
    name       varchar(60) unique not null,
    course_url  varchar(255)       null,
    created_at timestamptz        not null default NOW(),
    primary key (id)
);
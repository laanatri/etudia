CREATE TABLE courses
(
    id         serial,
    name       varchar(60) unique not null,
    course_url varchar(255)       not null,
    user_id    integer            not null,
    created_at timestamptz default CURRENT_TIMESTAMP,
    primary key (id),
    constraint fk_course_user foreign key (user_id) references users (id)
);
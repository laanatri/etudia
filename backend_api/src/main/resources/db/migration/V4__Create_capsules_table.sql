CREATE TABLE capsules
(
    id         serial,
    name       varchar(60) unique not null,
    themes     varchar(255)       null,
    user_id    integer            null,
    course_id  integer            null,
    created_at timestamptz        not null default NOW(),
    primary key (id),
    constraint fk_capsule_user foreign key (user_id) references users (id) on delete cascade,
    constraint fk_capsule_course foreign key (course_id) references courses (id) on delete cascade
);
CREATE TABLE blocs
(
    id          serial,
    name        varchar(255) not null,
    themes      varchar(255),
    created_at  TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    is_favorite boolean      not null    DEFAULT false,
    course_id   integer      not null,
    primary key (id),
    constraint fk_blocs_course foreign key (course_id) references courses (id) on delete cascade
);
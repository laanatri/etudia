CREATE TABLE quizzes
(
    id          serial,
    name        varchar(255) not null,
    themes      varchar(255),
    created_at  TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    is_favorite boolean                  DEFAULT false,
    course_id   integer      not null,
    primary key (id),
    constraint fk_quizzes_course foreign key (course_id) references courses (id) on delete cascade
);
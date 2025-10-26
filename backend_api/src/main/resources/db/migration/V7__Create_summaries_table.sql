CREATE TABLE summaries
(
    id         serial,
    name       varchar(255) not null,
    themes     varchar(255),
    summary_url varchar(255) not null,
    created_at  TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    is_favorite boolean      not null    DEFAULT false,
    course_id   integer      not null,
    primary key (id),
    constraint fk_summaries_course foreign key (course_id) references courses (id) on delete cascade
);
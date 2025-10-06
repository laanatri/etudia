CREATE TABLE summaries
(
    id         serial,
    name       varchar(255) not null,
    themes     varchar(255),
    summaryUrl varchar(255) not null,
    course_id  integer      not null,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    primary key (id),
    constraint fk_summaries_course foreign key (course_id) references courses (id) on delete cascade
);
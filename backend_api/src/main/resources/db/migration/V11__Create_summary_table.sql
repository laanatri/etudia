CREATE TABLE summaries
(
    id         serial,
    name       varchar(255) not null,
    themes     varchar(255),
    summaryUrl varchar(255) not null,
    user_id    integer      not null,
    course_id  integer      not null,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    primary key (id),
    constraint fk_summaries_user foreign key (user_id) references users (id) on delete cascade,
    constraint fk_summaries_course foreign key (course_id) references courses (id) on delete cascade
);
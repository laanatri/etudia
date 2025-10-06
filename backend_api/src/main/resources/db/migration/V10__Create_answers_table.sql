CREATE TABLE answers
(
    id          serial,
    text        text    not null,
    is_correct  boolean DEFAULT false,
    question_id integer not null,
    primary key (id),
    constraint fk_answers_question foreign key (question_id) references questions (id) on delete cascade
);
CREATE TABLE questions
(
    id      serial,
    text    text    not null,
    quiz_id integer not null,
    primary key (id),
    constraint fk_questions_quiz foreign key (quiz_id) references quizzes (id) on delete cascade
);
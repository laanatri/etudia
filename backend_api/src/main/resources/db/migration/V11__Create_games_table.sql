CREATE TABLE games
(
    id         serial,
    score      integer not null DEFAULT 0,
    created_at timestamptz      DEFAULT CURRENT_TIMESTAMP,
    quiz_id    integer not null,
    primary key (id),
    constraint fk_games_quiz foreign key (quiz_id) references quizzes (id) on delete cascade
);
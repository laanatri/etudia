CREATE TABLE flashcards
(
    id      serial,
    title   varchar(255) not null,
    content text         not null,
    bloc_id integer      not null,
    primary key (id),
    constraint fk_flashcards_bloc foreign key (bloc_id) references blocs (id) on delete cascade
);
CREATE TABLE blocs
(
    id integer,
    primary key (id),
    constraint fk_bloc_capsule foreign key (id) references capsules (id) on delete cascade
);
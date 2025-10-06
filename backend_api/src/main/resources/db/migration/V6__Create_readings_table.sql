CREATE TABLE readings
(
    id         serial,
    score      integer not null DEFAULT 0,
    created_at timestamptz      DEFAULT CURRENT_TIMESTAMP,
    bloc_id    integer not null,
    primary key (id),
    constraint fk_readings_bloc foreign key (bloc_id) references blocs (id) on delete cascade
);
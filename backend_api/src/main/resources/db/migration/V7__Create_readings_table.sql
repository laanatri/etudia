CREATE TABLE readings
(
    id                     serial,
    acquisitionPourcentage integer not null,
    read_at                timestamptz default CURRENT_TIMESTAMP,
    bloc_id                integer not null,
    primary key (id),
    constraint fk_readings_bloc foreign key (bloc_id) references blocs (id) on delete cascade
);
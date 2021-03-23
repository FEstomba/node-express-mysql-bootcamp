create schema node20_mysql;
use node20_mysql;

create table  customers(
    id bigint unsigned not null auto_increment,,
    name varchar(64) not null,
    city varchar(64) default null,
    primary key (id)
);
insert into customers(name,city) values("Gabito","San Mikel");
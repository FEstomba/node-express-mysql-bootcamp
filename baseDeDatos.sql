create schema node20_mysql;
use node20_mysql;

create table  customers(
    id int auto_increment not null,
    name varchar(64) not null,
    city varchar(64) defaul null,
)
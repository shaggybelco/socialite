create database sociallite;

create table users(
    id SERIAL PRIMARY KEY,
    name varchar(50) not null,
    email varchar(255) not null,
    password varchar(255) not null,
    follow integer[]
)

create table images(
    id SERIAL PRIMARY KEY,
    userid integer not null,
    image varchar(255),
    caption text,
    date varchar(255)
)

create table follow(
    id SERIAL PRIMARY KEY,
    userid integer,
    followid integer
)

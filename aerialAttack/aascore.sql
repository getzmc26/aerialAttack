use getzmc26;

drop table if exists highscores;
create table highscores (
    id int not null primary key auto_increment,
    name char(3),
    score smallint(5) UNIQUE
);
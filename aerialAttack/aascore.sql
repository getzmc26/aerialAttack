use getzmc26;

drop table if exists highscores;
create table highscores (
        name char(3),
        score int(5)
        );
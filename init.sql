create schema web_project;
create table web_project."user"
(
    "userId" varchar(16) not null
        constraint user_pk
            primary key,
    username varchar(20) not null,
    password varchar(16) not null
);

create unique index user_userid_uindex
    on web_project."user" ("userId");

create table web_project.quiz
(
    qid            serial
        constraint quiz_pk
            primary key,
    "userId"       varchar(20)   not null
        constraint quiz_user_userid_fk
            references web_project."user",
    time           timestamp     not null,
    title          varchar(255)  not null,
    content        text          not null,
    "keyOne"       varchar(255),
    "keyTwo"       varchar(255),
    "like"         int default 0,
    dislike        int default 0,
    max_like_reply int default 0 not null
);

create unique index quiz_qid_uindex
    on web_project.quiz (qid);

create table web_project.answer
(
    id       serial
        constraint answer_pk
            primary key,
    "userId" varchar(20) not null
        constraint answer_user_userid_fk
            references web_project."user",
    qid      int         not null
        constraint answer_quiz_qid_fk
            references web_project.quiz,
    time     timestamp   not null,
    content  text        not null,
    "like"   int default 0,
    dislike  int default 0
);

create unique index answer_id_uindex
    on web_project.answer (id);





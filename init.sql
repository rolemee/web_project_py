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





CREATE OR REPLACE FUNCTION max_like_reply_id_fun() RETURNS TRIGGER AS $example_table$
   BEGINcreate table test
(
    test      integer,
    test_time timestamp
);

alter table test
    owner to rolemee;

create table rights
(
    "rightsId"   serial
        primary key,
    "rightsName" varchar(20) default 'user'::character varying not null
);

alter table rights
    owner to rolemee;

create table "user"
(
    "userId" varchar(100)      not null
        constraint user_pk
            primary key,
    username varchar(100)      not null,
    password varchar(60)       not null,
    rights   integer default 0 not null
        constraint user_rights_rightsid_fk
            references rights
);

alter table "user"
    owner to rolemee;

create unique index user_userid_uindex
    on "user" ("userId");

create table quiz
(
    qid               serial
        constraint quiz_pk
            primary key,
    "userId"          varchar(20)       not null
        constraint quiz_user_userid_fk
            references "user",
    time              timestamp,
    title             varchar(255)      not null,
    content           text,
    "keyOne"          varchar(255),
    "keyTwo"          varchar(255),
    "like"            integer default 0,
    dislike           integer default 0,
    max_like_reply_id integer default 0 not null,
    ans_num           integer default 0 not null,
    like_id           text[]  default '{}'::text[]
);

alter table quiz
    owner to rolemee;

create unique index quiz_qid_uindex
    on quiz (qid);

create table answer
(
    id       serial,
    "userId" varchar(20) not null
        constraint answer_user_userid_fk
            references "user",
    qid      integer     not null
        constraint answer_quiz_qid_fk
            references quiz,
    time     timestamp,
    content  text        not null,
    "like"   integer default 0,
    dislike  integer default 0,
    like_id  text[]  default '{}'::text[]
);

alter table answer
    owner to rolemee;

create unique index answer_id_uindex
    on answer (id);

create function max_like_reply_id_fun() returns trigger
    language plpgsql
as
$$
   BEGIN
      update web_project.quiz set max_like_reply_id=(select "id" from web_project.answer where qid=new.qid order by "like" DESC limit 1 ) where qid=new.qid;
      return new;
   END
$$;

alter function max_like_reply_id_fun() owner to rolemee;

create trigger max_like_count
    after insert or update
        of "like"
    on answer
    for each row
execute procedure max_like_reply_id_fun();


      update web_project.quiz set max_like_reply_id=(select "id" from web_project.answer where qid=new.qid order by "like" DESC limit 1 ) where qid=new.qid;
      return new;
   END
$example_table$ LANGUAGE plpgsql;
INSERT INTO web_project.answer (id, "userId", qid, time, content, "like", dislike, like_id) VALUES (1231223::integer, 'zclyyh'::varchar(20), 164::integer, '2022-11-27 16:28:30.000000'::timestamp, '123123'::text, 1111::integer, 0::integer, DEFAULT)
update web_project.quiz set max_like_reply_id=(select "id" from web_project.answer where qid=old.qid order by "like" DESC limit 1 ) where qid=old.qid;


CREATE  or replace TRIGGER max_like_count AFTER UPDATE of "like" or insert
ON answer for each ROW execute procedure max_like_reply_id_fun();
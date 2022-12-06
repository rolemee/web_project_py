-- Active: 1670243150740@@127.0.0.1@5432@web-project@web_project
create table test
(
    test      integer,
    test_time timestamp,
    test2     serial
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
    username varchar(100)      not null
        unique,
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
    "userId"          varchar(20)                    not null
        constraint quiz_user_userid_fk
            references "user",
    time              timestamp default now(),
    title             varchar(255)                   not null,
    content           text,
    "keyWords"        text[]    default '{}'::text[],
    "like"            integer   default 0,
    dislike           integer   default 0,
    max_like_reply_id integer   default 0            not null,
    ans_num           integer   default 0            not null,
    like_id           text[]    default '{}'::text[],
    star_id           text[]    default '{}'::text[] not null
);

alter table quiz
    owner to rolemee;

create unique index quiz_qid_uindex
    on quiz (qid);

create table answer
(
    id       serial
        primary key,
    "userId" varchar(20) not null
        constraint answer_user_userid_fk
            references "user",
    qid      integer     not null
        constraint answer_quiz_qid_fk
            references quiz,
    time     timestamp default now(),
    content  text        not null,
    "like"   integer   default 0,
    dislike  integer   default 0,
    like_id  text[]    default '{}'::text[]
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

create function get_max_id_answer() returns trigger
    language plpgsql
as
$$
    BEGIN
        PERFORM (select setval('web_project.answer_id_seq',(select max(id)+1 from web_project.answer)));
        return new;
end;$$;

alter function get_max_id_answer() owner to rolemee;

create function get_max_id_quiz() returns trigger
    language plpgsql
as
$$
    BEGIN
        PERFORM (select setval('web_project.quiz_qid_seq',(select max(qid) from web_project.quiz)));
        return new;
end;$$;

alter function get_max_id_quiz() owner to rolemee;

create function sum_reply() returns trigger
    language plpgsql
as
$$
    BEGIN
        UPDATE web_project.quiz set ans_num = (select count(id) from web_project.answer where answer.qid=new.qid) where qid=new.qid;
        RETURN new;
    end;
    $$;

alter function sum_reply() owner to rolemee;

create trigger ans_sum_t
    after insert
    on answer
    for each row
execute procedure sum_reply();


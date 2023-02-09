-- Active: 1675688148512@@127.0.0.1@5432@postgres@web_project

--DROP TABLE user_log;

--建日志表
CREATE TABLE
    user_log(
        log_date TIMESTAMP not NULL,
        "userId" character varying(100) NOT NULL,
        --old_operation character varying(100),
        operation character varying(100)
    );


--answer
--add函数
CREATE OR REPLACE FUNCTION web_project.user_log_fun_answer_add() RETURNS 
TRIGGER AS $answer$ 
	BEGIN
	INSERT INTO
	    web_project.user_log(
	        log_date,
	        "userId",
          operation
	    )
	VALUES (NOW(),new."userId",CONCAT('insert id=',new.id,' into answer'));
	RETURN NEW;
	END;
	$answer$ LANGUAGE 
PLPGSQL; 

--add触发器
CREATE OR REPLACE TRIGGER answer_add_trigger AFTER INSERT ON answer FOR EACH ROW EXECUTE PROCEDURE user_log_fun_answer_add();

-- test
-- INSERT INTO
-- 	    answer(
-- 	        id,
-- 	        "userId",
--           qid,
--           time,
--           content,
--           "like",
--           dislike,
--           like_id
-- 	    )
-- 	VALUES (12345,'sj_xian',1,'2009-06-04 00:00:00','this test',12,2,NULL);

--del 
CREATE OR REPLACE FUNCTION web_project.user_log_fun_answer_del() RETURNS 
TRIGGER AS $answer$ 
	BEGIN
	INSERT INTO
	    web_project.user_log(
	        log_date,
	        "userId",
          operation
	    )
	VALUES (NOW(),old."userId",CONCAT('delete id=',old.id,' from answer'));
	RETURN NEW;
	END;
	$answer$ LANGUAGE 
PLPGSQL; 

--del
CREATE OR REPLACE TRIGGER answer_del_trigger AFTER DELETE ON answer FOR EACH ROW EXECUTE PROCEDURE user_log_fun_answer_del();

--test
--DELETE FROM answer WHERE answer.id=3;


--update 
CREATE OR REPLACE FUNCTION web_project.user_log_fun_answer_update() RETURNS 
TRIGGER AS $answer$ 
	BEGIN
	INSERT INTO
	    web_project.user_log(
	        log_date,
	        "userId",
          operation
	    )
	VALUES (NOW(),new."userId",CONCAT('update id=',new.id,' from answer'));
	RETURN NEW;
	END;
	$answer$ LANGUAGE 
PLPGSQL; 

CREATE OR REPLACE TRIGGER answer_update_trigger AFTER UPDATE ON answer FOR EACH ROW EXECUTE PROCEDURE user_log_fun_answer_update();

--test
-- UPDATE answer set content='this test after update' WHERE answer.id=12345;










--quiz
--add触发器
CREATE OR REPLACE FUNCTION web_project.user_log_fun_quiz_add() RETURNS 
TRIGGER AS $quiz$ 
	BEGIN
	INSERT INTO
	    web_project.user_log(
	        log_date,
	        "userId",
          operation
	    )
	VALUES (NOW(),new."userId",CONCAT('insert qid=',new.qid,' into quiz'));
	RETURN NEW;
	END;
	$quiz$ LANGUAGE 
PLPGSQL; 

CREATE OR REPLACE TRIGGER quiz_add_trigger BEFORE INSERT ON quiz FOR EACH ROW EXECUTE PROCEDURE user_log_fun_quiz_add();

--test
-- INSERT INTO
-- 	    quiz(
-- 	        qid,
-- 	        "userId",
--           time,
--           title,
--           content,
--           "keyWords",
--           "like",
--           dislike,
--           max_like_reply_id,
--           ans_num,
--           like_id,
--           star_id
-- 	    )
-- 	VALUES (12345,'sj_xian',NOW(),'this title','this content','{key,key2}',12,2,0,0,NULL,'{}');


--del 
CREATE OR REPLACE FUNCTION web_project.user_log_fun_quiz_del() RETURNS 
TRIGGER AS $quiz$ 
	BEGIN
	INSERT INTO
	    web_project.user_log(
	        log_date,
	        "userId",
          operation
	    )
	VALUES (NOW(),old."userId",CONCAT('delete qid=',old.qid,' from quiz'));
	RETURN NEW;
	END;
	$quiz$ LANGUAGE 
PLPGSQL; 

--del
CREATE OR REPLACE TRIGGER quiz_del_trigger AFTER DELETE ON quiz FOR EACH ROW EXECUTE PROCEDURE user_log_fun_quiz_del();

--test
-- DELETE FROM quiz WHERE quiz.qid=12345;






-- user
--add函数
CREATE OR REPLACE FUNCTION web_project.user_log_fun_user_add() RETURNS 
TRIGGER AS $user$ 
	BEGIN
	INSERT INTO
	    web_project.user_log(
	        log_date,
	        "userId",
          operation
	    )
	VALUES (NOW(),new."userId",CONCAT('insert userId=',new."userId",' into user'));
	RETURN NEW;
	END;
	$user$ LANGUAGE 
PLPGSQL; 


-- add触发器
CREATE OR REPLACE TRIGGER user_add_trigger AFTER INSERT ON "user" FOR EACH ROW EXECUTE PROCEDURE user_log_fun_user_add();

--test
-- INSERT INTO
-- 	    "user"(
-- 	        "userId",
--          username,
--           password,
--           rights
-- 	    )
-- 	VALUES ('123','123','123',0);

--del 
CREATE OR REPLACE FUNCTION web_project.user_log_fun_user_del() RETURNS 
TRIGGER AS $user$ 
	BEGIN
	INSERT INTO
	    web_project.user_log(
	        log_date,
	        "userId",
          operation
	    )
	VALUES (NOW(),old."userId",CONCAT('delete userId=',old."userId",' from user'));
	RETURN NEW;
	END;
	$user$ LANGUAGE 
PLPGSQL; 

--del
CREATE OR REPLACE TRIGGER user_del_trigger AFTER DELETE ON "user" FOR EACH ROW EXECUTE PROCEDURE user_log_fun_user_del();

--test
-- DELETE FROM "user" WHERE "user"."userId"='123';


--update 
CREATE OR REPLACE FUNCTION web_project.user_log_fun_user_update() RETURNS 
TRIGGER AS $user$ 
	BEGIN
	INSERT INTO
	    web_project.user_log(
	        log_date,
	        "userId",
          operation
	    )
	VALUES (NOW(),new."userId",CONCAT('update userId=',new."userId",' from user'));
	RETURN NEW;
	END;
	$user$ LANGUAGE 
PLPGSQL; 

CREATE OR REPLACE TRIGGER user_update_trigger AFTER UPDATE ON "user" FOR EACH ROW EXECUTE PROCEDURE user_log_fun_user_update();

--test
-- UPDATE "user" set password='1234' WHERE "user"."userId"='123';
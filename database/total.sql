drop table has_favorites;
drop table has_video;
drop table has_zone;
drop table send_comment;
drop table has_comment;
drop table upload_video;
drop table has_tag;
drop table sort_video;
drop table likes;
drop table user_relationship;
drop table visit;
drop table send_message;
drop table GET_MESSAGE;

drop table users;
drop table videos;
drop table favorite;
drop table tag;
drop table zone;
drop table administrator;
drop table comments;
drop table ranking;
drop table message_library;

drop sequence S_USERS_ID;
drop sequence S_VIDEOS_ID;
drop sequence S_FAVORITE_ID;
drop sequence S_ADMINISTRATOR_ID;
drop sequence S_COMMENT_ID;
drop sequence S_MESSAGE_ID;

--Entity set
--1.users
create table users
(USER_ID varchar2(6),
STATE number(1,0),
is_admin number(1,0),
NICK_NAME varchar2(40),
PASSWORD varchar2(20),
AVATAR varchar2(100),
GENDER number(1,0),
FANS_NUM number(5,0),
FOLLOW_NUM number(5,0),
LOCATION varchar2(300),
DOB date,
SIGNATURE varchar2(80),
EMAIL varchar2(40),
TEL number(11,0),
WECHAT varchar2(20),
QQ varchar2(20),
primary key (USER_ID)
);

--2.videos
create table videos
(VIDEO_ID varchar2(6),
PRIVACY number(1,0),
COVER varchar2(100),
path varchar2(100),
DESCRIPTION varchar2(80),
LIKES_NUM number(6,0),
PLAY_NUM number(6,0),
COLLECT_NUM number(6,0),
SHARE_NUM number(6,0),
UPLOAD_TIME timestamp,
TITLE varchar2(40),
primary key (VIDEO_ID)
);

--3.favorite
create table favorite
(FAVORITE_ID varchar2(6),
FAVORITE_NAME varchar2(20),
VIDEO_NUM number(2),
primary key (FAVORITE_ID)
);

--4.tag
create table tag
(TAG_NAME varchar2(20),
REFER_NUM number(6,0),
primary key(TAG_NAME));

--5.zone
create table zone
(ZONE_NAME varchar2(20),
VIDEO_NUM number(6),
primary key (ZONE_NAME)
);

--6.administrator
create table administrator
(ADMINISTRATOR_ID varchar2(4),
STATE int,
NICK_NAME varchar2(20),
PASSWORD varchar2(20),
AVATAR varchar2(80),
GENDER int,
FANS_NUM number(5,0),
FOLLOW_NUM number(5,0),
LOCATION varchar2(20),
DOB date,
SIGNATURE varchar2(80),
EMAIL varchar2(30),
TEL number(11,0),
WECHAT varchar2(20),
QQ varchar2(20),
primary key (ADMINISTRATOR_ID)
);

--7.comments
create table comments
(COMMENT_ID varchar2(6),
COMMENT_CONTENT varchar2(300),
LIKES_NUM number(6,0),
primary key(COMMENT_ID)
);
 
--8.ranking
create table ranking
(REFRESH_TIME timestamp,
primary key (REFRESH_TIME)
);

--9.message_library
create table message_library
(MESSAGE_ID varchar2(6),
MESSAGE_TYPE int,
CONTENT varchar2(300),
TIME timestamp,
primary key (MESSAGE_ID)
);

--Relationship set
--10.has_favorite
create table has_favorites
(favorite_id varchar2(6),
user_id varchar2(6),
primary key(favorite_id),
foreign key(favorite_id) references favorite on delete cascade,
foreign key(user_id) references users on delete cascade
);

--11.has_video
create table has_video
(favorite_id varchar2(6),
video_id varchar2(6),
add_time timestamp,
primary key(favorite_id,video_id),
foreign key(favorite_id) references favorite on delete cascade,
foreign key(video_id) references videos on delete cascade
);

--12.has_zone
create table has_zone
(zone_name varchar2(20),
video_id varchar2(6),
primary key(video_id),
foreign key(zone_name) references zone on delete cascade,
foreign key(video_id) references videos on delete cascade
);

--13.send_comment
create table send_comment
(COMMENT_ID varchar2(6),
USER_ID varchar2(6),
primary key (COMMENT_ID),
foreign key (COMMENT_ID) references comments on delete cascade,
foreign key (USER_ID) references users on delete cascade
);

--14.has_comment
create table has_comment
(COMMENT_ID varchar2(6),
VIDEO_ID varchar2(6),
COMMENT_TIME timestamp,
primary key(COMMENT_ID),
foreign key(COMMENT_ID) references comments on delete cascade,
foreign key(VIDEO_ID) references videos on delete cascade
);

--15.upload_video
create table upload_video
(VIDEO_ID varchar2(6),
USER_ID varchar2(6),
primary key(VIDEO_ID),
foreign key(VIDEO_ID) references videos on delete cascade,
foreign key(USER_ID) references users on delete cascade
);

--16.has_tag
create table has_tag
(VIDEO_ID varchar2(6),
TAG_NAME varchar2(20),
primary key(VIDEO_ID,TAG_NAME),
foreign key(VIDEO_ID) references videos on delete cascade,
foreign key(TAG_NAME) references tag on delete cascade
);

--17.sort_video
create table SORT_VIDEO
(refresh_time timestamp,
video_id varchar2(6),
type number(1,0),
rank number(2,0),
primary key(REFRESH_TIME,TYPE,RANK),
foreign key (REFRESH_TIME)references RANKING on delete cascade,
foreign key (VIDEO_ID) references VIDEOS on delete cascade
);

--18.like
create table likes
(VIDEO_ID varchar2(6),
USER_ID varchar2(6),
primary key (VIDEO_ID,USER_ID),
foreign key (VIDEO_ID) references videos on delete cascade,
foreign key (USER_ID) references users on delete cascade
);

--19.user_relationship
create table user_relationship
(ACTIVE_USER_ID varchar2(6),
PASSIVE_USER_ID varchar2(6),
RELATIONSHIP_TYPE int,
primary key (ACTIVE_USER_ID,PASSIVE_USER_ID),
foreign key (ACTIVE_USER_ID) references USERS(USER_ID) on delete cascade,
foreign key (PASSIVE_USER_ID) references USERS(USER_ID) on delete cascade
);

--20.visit
create table VISIT
(VIDEO_ID varchar2(6),
USER_ID varchar2(6),
VISIT_TIME timestamp,
primary key(VIDEO_ID,USER_ID,VISIT_TIME),
foreign key (VIDEO_ID) references VIDEOS on delete cascade,
foreign key (USER_ID) references USERS on delete cascade
);

--21.send_message
create table send_message
(USER_ID varchar2(6),
MESSAGE_ID varchar2(6),
primary key (MESSAGE_ID),
foreign key (USER_ID) references users on delete cascade,
foreign key (MESSAGE_ID) references message_library on delete cascade
);

--22.get_message
create table GET_MESSAGE
(USER_ID varchar2(6),
MESSAGE_ID varchar2(6),
READ_STATE number(1,0),
primary key(USER_ID,MESSAGE_ID),
foreign key (USER_ID) references USERS on delete cascade,
foreign key(MESSAGE_ID) references MESSAGE_LIBRARY on delete cascade
);

--trigger
--user
create sequence S_USERS_ID
minvalue 100000
maxvalue 999999
start with 100000
increment by 1
cache 20;

create or replace trigger T_USERS_IN
before insert on users
for each row
begin
select S_USERS_ID.nextval into :new.USER_ID from dual;
end;
/
--videos
create sequence S_VIDEOS_ID
minvalue 100000
maxvalue 999999
start with 100000
increment by 1
cache 20;

create or replace trigger T_VIDEOS_IN
before insert on videos
for each row
begin select S_VIDEOS_ID.nextval into :new.VIDEO_ID from dual;
end;
/
--favorite
create sequence S_FAVORITE_ID
minvalue 100000
maxvalue 999999
start with 100000
increment by 1
cache 20;

create or replace trigger T_FAVORITE_IN
before insert on favorite
for each row
begin select S_FAVORITE_ID.nextval into :new.FAVORITE_ID from dual;
end;
/
--administrator
create sequence S_ADMINISTRATOR_ID
minvalue 1000
maxvalue 9999
start with 1000
increment by 1
cache 20;

create or replace trigger T_ADMINISTRATOR_IN
before insert on administrator
for each row
begin
select S_ADNIMISTRATOR_ID.nextval into :new.ADNIMISTRATOR_ID from dual;
end;
/
--comments
create sequence S_COMMENT_ID
minvalue 100000
maxvalue 999999
start with 100000
increment by 1
cache 20;

create or replace trigger T_COMMENT
before insert on comments
for each row
begin
select S_COMMENT_ID.nextval into :new.COMMENT_ID from dual;
end;
/
--message_library
create sequence S_MESSAGE_ID
minvalue 100000
maxvalue 999999
start with 100000
increment by 1
cache 20;

create or replace trigger T_MESSAGE_IN
before insert on message_library
for each row
begin
select S_MESSAGE_ID.nextval into :new.MESSAGE_ID from dual;
end;
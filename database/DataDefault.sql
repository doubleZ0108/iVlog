--1.�û���(users)
--STATE��1��ʾ���ѵ�¼����0��ʾ��δ��¼��
--IS_ADMIN:1��ʾ���ǹ���Ա����0��ʾ�����ǹ���Ա��
--GENDER��1��ʾ���С���0��ʾ��Ů��
delete from users;
insert all
into users(STATE,IS_ADMIN,NICK_NAME,PASSWORD,AVATAR,GENDER,FANS_NUM,FOLLOW_NUM,LOCATION,DOB,SIGNATURE,TEL,WECHAT,QQ,EMAIL) values(0,0,'�ҽ��û�1','password1','avatar_path',1,3,3,'����¥1¥',to_date('1984-01-11','yyyy-mm-dd'),'�û�1�ĸ���ǩ��','11101110111','111011011kk','1110110111','1111@qq.com')
into users(STATE,IS_ADMIN,NICK_NAME,PASSWORD,AVATAR,GENDER,FANS_NUM,FOLLOW_NUM,LOCATION,DOB,SIGNATURE,TEL,WECHAT,QQ,EMAIL) values(0,0,'�ҽ��û�2','password2','avatar_path',0,2,2,'����¥2¥',to_date('2077-02-22','yyyy-mm-dd'),'�û�2�ĸ���ǩ��','22202220222','222022022kk','2220220222','2222@qq.com')
into users(STATE,IS_ADMIN,NICK_NAME,PASSWORD,AVATAR,GENDER,FANS_NUM,FOLLOW_NUM,LOCATION,DOB,SIGNATURE,TEL,WECHAT,QQ,EMAIL) values(0,0,'�ҽ��û�3','password3','avatar_path',0,2,2,'����¥3¥',to_date('3000-03-29','yyyy-mm-dd'),'�û�3�ĸ���ǩ��','33303330333','333033033kk','3330330333','3333@qq.com')
into users(STATE,IS_ADMIN,NICK_NAME,PASSWORD,AVATAR,GENDER,FANS_NUM,FOLLOW_NUM,LOCATION,DOB,SIGNATURE,TEL,WECHAT,QQ,EMAIL) values(0,0,'�ҽ��û�4','password4','avatar_path',1,2,2,'����¥4¥',to_date('4200-04-29','yyyy-mm-dd'),'�û�4�ĸ���ǩ��','44404440444','444044044kk','4440440444','4444@qq.com')
select * from dual;

--2.��Ƶ��(videos)
--PRIVACY��1��ʾ�������˿ɼ�����0��ʾ�����Լ��ɼ���
delete from videos;
insert all
into videos(PRIVACY,COVER,path,DESCRIPTION,LIKES_NUM,PLAY_NUM,COLLECT_NUM,SHARE_NUM,UPLOAD_TIME,TITLE) values(1,'cover_path','video_path','�û�1�ϴ�����Ƶ1������',4,6,4,3,TO_TIMESTAMP('11-01-11 11:11:11.111111', 'YYYY-MM-DD HH24:MI:SS.FF'),'������Ƶ1�ı���')
into videos(PRIVACY,COVER,path,DESCRIPTION,LIKES_NUM,PLAY_NUM,COLLECT_NUM,SHARE_NUM,UPLOAD_TIME,TITLE) values(0,'cover_path','video_path','�û�1�ϴ�����Ƶ2������',1,1,0,0,TO_TIMESTAMP('22-02-21 02:02:02.222222', 'YYYY-MM-DD HH24:MI:SS.FF'),'������Ƶ2�ı���')
into videos(PRIVACY,COVER,path,DESCRIPTION,LIKES_NUM,PLAY_NUM,COLLECT_NUM,SHARE_NUM,UPLOAD_TIME,TITLE) values(1,'cover_path','video_path','�û�2�ϴ�����Ƶ3������',2,3,1,0,TO_TIMESTAMP('33-03-03 03:03:03.333333', 'YYYY-MM-DD HH24:MI:SS.FF'),'������Ƶ3�ı���')
into videos(PRIVACY,COVER,path,DESCRIPTION,LIKES_NUM,PLAY_NUM,COLLECT_NUM,SHARE_NUM,UPLOAD_TIME,TITLE) values(1,'cover_path','video_path','�û�4�ϴ�����Ƶ4������',1,2,0,0,TO_TIMESTAMP('44-04-04 04:04:04.444444', 'YYYY-MM-DD HH24:MI:SS.FF'),'������Ƶ4�ı���')
select * from dual;

--3.�ղؼб�
delete from favorite;
insert all
into favorite(FAVORITE_NAME,VIDEO_NUM) values('�û�1���ղؼ�',1)
into favorite(FAVORITE_NAME,VIDEO_NUM) values('�û�2���ղؼ�',1)
into favorite(FAVORITE_NAME,VIDEO_NUM) values('�û�3���ղؼ�',2)
into favorite(FAVORITE_NAME,VIDEO_NUM) values('�û�4���ղؼ�',1)
select * from dual;

--4.��ǩ
delete from tag;
insert all
into tag(TAG_NAME,REFER_NUM) values('��ǩ1����(1,2,3,4)',4)
into tag(TAG_NAME,REFER_NUM) values('��ǩ2����(2,3,4)',3)
into tag(TAG_NAME,REFER_NUM) values('��ǩ3����(1,2)',2)
select * from dual;

--5.����
delete from zone;
insert all
into zone(ZONE_NAME,VIDEO_NUM) values('����1������(1,2)',2)
into zone(ZONE_NAME,VIDEO_NUM) values('����2������(3)',1)
into zone(ZONE_NAME,VIDEO_NUM) values('����3������(4)',1)
select * from dual;

--6.����Ա
--STATE��1��ʾ���ѵ�¼����0��ʾ��δ��¼��
--GENDER��1��ʾ���С���0��ʾ��Ů��
--delete from administrator;
--insert all
--into administrator(STATE,NICK_NAME,PASSWORD,AVATAR,GENDER,FANS_NUM,FOLLOW_NUM,LOCATION,DOB,SIGNATURE,EMAIL,TEL,WECHAT,QQ) values(0,'�ҽй���Ա1','password1','avatar_path',1,3,3,'����¥100¥',to_date('1984-01-11','yyyy-mm-dd'),'����Ա1�ĸ���ǩ��','11101110111','111011011kk','1110110111','1111@qq.com')
--select * from dual;

--7.���۱�
delete from comments;
insert all
into comments(COMMENT_CONTENT,LIKES_NUM) values('���������û�1������Ƶ1��100000������',4)
into comments(COMMENT_CONTENT,LIKES_NUM) values('���������û�2������Ƶ1��100001������',4)
into comments(COMMENT_CONTENT,LIKES_NUM) values('���������û�3������Ƶ1��100002������',4)
into comments(COMMENT_CONTENT,LIKES_NUM) values('���������û�4������Ƶ1��100003������',4)
into comments(COMMENT_CONTENT,LIKES_NUM) values('���������û�4������Ƶ3��100004������',4)
into comments(COMMENT_CONTENT,LIKES_NUM) values('���������û�4������Ƶ4��100005������',4)
select * from dual;

--8.���а��
delete from ranking;
insert all
into ranking(refresh_time) values(TO_TIMESTAMP('2006-12-01 12:12:09.123456', 'YYYY-MM-DD HH24:MI:SS.FF'))
into ranking(refresh_time) values(TO_TIMESTAMP('2007-12-01 12:12:09.123456', 'YYYY-MM-DD HH24:MI:SS.FF'))
into ranking(refresh_time) values(TO_TIMESTAMP('2008-12-01 12:12:09.123456', 'YYYY-MM-DD HH24:MI:SS.FF'))
select * from dual;

--9.��Ϣ��
--MESSAGE_TYPE,1�ǵ���,2����,3������Ƶ,4�ٱ�,5��ע
delete from message_library;
insert all
into message_library(MESSAGE_TYPE,CONTENT,TIME) values (1,'�û�2��������Ƶ1������',TO_TIMESTAMP('2008-12-01 12:12:09.123456', 'YYYY-MM-DD HH24:MI:SS.FF'))
into message_library(MESSAGE_TYPE,CONTENT,TIME) values (2,'�û�3��������Ƶ1����������',TO_TIMESTAMP('2008-12-01 12:12:09.123456', 'YYYY-MM-DD HH24:MI:SS.FF'))
into message_library(MESSAGE_TYPE,CONTENT,TIME) values (3,'����ע���û�1��������Ƶ',TO_TIMESTAMP('2008-12-01 12:12:09.123456', 'YYYY-MM-DD HH24:MI:SS.FF'))
into message_library(MESSAGE_TYPE,CONTENT,TIME) values (4,'�û�4�ٱ���������Ƶ1',TO_TIMESTAMP('2008-12-01 12:12:09.123456', 'YYYY-MM-DD HH24:MI:SS.FF'))
into message_library(MESSAGE_TYPE,CONTENT,TIME) values (5,'�û�3��ע����',TO_TIMESTAMP('2008-12-01 12:12:09.123456', 'YYYY-MM-DD HH24:MI:SS.FF'))
select * from dual;

--10.ӵ���ղؼ�
delete from has_favorites;
insert all
into has_favorites(favorite_id,user_id) values('100000','100000')
into has_favorites(favorite_id,user_id) values('100001','100001')
into has_favorites(favorite_id,user_id) values('100002','100002')
into has_favorites(favorite_id,user_id) values('100003','100003')
select * from dual;

--11.ӵ����Ƶ
delete from has_video;
insert all
into has_video(favorite_id,video_id,add_time) values('100000','100000',TO_TIMESTAMP('2008-12-01 12:12:09.123456', 'YYYY-MM-DD HH24:MI:SS.FF'))
into has_video(favorite_id,video_id,add_time) values('100001','100001',TO_TIMESTAMP('2008-12-01 12:12:09.123456', 'YYYY-MM-DD HH24:MI:SS.FF'))
select * from dual;

--12.���ڷ���
delete from has_zone;
insert all
into has_zone(zone_name,video_id) values('����1������(1,2)',100000)
into has_zone(zone_name,video_id) values('����1������(1,2)',100001)
into has_zone(zone_name,video_id) values('����2������(3)',100002)
into has_zone(zone_name,video_id) values('����3������(4)',100003)
select * from dual;

--13.�������۱�
delete from send_comment;
insert all
into send_comment(COMMENT_ID,USER_ID) values('100000','100000')
into send_comment(COMMENT_ID,USER_ID) values('100001','100001')
into send_comment(COMMENT_ID,USER_ID) values('100002','100002')
into send_comment(COMMENT_ID,USER_ID) values('100003','100003')
into send_comment(COMMENT_ID,USER_ID) values('100004','100003')
into send_comment(COMMENT_ID,USER_ID) values('100005','100003')
select * from dual;

--14.ӵ�����۱�
delete from has_comment;
insert all
into has_comment(COMMENT_ID,VIDEO_ID,COMMENT_TIME) values('100000','100000',TO_TIMESTAMP('2008-12-01 12:12:09.123456', 'YYYY-MM-DD HH24:MI:SS.FF'))
into has_comment(COMMENT_ID,VIDEO_ID,COMMENT_TIME) values('100001','100000',TO_TIMESTAMP('2008-12-01 12:12:09.123456', 'YYYY-MM-DD HH24:MI:SS.FF'))
into has_comment(COMMENT_ID,VIDEO_ID,COMMENT_TIME) values('100002','100000',TO_TIMESTAMP('2008-12-01 12:12:09.123456', 'YYYY-MM-DD HH24:MI:SS.FF'))
into has_comment(COMMENT_ID,VIDEO_ID,COMMENT_TIME) values('100003','100000',TO_TIMESTAMP('2008-12-01 12:12:09.123456', 'YYYY-MM-DD HH24:MI:SS.FF'))
into has_comment(COMMENT_ID,VIDEO_ID,COMMENT_TIME) values('100004','100002',TO_TIMESTAMP('2008-12-01 12:12:09.123456', 'YYYY-MM-DD HH24:MI:SS.FF'))
into has_comment(COMMENT_ID,VIDEO_ID,COMMENT_TIME) values('100005','100003',TO_TIMESTAMP('2008-12-01 12:12:09.123456', 'YYYY-MM-DD HH24:MI:SS.FF'))
select * from dual;

--15.�ϴ���Ƶ��
delete from upload_video;
insert all
into upload_video(VIDEO_ID,USER_ID) values('100000','100000')
into upload_video(VIDEO_ID,USER_ID) values('100001','100000')
into upload_video(VIDEO_ID,USER_ID) values('100002','100001')
into upload_video(VIDEO_ID,USER_ID) values('100003','100002')
select * from dual;

--16.ӵ�б�ǩ��
delete from has_tag;
insert all
into has_tag(VIDEO_ID,TAG_NAME) values('100000','��ǩ1����(1,2,3,4)')
into has_tag(VIDEO_ID,TAG_NAME) values('100001','��ǩ1����(1,2,3,4)')
into has_tag(VIDEO_ID,TAG_NAME) values('100002','��ǩ1����(1,2,3,4)')
into has_tag(VIDEO_ID,TAG_NAME) values('100003','��ǩ1����(1,2,3,4)')
into has_tag(VIDEO_ID,TAG_NAME) values('100001','��ǩ2����(2,3,4)')
into has_tag(VIDEO_ID,TAG_NAME) values('100002','��ǩ2����(2,3,4)')
into has_tag(VIDEO_ID,TAG_NAME) values('100003','��ǩ2����(2,3,4)')
into has_tag(VIDEO_ID,TAG_NAME) values('100000','��ǩ3����(1,2)')
into has_tag(VIDEO_ID,TAG_NAME) values('100001','��ǩ3����(1,2)')
select * from dual;

--17.����Ƶ��
--TYPE:0�ǲ�������1�ǵ�����
delete from sort_video;
insert all
into sort_video(REFRESH_TIME,VIDEO_ID,TYPE,RANK) values(TO_TIMESTAMP('2006-12-01 12:12:09.123456', 'YYYY-MM-DD HH24:MI:SS.FF'),'100000',0,1)
into sort_video(REFRESH_TIME,VIDEO_ID,TYPE,RANK) values(TO_TIMESTAMP('2006-12-01 12:12:09.123456', 'YYYY-MM-DD HH24:MI:SS.FF'),'100002',0,2)
into sort_video(REFRESH_TIME,VIDEO_ID,TYPE,RANK) values(TO_TIMESTAMP('2006-12-01 12:12:09.123456', 'YYYY-MM-DD HH24:MI:SS.FF'),'100003',0,3)
into sort_video(REFRESH_TIME,VIDEO_ID,TYPE,RANK) values(TO_TIMESTAMP('2006-12-01 12:12:09.123456', 'YYYY-MM-DD HH24:MI:SS.FF'),'100001',0,4)
into sort_video(REFRESH_TIME,VIDEO_ID,TYPE,RANK) values(TO_TIMESTAMP('2007-12-01 12:12:09.123456', 'YYYY-MM-DD HH24:MI:SS.FF'),'100000',1,1)
into sort_video(REFRESH_TIME,VIDEO_ID,TYPE,RANK) values(TO_TIMESTAMP('2007-12-01 12:12:09.123456', 'YYYY-MM-DD HH24:MI:SS.FF'),'100002',1,2)
into sort_video(REFRESH_TIME,VIDEO_ID,TYPE,RANK) values(TO_TIMESTAMP('2007-12-01 12:12:09.123456', 'YYYY-MM-DD HH24:MI:SS.FF'),'100001',1,3)
into sort_video(REFRESH_TIME,VIDEO_ID,TYPE,RANK) values(TO_TIMESTAMP('2007-12-01 12:12:09.123456', 'YYYY-MM-DD HH24:MI:SS.FF'),'100003',1,4)
select * from dual;

--18.���ޱ�
delete from likes;
insert all
into likes(VIDEO_ID,USER_ID) values('100000','100000')
into likes(VIDEO_ID,USER_ID) values('100000','100001')
into likes(VIDEO_ID,USER_ID) values('100000','100002')
into likes(VIDEO_ID,USER_ID) values('100000','100003')
into likes(VIDEO_ID,USER_ID) values('100001','100000')
into likes(VIDEO_ID,USER_ID) values('100002','100002')
into likes(VIDEO_ID,USER_ID) values('100002','100003')
into likes(VIDEO_ID,USER_ID) values('100003','100003')
select * from dual;

--19.�û���ϵ��
--RELATIONSHIP_TYPE:1�ǹ�ע��0������
delete from user_relationship;
insert all
into user_relationship(ACTIVE_USER_ID,PASSIVE_USER_ID,RELATIONSHIP_TYPE) values('100001','100000',1)
into user_relationship(ACTIVE_USER_ID,PASSIVE_USER_ID,RELATIONSHIP_TYPE) values('100002','100000',1)
into user_relationship(ACTIVE_USER_ID,PASSIVE_USER_ID,RELATIONSHIP_TYPE) values('100003','100000',1)
into user_relationship(ACTIVE_USER_ID,PASSIVE_USER_ID,RELATIONSHIP_TYPE) values('100001','100002',1)
into user_relationship(ACTIVE_USER_ID,PASSIVE_USER_ID,RELATIONSHIP_TYPE) values('100002','100003',1)
into user_relationship(ACTIVE_USER_ID,PASSIVE_USER_ID,RELATIONSHIP_TYPE) values('100003','100001',1)
select * from dual;

--20.��ʷ��¼��
delete from visit;
insert all
into visit(VIDEO_ID,USER_ID,VISIT_TIME) values('100000','100000',TO_TIMESTAMP('2006-12-01 12:12:09.123456', 'YYYY-MM-DD HH24:MI:SS.FF'))
into visit(VIDEO_ID,USER_ID,VISIT_TIME) values('100000','100001',TO_TIMESTAMP('2006-12-01 12:12:10.123456', 'YYYY-MM-DD HH24:MI:SS.FF'))
into visit(VIDEO_ID,USER_ID,VISIT_TIME) values('100000','100002',TO_TIMESTAMP('2006-12-01 12:12:11.123456', 'YYYY-MM-DD HH24:MI:SS.FF'))
into visit(VIDEO_ID,USER_ID,VISIT_TIME) values('100000','100003',TO_TIMESTAMP('2006-12-01 12:12:12.123456', 'YYYY-MM-DD HH24:MI:SS.FF'))
into visit(VIDEO_ID,USER_ID,VISIT_TIME) values('100000','100000',TO_TIMESTAMP('2006-12-01 12:12:13.123456', 'YYYY-MM-DD HH24:MI:SS.FF'))
into visit(VIDEO_ID,USER_ID,VISIT_TIME) values('100000','100001',TO_TIMESTAMP('2006-12-01 12:12:14.123456', 'YYYY-MM-DD HH24:MI:SS.FF'))
into visit(VIDEO_ID,USER_ID,VISIT_TIME) values('100001','100000',TO_TIMESTAMP('2006-12-01 12:12:15.123456', 'YYYY-MM-DD HH24:MI:SS.FF'))
into visit(VIDEO_ID,USER_ID,VISIT_TIME) values('100002','100001',TO_TIMESTAMP('2006-12-01 12:12:16.123456', 'YYYY-MM-DD HH24:MI:SS.FF'))
into visit(VIDEO_ID,USER_ID,VISIT_TIME) values('100002','100002',TO_TIMESTAMP('2006-12-01 12:12:17.123456', 'YYYY-MM-DD HH24:MI:SS.FF'))
into visit(VIDEO_ID,USER_ID,VISIT_TIME) values('100002','100003',TO_TIMESTAMP('2006-12-01 12:12:18.123456', 'YYYY-MM-DD HH24:MI:SS.FF'))
into visit(VIDEO_ID,USER_ID,VISIT_TIME) values('100003','100002',TO_TIMESTAMP('2006-12-01 12:12:19.123456', 'YYYY-MM-DD HH24:MI:SS.FF'))
into visit(VIDEO_ID,USER_ID,VISIT_TIME) values('100003','100003',TO_TIMESTAMP('2006-12-01 12:12:20.123456', 'YYYY-MM-DD HH24:MI:SS.FF'))
select * from dual;

--21.������Ϣ��
delete from send_message;
insert all
into send_message(USER_ID,MESSAGE_ID) values('100001','100000')
into send_message(USER_ID,MESSAGE_ID) values('100002','100001')
into send_message(USER_ID,MESSAGE_ID) values('100000','100002')
into send_message(USER_ID,MESSAGE_ID) values('100003','100003')
into send_message(USER_ID,MESSAGE_ID) values('100002','100004')
select * from dual;

--22.����Ϣ��
--READ_STATE��1���Ѿ�������0��δ����
delete from get_message;
insert all
into get_message(USER_ID,MESSAGE_ID,READ_STATE) values('100000','100000',0)
into get_message(USER_ID,MESSAGE_ID,READ_STATE) values('100000','100001',0)
into get_message(USER_ID,MESSAGE_ID,READ_STATE) values('100001','100002',0)
into get_message(USER_ID,MESSAGE_ID,READ_STATE) values('100000','100003',0)
into get_message(USER_ID,MESSAGE_ID,READ_STATE) values('100000','100004',0)
select * from dual;
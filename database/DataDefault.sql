--1.用户表(users)
--STATE：1表示“已登录”，0表示“未登录”
--IS_ADMIN:1表示“是管理员”，0表示“不是管理员”
--GENDER：1表示“男”，0表示“女”
delete from users;
insert all
into users(STATE,IS_ADMIN,NICK_NAME,PASSWORD,AVATAR,GENDER,FANS_NUM,FOLLOW_NUM,LOCATION,DOB,SIGNATURE,TEL,WECHAT,QQ,EMAIL) values(0,0,'我叫用户1','password1','avatar_path',1,3,3,'济事楼1楼',to_date('1984-01-11','yyyy-mm-dd'),'用户1的个性签名','11101110111','111011011kk','1110110111','1111@qq.com')
into users(STATE,IS_ADMIN,NICK_NAME,PASSWORD,AVATAR,GENDER,FANS_NUM,FOLLOW_NUM,LOCATION,DOB,SIGNATURE,TEL,WECHAT,QQ,EMAIL) values(0,0,'我叫用户2','password2','avatar_path',0,2,2,'济事楼2楼',to_date('2077-02-22','yyyy-mm-dd'),'用户2的个性签名','22202220222','222022022kk','2220220222','2222@qq.com')
into users(STATE,IS_ADMIN,NICK_NAME,PASSWORD,AVATAR,GENDER,FANS_NUM,FOLLOW_NUM,LOCATION,DOB,SIGNATURE,TEL,WECHAT,QQ,EMAIL) values(0,0,'我叫用户3','password3','avatar_path',0,2,2,'济事楼3楼',to_date('3000-03-29','yyyy-mm-dd'),'用户3的个性签名','33303330333','333033033kk','3330330333','3333@qq.com')
into users(STATE,IS_ADMIN,NICK_NAME,PASSWORD,AVATAR,GENDER,FANS_NUM,FOLLOW_NUM,LOCATION,DOB,SIGNATURE,TEL,WECHAT,QQ,EMAIL) values(0,0,'我叫用户4','password4','avatar_path',1,2,2,'济事楼4楼',to_date('4200-04-29','yyyy-mm-dd'),'用户4的个性签名','44404440444','444044044kk','4440440444','4444@qq.com')
select * from dual;

--2.视频表(videos)
--PRIVACY：1表示“所有人可见”，0表示“仅自己可见”
delete from videos;
insert all
into videos(PRIVACY,COVER,path,DESCRIPTION,LIKES_NUM,PLAY_NUM,COLLECT_NUM,SHARE_NUM,UPLOAD_TIME,TITLE) values(1,'cover_path','video_path','用户1上传的视频1的描述',4,6,4,3,TO_TIMESTAMP('11-01-11 11:11:11.111111', 'YYYY-MM-DD HH24:MI:SS.FF'),'这是视频1的标题')
into videos(PRIVACY,COVER,path,DESCRIPTION,LIKES_NUM,PLAY_NUM,COLLECT_NUM,SHARE_NUM,UPLOAD_TIME,TITLE) values(0,'cover_path','video_path','用户1上传的视频2的描述',1,1,0,0,TO_TIMESTAMP('22-02-21 02:02:02.222222', 'YYYY-MM-DD HH24:MI:SS.FF'),'这是视频2的标题')
into videos(PRIVACY,COVER,path,DESCRIPTION,LIKES_NUM,PLAY_NUM,COLLECT_NUM,SHARE_NUM,UPLOAD_TIME,TITLE) values(1,'cover_path','video_path','用户2上传的视频3的描述',2,3,1,0,TO_TIMESTAMP('33-03-03 03:03:03.333333', 'YYYY-MM-DD HH24:MI:SS.FF'),'这是视频3的标题')
into videos(PRIVACY,COVER,path,DESCRIPTION,LIKES_NUM,PLAY_NUM,COLLECT_NUM,SHARE_NUM,UPLOAD_TIME,TITLE) values(1,'cover_path','video_path','用户4上传的视频4的描述',1,2,0,0,TO_TIMESTAMP('44-04-04 04:04:04.444444', 'YYYY-MM-DD HH24:MI:SS.FF'),'这是视频4的标题')
select * from dual;

--3.收藏夹表
delete from favorite;
insert all
into favorite(FAVORITE_NAME,VIDEO_NUM) values('用户1的收藏夹',1)
into favorite(FAVORITE_NAME,VIDEO_NUM) values('用户2的收藏夹',1)
into favorite(FAVORITE_NAME,VIDEO_NUM) values('用户3的收藏夹',2)
into favorite(FAVORITE_NAME,VIDEO_NUM) values('用户4的收藏夹',1)
select * from dual;

--4.标签
delete from tag;
insert all
into tag(TAG_NAME,REFER_NUM) values('标签1，被(1,2,3,4)',4)
into tag(TAG_NAME,REFER_NUM) values('标签2，被(2,3,4)',3)
into tag(TAG_NAME,REFER_NUM) values('标签3，被(1,2)',2)
select * from dual;

--5.分区
delete from zone;
insert all
into zone(ZONE_NAME,VIDEO_NUM) values('分区1，包括(1,2)',2)
into zone(ZONE_NAME,VIDEO_NUM) values('分区2，包括(3)',1)
into zone(ZONE_NAME,VIDEO_NUM) values('分区3，包括(4)',1)
select * from dual;

--6.管理员
--STATE：1表示“已登录”，0表示“未登录”
--GENDER：1表示“男”，0表示“女”
--delete from administrator;
--insert all
--into administrator(STATE,NICK_NAME,PASSWORD,AVATAR,GENDER,FANS_NUM,FOLLOW_NUM,LOCATION,DOB,SIGNATURE,EMAIL,TEL,WECHAT,QQ) values(0,'我叫管理员1','password1','avatar_path',1,3,3,'济事楼100楼',to_date('1984-01-11','yyyy-mm-dd'),'管理员1的个性签名','11101110111','111011011kk','1110110111','1111@qq.com')
--select * from dual;

--7.评论表
delete from comments;
insert all
into comments(COMMENT_CONTENT,LIKES_NUM) values('这是来自用户1评论视频1的100000号评论',4)
into comments(COMMENT_CONTENT,LIKES_NUM) values('这是来自用户2评论视频1的100001号评论',4)
into comments(COMMENT_CONTENT,LIKES_NUM) values('这是来自用户3评论视频1的100002号评论',4)
into comments(COMMENT_CONTENT,LIKES_NUM) values('这是来自用户4评论视频1的100003号评论',4)
into comments(COMMENT_CONTENT,LIKES_NUM) values('这是来自用户4评论视频3的100004号评论',4)
into comments(COMMENT_CONTENT,LIKES_NUM) values('这是来自用户4评论视频4的100005号评论',4)
select * from dual;

--8.排行榜表
delete from ranking;
insert all
into ranking(refresh_time) values(TO_TIMESTAMP('2006-12-01 12:12:09.123456', 'YYYY-MM-DD HH24:MI:SS.FF'))
into ranking(refresh_time) values(TO_TIMESTAMP('2007-12-01 12:12:09.123456', 'YYYY-MM-DD HH24:MI:SS.FF'))
into ranking(refresh_time) values(TO_TIMESTAMP('2008-12-01 12:12:09.123456', 'YYYY-MM-DD HH24:MI:SS.FF'))
select * from dual;

--9.信息表
--MESSAGE_TYPE,1是点赞,2评论,3发布视频,4举报,5关注
delete from message_library;
insert all
into message_library(MESSAGE_TYPE,CONTENT,TIME) values (1,'用户2给您的视频1点了赞',TO_TIMESTAMP('2008-12-01 12:12:09.123456', 'YYYY-MM-DD HH24:MI:SS.FF'))
into message_library(MESSAGE_TYPE,CONTENT,TIME) values (2,'用户3给您的视频1发表了评论',TO_TIMESTAMP('2008-12-01 12:12:09.123456', 'YYYY-MM-DD HH24:MI:SS.FF'))
into message_library(MESSAGE_TYPE,CONTENT,TIME) values (3,'您关注的用户1发布了视频',TO_TIMESTAMP('2008-12-01 12:12:09.123456', 'YYYY-MM-DD HH24:MI:SS.FF'))
into message_library(MESSAGE_TYPE,CONTENT,TIME) values (4,'用户4举报了您的视频1',TO_TIMESTAMP('2008-12-01 12:12:09.123456', 'YYYY-MM-DD HH24:MI:SS.FF'))
into message_library(MESSAGE_TYPE,CONTENT,TIME) values (5,'用户3关注了你',TO_TIMESTAMP('2008-12-01 12:12:09.123456', 'YYYY-MM-DD HH24:MI:SS.FF'))
select * from dual;

--10.拥有收藏夹
delete from has_favorites;
insert all
into has_favorites(favorite_id,user_id) values('100000','100000')
into has_favorites(favorite_id,user_id) values('100001','100001')
into has_favorites(favorite_id,user_id) values('100002','100002')
into has_favorites(favorite_id,user_id) values('100003','100003')
select * from dual;

--11.拥有视频
delete from has_video;
insert all
into has_video(favorite_id,video_id,add_time) values('100000','100000',TO_TIMESTAMP('2008-12-01 12:12:09.123456', 'YYYY-MM-DD HH24:MI:SS.FF'))
into has_video(favorite_id,video_id,add_time) values('100001','100001',TO_TIMESTAMP('2008-12-01 12:12:09.123456', 'YYYY-MM-DD HH24:MI:SS.FF'))
select * from dual;

--12.属于分区
delete from has_zone;
insert all
into has_zone(zone_name,video_id) values('分区1，包括(1,2)',100000)
into has_zone(zone_name,video_id) values('分区1，包括(1,2)',100001)
into has_zone(zone_name,video_id) values('分区2，包括(3)',100002)
into has_zone(zone_name,video_id) values('分区3，包括(4)',100003)
select * from dual;

--13.发送评论表
delete from send_comment;
insert all
into send_comment(COMMENT_ID,USER_ID) values('100000','100000')
into send_comment(COMMENT_ID,USER_ID) values('100001','100001')
into send_comment(COMMENT_ID,USER_ID) values('100002','100002')
into send_comment(COMMENT_ID,USER_ID) values('100003','100003')
into send_comment(COMMENT_ID,USER_ID) values('100004','100003')
into send_comment(COMMENT_ID,USER_ID) values('100005','100003')
select * from dual;

--14.拥有评论表
delete from has_comment;
insert all
into has_comment(COMMENT_ID,VIDEO_ID,COMMENT_TIME) values('100000','100000',TO_TIMESTAMP('2008-12-01 12:12:09.123456', 'YYYY-MM-DD HH24:MI:SS.FF'))
into has_comment(COMMENT_ID,VIDEO_ID,COMMENT_TIME) values('100001','100000',TO_TIMESTAMP('2008-12-01 12:12:09.123456', 'YYYY-MM-DD HH24:MI:SS.FF'))
into has_comment(COMMENT_ID,VIDEO_ID,COMMENT_TIME) values('100002','100000',TO_TIMESTAMP('2008-12-01 12:12:09.123456', 'YYYY-MM-DD HH24:MI:SS.FF'))
into has_comment(COMMENT_ID,VIDEO_ID,COMMENT_TIME) values('100003','100000',TO_TIMESTAMP('2008-12-01 12:12:09.123456', 'YYYY-MM-DD HH24:MI:SS.FF'))
into has_comment(COMMENT_ID,VIDEO_ID,COMMENT_TIME) values('100004','100002',TO_TIMESTAMP('2008-12-01 12:12:09.123456', 'YYYY-MM-DD HH24:MI:SS.FF'))
into has_comment(COMMENT_ID,VIDEO_ID,COMMENT_TIME) values('100005','100003',TO_TIMESTAMP('2008-12-01 12:12:09.123456', 'YYYY-MM-DD HH24:MI:SS.FF'))
select * from dual;

--15.上传视频表
delete from upload_video;
insert all
into upload_video(VIDEO_ID,USER_ID) values('100000','100000')
into upload_video(VIDEO_ID,USER_ID) values('100001','100000')
into upload_video(VIDEO_ID,USER_ID) values('100002','100001')
into upload_video(VIDEO_ID,USER_ID) values('100003','100002')
select * from dual;

--16.拥有标签表
delete from has_tag;
insert all
into has_tag(VIDEO_ID,TAG_NAME) values('100000','标签1，被(1,2,3,4)')
into has_tag(VIDEO_ID,TAG_NAME) values('100001','标签1，被(1,2,3,4)')
into has_tag(VIDEO_ID,TAG_NAME) values('100002','标签1，被(1,2,3,4)')
into has_tag(VIDEO_ID,TAG_NAME) values('100003','标签1，被(1,2,3,4)')
into has_tag(VIDEO_ID,TAG_NAME) values('100001','标签2，被(2,3,4)')
into has_tag(VIDEO_ID,TAG_NAME) values('100002','标签2，被(2,3,4)')
into has_tag(VIDEO_ID,TAG_NAME) values('100003','标签2，被(2,3,4)')
into has_tag(VIDEO_ID,TAG_NAME) values('100000','标签3，被(1,2)')
into has_tag(VIDEO_ID,TAG_NAME) values('100001','标签3，被(1,2)')
select * from dual;

--17.排视频表
--TYPE:0是播放量，1是点赞数
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

--18.点赞表
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

--19.用户关系表
--RELATIONSHIP_TYPE:1是关注，0是拉黑
delete from user_relationship;
insert all
into user_relationship(ACTIVE_USER_ID,PASSIVE_USER_ID,RELATIONSHIP_TYPE) values('100001','100000',1)
into user_relationship(ACTIVE_USER_ID,PASSIVE_USER_ID,RELATIONSHIP_TYPE) values('100002','100000',1)
into user_relationship(ACTIVE_USER_ID,PASSIVE_USER_ID,RELATIONSHIP_TYPE) values('100003','100000',1)
into user_relationship(ACTIVE_USER_ID,PASSIVE_USER_ID,RELATIONSHIP_TYPE) values('100001','100002',1)
into user_relationship(ACTIVE_USER_ID,PASSIVE_USER_ID,RELATIONSHIP_TYPE) values('100002','100003',1)
into user_relationship(ACTIVE_USER_ID,PASSIVE_USER_ID,RELATIONSHIP_TYPE) values('100003','100001',1)
select * from dual;

--20.历史记录表
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

--21.发送信息表
delete from send_message;
insert all
into send_message(USER_ID,MESSAGE_ID) values('100001','100000')
into send_message(USER_ID,MESSAGE_ID) values('100002','100001')
into send_message(USER_ID,MESSAGE_ID) values('100000','100002')
into send_message(USER_ID,MESSAGE_ID) values('100003','100003')
into send_message(USER_ID,MESSAGE_ID) values('100002','100004')
select * from dual;

--22.收信息表
--READ_STATE：1是已经看过，0是未看过
delete from get_message;
insert all
into get_message(USER_ID,MESSAGE_ID,READ_STATE) values('100000','100000',0)
into get_message(USER_ID,MESSAGE_ID,READ_STATE) values('100000','100001',0)
into get_message(USER_ID,MESSAGE_ID,READ_STATE) values('100001','100002',0)
into get_message(USER_ID,MESSAGE_ID,READ_STATE) values('100000','100003',0)
into get_message(USER_ID,MESSAGE_ID,READ_STATE) values('100000','100004',0)
select * from dual;
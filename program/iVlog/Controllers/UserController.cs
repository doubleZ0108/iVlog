using iVlog.Models;
using LitJson;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace iVlog.Controllers
{
    public class UserController : Controller
    {
        private Entities2 db = new Entities2();

        /*Index-->*/
        //获取某视频的标签
        public TAG[] GetTagsOfVideo(string video_id)
        {
            VIDEOS v = db.VIDEOS.Find(video_id);
            int num = 0;
            foreach (var item in v.TAG)
            {
                num++;
            }
            TAG[] tags = new TAG[num];
            for (int i = 0; i < num; i++)
            {
                tags[i] = v.TAG.ElementAt(i);
            }

            return tags;
        }

        //返回用户及视频信息
        public JsonResult fun_enter_mypage(string id)
        {
            USERS uSERS = new USERS();
            uSERS = db.USERS.Find(id);
            JsonData jsondata_root = new JsonData();
            jsondata_root["user_info"] = new JsonData();
            jsondata_root["video_info_list"] = new JsonData();


            JsonData jsondata_userinfo = new JsonData();
            if (uSERS != null)
            {
                jsondata_userinfo["nick_name"] = uSERS.NICK_NAME;
                jsondata_userinfo["avatar"] = uSERS.AVATAR;
                jsondata_userinfo["gender"] = uSERS.GENDER.ToString();
                jsondata_userinfo["signature"] = uSERS.SIGNATURE;
                jsondata_userinfo["follow_num"] = uSERS.FOLLOW_NUM.ToString();
                jsondata_userinfo["fans_num"] = uSERS.FANS_NUM.ToString();
                jsondata_userinfo["qq"] = uSERS.QQ;
                jsondata_userinfo["wechat"] = uSERS.WECHAT;
                jsondata_userinfo["tel"] = uSERS.TEL.ToString();
                jsondata_userinfo["email"] = uSERS.EMAIL;
            }
            jsondata_root["user_info"] = jsondata_userinfo;

            var vIDEO =
                (from a in db.VIDEOS
                 where (from c in db.UPLOAD_VIDEO
                        where c.USER_ID == id
                        select c.VIDEO_ID).Distinct().Contains(a.VIDEO_ID)
                 select a).Distinct();
            var video = vIDEO.ToList();//视频列表
            if (video.Count()!= 0)
            {
                foreach (VIDEOS i in video)
                {
                    JsonData temp_video_info = new JsonData();
                    var tags = GetTagsOfVideo(i.VIDEO_ID);

                    temp_video_info["tags"] = new JsonData();
                    foreach (TAG tag in tags)
                    {
                        JsonData tag_name = new JsonData();
                        tag_name["tag_name"] = tag.TAG_NAME;
                        temp_video_info["tags"].Add(tag_name);
                    }
                    temp_video_info["video_id"] = i.VIDEO_ID;
                    temp_video_info["cover"] = i.COVER;
                    temp_video_info["title"] = "Title";
                    string[] Strs = (i.UPLOAD_TIME.ToString()).Split('/');
                    string[] str = Strs[2].Split(' ');
                    JsonData time_json = new JsonData();
                    time_json["year"] = Strs[0];
                    if (Strs[1].Count() == 1)
                    { Strs[1] = "0" + Strs[1]; }
                    time_json["month"] = Strs[1];
                    if (str[0].Count() == 1)
                    { str[0] = "0" + str[0]; }
                    time_json["day"] = str[0];
                    time_json["hours_minute_second"] = str[1];
                    temp_video_info["upload_time"] = time_json;
                    temp_video_info["description"] = i.DESCRIPTION;
                    temp_video_info["likes_num"] = i.LIKES_NUM.ToString();
                    temp_video_info["play_num"] = i.PLAY_NUM.ToString();
                    jsondata_root["video_info_list"].Add(temp_video_info);
                }
            }
            else
            {
                jsondata_root["video_info_list"]="null";
            }

            return Json(jsondata_root.ToJson());
        }
        /*Index-->*/

        /*History-->*/
        public JsonResult VideoHistoryToJsonResult(List<VIDEOS> videoList, List<USERS> userList)
        {
            JsonData jsonData = new JsonData();
            jsonData["user_info"] = new JsonData();
            jsonData["video_info"] = new JsonData();
            foreach (var item in userList)
            {
                JsonData temp_video_info = new JsonData();
                temp_video_info["nick_name"] = item.NICK_NAME;
                temp_video_info["avatar"] = item.AVATAR;
                temp_video_info["gender"] = item.GENDER.ToString();
                temp_video_info["signature"] = item.SIGNATURE;
                temp_video_info["follow_num"] = item.FOLLOW_NUM.ToString();
                temp_video_info["fans_num"] = item.FANS_NUM.ToString();
                temp_video_info["qq"] = item.QQ;
                temp_video_info["wechat"] = item.WECHAT;
                temp_video_info["tel"] = item.TEL.ToString();
                temp_video_info["email"] = item.EMAIL;

                jsonData["user_info"] = temp_video_info;
            }
            foreach (var item in videoList)
            {
                string nowTime = DateTime.Now.ToString();
                var visittime = from i in db.VISIT
                                where item.VIDEO_ID == i.VIDEO_ID
                                select i.VISIT_TIME;
                string visitTime = visittime.ToList().FirstOrDefault().ToString();

                string[] str1 = visitTime.Split('/', ' ', ':');
                string[] str2 = nowTime.Split('/', ' ', ':');
                int monthspan = int.Parse(str2[1]) - int.Parse(str1[1]);
                int dayspan = int.Parse(str2[2]) - int.Parse(str1[2]);
                int hourspan = int.Parse(str2[3]) - int.Parse(str1[3]);
                int minutespan = int.Parse(str2[4]) - int.Parse(str1[4]);
                int secondspan = int.Parse(str2[5]) - int.Parse(str1[5]);




                JsonData temp_video_info = new JsonData();
                if (monthspan > 0)
                {
                    temp_video_info["timespan"] = (30 * monthspan - int.Parse(str1[2]) + int.Parse(str2[2])).ToString() + "天" + "前";
                }
                else if (dayspan > 0)
                {
                    if ((24 * dayspan - int.Parse(str1[3]) + int.Parse(str2[3])) >= 24)
                    {
                        temp_video_info["timespan"] = ((24 * dayspan - int.Parse(str1[3]) + int.Parse(str2[3])) / 24).ToString() + "天" + "前";
                    }
                    else
                    {
                        temp_video_info["timespan"] = (24 * dayspan - int.Parse(str1[3]) + int.Parse(str2[3])).ToString() + "小时" + "前";
                    }
                }
                else if (hourspan > 0)
                {
                    if ((60 * hourspan - int.Parse(str1[4]) + int.Parse(str2[4])) >= 60)
                    {
                        temp_video_info["timespan"] = ((60 * hourspan - int.Parse(str1[4]) + int.Parse(str2[4])) / 60).ToString() + "小时" + "前";
                    }
                    else
                    {
                        temp_video_info["timespan"] = (60 * hourspan - int.Parse(str1[4]) + int.Parse(str2[4])).ToString() + "分钟" + "前";
                    }
                }
                else if (minutespan > 0)
                {
                    temp_video_info["timespan"] = minutespan.ToString() + "分钟" + "前";
                }

                temp_video_info["title"] = item.TITLE.ToString();
                temp_video_info["cover"] = item.COVER.ToString();
                temp_video_info["video_id"] = item.VIDEO_ID.ToString();



                jsonData["video_info"].Add(temp_video_info);
            }



            return Json(jsonData.ToJson());
        }
        public JsonResult ViewHistory(string visit_user_id)
        {
            var visit_video_id = from u in db.VISIT
                                 orderby u.VISIT_TIME descending
                                 where u.USER_ID == visit_user_id
                                 select u.VIDEO_ID;
            int num = 0;
            List<VIDEOS> video = new List<VIDEOS>();
            foreach (var i in visit_video_id)
            {
                video.Add(db.VIDEOS.Find(i));
                num += 1;
                if (num == 8)
                {
                    break;
                }
            }


            if (video.FirstOrDefault() == null)
            {
                return null;
            }

            var user = from i in db.USERS
                       where i.USER_ID == visit_user_id
                       select i;

            var userlist = user.ToList();




            return VideoHistoryToJsonResult(video, userlist);
        }
        /*History-->*/

        /*Favorite-->*/
        public JsonResult VideoFavouriteToJsonResult(List<VIDEOS> videoList, List<USERS> userList)
        {
            JsonData jsonData = new JsonData();
            jsonData["user_info"] = new JsonData();
            jsonData["video_info"] = new JsonData();
            foreach (var item in userList)
            {
                JsonData temp_video_info = new JsonData();
                temp_video_info["nick_name"] = item.NICK_NAME;
                temp_video_info["avatar"] = item.AVATAR;
                temp_video_info["gender"] = item.GENDER.ToString();
                temp_video_info["signature"] = item.SIGNATURE;
                temp_video_info["follow_num"] = item.FOLLOW_NUM.ToString();
                temp_video_info["fans_num"] = item.FANS_NUM.ToString();
                temp_video_info["qq"] = item.QQ;
                temp_video_info["wechat"] = item.WECHAT;
                temp_video_info["tel"] = item.TEL.ToString();
                temp_video_info["email"] = item.EMAIL;


                jsonData["user_info"] = (temp_video_info);
            }
            foreach (var item in videoList)
            {
                JsonData temp_video_info = new JsonData();

                temp_video_info["title"] = item.TITLE.ToString();
                temp_video_info["cover"] = item.COVER.ToString();
                temp_video_info["video_id"] = item.VIDEO_ID.ToString();
                jsonData["video_info"].Add(temp_video_info);
            }

            return Json(jsonData.ToJson());
        }
        public ActionResult ViewFavourite(string user_id)
        {
            var fav_video = from a in db.VIDEOS
                            from b in db.HAS_VIDEO
                            from c in db.HAS_FAVORITES
                            where a.VIDEO_ID == b.VIDEO_ID && b.FAVORITE_ID == c.FAVORITE_ID && c.USER_ID == user_id
                            select a;
            if (fav_video.FirstOrDefault() == null)
            {
                return null;
            }
            var Fav_video = fav_video.ToList();
            var user = from i in db.USERS
                       where i.USER_ID == user_id
                       select i;

            var userlist = user.ToList();
            return VideoFavouriteToJsonResult(Fav_video, userlist);
        }
        /*Favorite-->*/

        /*Attention-->*/
        public ActionResult FollowingList(string user_id)
        {
            //获取关注人
            var ur = from a in db.USER_RELATIONSHIP
                     where a.ACTIVE_USER_ID == user_id && a.RELATIONSHIP_TYPE == 1
                     select a.PASSIVE_USER_ID;
            JsonData jsonData = new JsonData();
            jsonData["user_info"] = new JsonData();
            jsonData["Followed_user_info"] = new JsonData();

            var user = db.USERS.Find(user_id);
            if (user != null)
            {
                JsonData user_info = new JsonData();
                user_info["nick_name"] = user.NICK_NAME;
                user_info["avator"] = user.AVATAR;
                user_info["gender"] = user.GENDER.ToString();
                user_info["signature"] = user.SIGNATURE;
                user_info["follow_num"] = user.FOLLOW_NUM.ToString();
                user_info["fans_num"] = user.FANS_NUM.ToString();
                user_info["qq"] = user.QQ;
                user_info["wechat"] = user.WECHAT;
                user_info["tel"] = user.TEL.ToString();
                user_info["email"] = user.EMAIL;
                jsonData["user_info"] = user_info;
            }



            foreach (var item in ur)
            {
                var followed_user = db.USERS.Find(item);
                JsonData temp = new JsonData();
                temp["name"] = followed_user.NICK_NAME;
                temp["signature"] = followed_user.SIGNATURE;
                temp["img"] = followed_user.AVATAR;

                //查找所有新消息
                var allNewMessages = from sm in db.SEND_MESSAGE
                                     from gm in db.GET_MESSAGE
                                     from mes in db.MESSAGE_LIBRARY
                                     where sm.MESSAGE_ID == gm.MESSAGE_ID && gm.USER_ID == user_id && gm.READ_STATE == false && sm.USER_ID == followed_user.USER_ID && mes.MESSAGE_ID == sm.MESSAGE_ID && mes.MESSAGE_TYPE == 4
                                     select sm;
                temp["message_count"] = allNewMessages.Count();
                jsonData["Followed_user_info"].Add(temp);
            }

            return Json(jsonData.ToJson());
        }
        /*Attention-->*/

        /*Message-->*/
        //List转JsonResult
        public JsonResult MessageToJsonResult(List<MESSAGE_LIBRARY> likeList, List<MESSAGE_LIBRARY> followList, List<MESSAGE_LIBRARY> complainList, List<MESSAGE_LIBRARY> commentList, List<USERS> userList)
        {
            JsonData jsonData = new JsonData();
            jsonData["user_info"] = new JsonData();
            jsonData["like_message"] = new JsonData();
            jsonData["follow_message"] = new JsonData();
            jsonData["complain_message"] = new JsonData();
            jsonData["comment_message"] = new JsonData();
            foreach (var item in userList)
            {
                JsonData temp_video_info = new JsonData();
                temp_video_info["nick_name"] = item.NICK_NAME;
                temp_video_info["avatar"] = item.AVATAR;
                temp_video_info["gender"] = item.GENDER.ToString();
                temp_video_info["signature"] = item.SIGNATURE;
                temp_video_info["follow_num"] = item.FOLLOW_NUM.ToString();
                temp_video_info["fans_num"] = item.FANS_NUM.ToString();
                temp_video_info["qq"] = item.QQ;
                temp_video_info["wechat"] = item.WECHAT;
                temp_video_info["tel"] = item.TEL.ToString();
                temp_video_info["email"] = item.EMAIL;


                jsonData["user_info"] = temp_video_info;
            }
            foreach (var item in likeList)
            {

                JsonData temp_message_info = new JsonData();
                temp_message_info["user_id"] = item.SEND_MESSAGE.USER_ID;
                temp_message_info["message_type"] = item.MESSAGE_TYPE.ToString();
                temp_message_info["content"] = item.CONTENT;
                temp_message_info["time"] = item.TIME.ToString();
                jsonData["like_message"].Add(temp_message_info);
            }
            foreach (var item in followList)
            {

                JsonData temp_message_info = new JsonData();
                temp_message_info["user_id"] = item.SEND_MESSAGE.USER_ID;
                temp_message_info["message_type"] = item.MESSAGE_TYPE.ToString();
                temp_message_info["content"] = item.CONTENT;
                temp_message_info["time"] = item.TIME.ToString();
                jsonData["follow_message"].Add(temp_message_info);
            }
            foreach (var item in complainList)
            {

                JsonData temp_message_info = new JsonData();
                temp_message_info["user_id"] = item.SEND_MESSAGE.USER_ID;
                temp_message_info["message_type"] = item.MESSAGE_TYPE.ToString();
                temp_message_info["content"] = item.CONTENT;
                temp_message_info["time"] = item.TIME.ToString();
                jsonData["complain_message"].Add(temp_message_info);
            }
            foreach (var item in commentList)
            {

                JsonData temp_message_info = new JsonData();
                temp_message_info["user_id"] = item.SEND_MESSAGE.USER_ID;
                temp_message_info["message_type"] = item.MESSAGE_TYPE.ToString();
                temp_message_info["content"] = item.CONTENT;
                temp_message_info["time"] = item.TIME.ToString();
                jsonData["comment_message"].Add(temp_message_info);
            }

            return Json(jsonData.ToJson());
        }
        public ActionResult ViewMessage(string user_id)
        {
            //找出用户的所有收到的所有信息（未读）
            var likeMessage = from m in db.GET_MESSAGE
                              from u in db.MESSAGE_LIBRARY
                              where m.USER_ID == user_id && m.MESSAGE_ID == u.MESSAGE_ID && u.MESSAGE_TYPE == 0 && m.READ_STATE == false
                              select u;
            var followMessage = from m in db.GET_MESSAGE
                                from u in db.MESSAGE_LIBRARY
                                where m.USER_ID == user_id && m.MESSAGE_ID == u.MESSAGE_ID && u.MESSAGE_TYPE == 1 && m.READ_STATE == false
                                select u;
            var complainMessage = from m in db.GET_MESSAGE
                                  from u in db.MESSAGE_LIBRARY
                                  where m.USER_ID == user_id && m.MESSAGE_ID == u.MESSAGE_ID && u.MESSAGE_TYPE == 2 && m.READ_STATE == false
                                  select u;
            var commentMessage = from m in db.GET_MESSAGE
                                 from u in db.MESSAGE_LIBRARY
                                 where m.USER_ID == user_id && m.MESSAGE_ID == u.MESSAGE_ID && u.MESSAGE_TYPE == 3 && m.READ_STATE == false
                                 select u;
            var getMessage = from m in db.GET_MESSAGE
                             where m.USER_ID == user_id
                             select m;
            if (likeMessage.FirstOrDefault() == null && followMessage.FirstOrDefault() == null && complainMessage.FirstOrDefault() == null && commentMessage.FirstOrDefault() == null)
            {
                return null;
            }



            var LikeMessage = likeMessage.ToList();
            var FollowMessage = followMessage.ToList();
            var ComplainMessage = complainMessage.ToList();
            var CommentMessage = commentMessage.ToList();

            var user = from i in db.USERS
                       where i.USER_ID == user_id
                       select i;

            var userlist = user.ToList();

            return MessageToJsonResult(LikeMessage, FollowMessage, ComplainMessage, CommentMessage, userlist);
        }
        public int ReadOneMessage(string message_id)
        {
            var oneMessage = from i in db.GET_MESSAGE
                             where i.MESSAGE_ID == message_id
                             select i;
            oneMessage.FirstOrDefault().READ_STATE = true;
            return 0;
        }

        public int SendMessage(decimal? message_type, string active_user_id, string passive_user_id, string video_id = null)
        {
            MESSAGE_LIBRARY message_library = new MESSAGE_LIBRARY();
            message_library.MESSAGE_TYPE = message_type;
            message_library.TIME = DateTime.Now;

            SEND_MESSAGE send_message = new SEND_MESSAGE();
            send_message.USER_ID = active_user_id;

            GET_MESSAGE get_message = new GET_MESSAGE();
            get_message.USER_ID = passive_user_id;
            get_message.READ_STATE = false;

            //如果是点赞的话
            if (message_type == 0)
            {

                var a = from u in db.VIDEOS
                        where u.VIDEO_ID == video_id
                        select u;
                var video_name = a.FirstOrDefault().TITLE.ToString();

                var b = from u in db.USERS
                        where u.USER_ID == active_user_id
                        select u;
                var user_name = b.FirstOrDefault().NICK_NAME.ToString();
                message_library.CONTENT = user_name + "点赞了" + video_name;
            }

            //如果是关注的话
            else if (message_type == 1)
            {
                var a = from u in db.USERS
                        where u.USER_ID == passive_user_id
                        select u;

                var b = from u in db.USERS
                        where u.USER_ID == active_user_id
                        select u;
                var user_name = b.FirstOrDefault().NICK_NAME.ToString();
                message_library.CONTENT = user_name + "关注了您";
            }

            //如果是举报的话
            else if (message_type == 2)
            {
                var a = from u in db.VIDEOS
                        where u.VIDEO_ID == video_id
                        select u;
                var video_name = a.FirstOrDefault().TITLE.ToString();

                var b = from u in db.USERS
                        where u.USER_ID == active_user_id
                        select u;
                message_library.CONTENT = video_name + "被举报了";
            }

            //如果是评论的话
            else if (message_type == 3)
            {
                var a = from u in db.VIDEOS
                        where u.VIDEO_ID == video_id
                        select u;
                var video_name = a.FirstOrDefault().TITLE.ToString();

                var b = from u in db.USERS
                        where u.USER_ID == active_user_id
                        select u;
                var user_name = b.FirstOrDefault().NICK_NAME.ToString();
                message_library.CONTENT = user_name + "评论了" + video_name;
            }
            var i = from a in db.MESSAGE_LIBRARY
                    orderby a.TIME descending
                    select a.MESSAGE_ID;

            message_library.MESSAGE_ID = (i.ToList().Count() + 1).ToString();
            db.MESSAGE_LIBRARY.Add(message_library);
            db.SaveChanges();
            var s = from a in db.MESSAGE_LIBRARY
                    orderby a.TIME descending
                    select a.MESSAGE_ID;
            var id = s.ToList().FirstOrDefault();

            send_message.MESSAGE_ID = id;
            get_message.MESSAGE_ID = id;
            db.SEND_MESSAGE.Add(send_message);
            db.GET_MESSAGE.Add(get_message);

            db.SaveChanges();
            return 0;
        }
        /*Message-->*/

        

        // GET: User
        public ActionResult Index()
        {
            return View();
        }
        [HttpPost]
        public ActionResult Index(string user_id)
        {
            var data = fun_enter_mypage(user_id);
            return data;
        }

        public ActionResult History()
        {
            return View();
        }
        [HttpPost]
        public ActionResult History(string user_id)
        {            
            var data = ViewHistory(user_id);

            return data;
        }

        public ActionResult Favorite()
        {
            return View();
        }
        [HttpPost]
        public ActionResult Favorite(string user_id)
        {
            var data = ViewFavourite(user_id);

            return data;
        }

        public ActionResult Attention()
        {
            return View();
        }
        [HttpPost]
        public ActionResult Attention(string user_id)
        {
            var data = FollowingList(user_id);

            return data;
        }

        public ActionResult Message()
        {
            return View();
        }
        [HttpPost]
        public ActionResult Message(string user_id)
        {
            SendMessage(0, "100020", user_id, "100000");
            var data = ViewMessage(user_id);

            return data;
        }



        public ActionResult PersonalFile(string user_id)
        {
            JsonData jsonData = new JsonData();
            jsonData["user_info"] = new JsonData();
            var user = db.USERS.Find(user_id);
            JsonData temp = new JsonData();
            temp["img"] = user.AVATAR;
            temp["name"] = user.NICK_NAME;
            temp["follow_count"] = user.FOLLOW_NUM.ToString();
            temp["fans_count"] = user.FANS_NUM.ToString();
            temp["signature"] = user.SIGNATURE;
            temp["email"] = user.EMAIL;
            temp["tel"] = user.TEL.ToString();
            temp["wechat"] = user.WECHAT;
            temp["QQ"] = user.QQ;
            jsonData["user_info"] = temp;

            return Json(jsonData.ToJson());
        }
        //setting
        public ActionResult ModifyPersonalFile(FormCollection formdata)
        {

            string user_id = formdata["user_id"];
            var user = db.USERS.Find(user_id);
            if (user == null)
            {
                Dictionary<string, string> d_data = new Dictionary<string, string>();
                d_data.Add("Flag", "true");
                return Json(JsonConvert.SerializeObject(d_data, Formatting.Indented));
            }
            HttpPostedFileBase file = Request.Files["avatar_upload"];
            user.GENDER = false;
            if (Request.Form["gender_upload"] == "True")
            {
                user.GENDER = true;
            }
            user.LOCATION = formdata["location_upload"];

            var yyyy = formdata["year_upload"];
            var mm = formdata["month_upload"];
            var dd = formdata["day_upload"];
            DateTime dateTime = new DateTime();
            DateTime.TryParse(yyyy + "-" + mm + "-" + dd, out dateTime);
            user.DOB = dateTime;

            user.SIGNATURE = formdata["sign_upload"];
            user.EMAIL = formdata["email_upload"];
            user.TEL = Convert.ToInt32(formdata["phone_upload"]);
            user.WECHAT = formdata["wechat_upoad"];
            user.QQ = formdata["qq_upload"];

            //存头像文件
            var filePath = "C:\\Users\\16214\\Desktop\\iVlog\\iVlog\\source\\file\\a\\" + user_id;
            if (!System.IO.Directory.Exists(filePath))
            {
                System.IO.Directory.CreateDirectory(filePath);
            }
            var fileName = file.FileName;
            file.SaveAs(Path.Combine(filePath, fileName));
            filePath = "../../source/file/a/" + user_id;
            user.AVATAR = Path.Combine(filePath, fileName);

            db.Entry(user).State = EntityState.Modified;
            db.SaveChanges();

            Dictionary<string, string> d = new Dictionary<string, string>();
            d.Add("Flag", "true");
            return Json(JsonConvert.SerializeObject(d, Formatting.Indented));
        }






        public ActionResult Setting()
        {
            return View();
        }

        [HttpPost]
        [Route("PostFile")]
        public ActionResult Setting(FormCollection formdata)
        {
            var data = ModifyPersonalFile(formdata);
            return data;
        }

        public ActionResult Other()
        {
            return View();
        }
        public ActionResult Other(string user_id)
        {
            var data = fun_enter_mypage(user_id);

            return data;
        }
    }
}
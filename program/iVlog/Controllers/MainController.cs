using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.IO;
using System.Linq;
using System.Runtime.Serialization.Json;
using System.Text;
using System.Web;
using System.Web.Mvc;
using iVlog.Models;
using LitJson;
using Newtonsoft.Json;

namespace iVlog.Controllers
{
    public class MainController : Controller
    {
        private Entities2 db = new Entities2();

        //Listתstring(Json)
        public string ListToJson<T>(List<T> list)
        {
            StringBuilder jsonBuilder = new StringBuilder();
            jsonBuilder.Append("[");
            for (int i = 0; i < list.Count; i++)
            {
                DataContractJsonSerializer ser = new DataContractJsonSerializer(typeof(T));
                MemoryStream ms = new MemoryStream();
                ser.WriteObject(ms, list[i]);
                StreamReader reader = new StreamReader(ms);
                ms.Position = 0;
                string str = reader.ReadToEnd();
                reader.Close();
                ms.Close();
                jsonBuilder.Append(str);
                jsonBuilder.Append(",");
            }
            jsonBuilder.Remove(jsonBuilder.Length - 1, 1);
            jsonBuilder.Append("]");
            return jsonBuilder.ToString();
        }
        

        //获取某视频的上传者
        public USERS GetUploaderOf(string video_id)
        {
            var upers = from uv in db.UPLOAD_VIDEO
                        where uv.VIDEO_ID == video_id
                        select uv.USER_ID;
            if (upers.FirstOrDefault() == null)
            {
                return null;
            }

            return db.USERS.Find(upers.ToList()[0]);
        }
        //获取某视频的分区
        public ZONE GetZoneOf(string video_id)
        {
            var zones = from hz in db.HAS_ZONE
                        where hz.VIDEO_ID == video_id
                        select hz.ZONE_NAME;
            if (zones.FirstOrDefault() == null)
            {
                return null;
            }

            return db.ZONE.Find(zones.ToList()[0]);
        }
        //获取某视频的标签
        public TAG[] GetTagsOf(string video_id)
        {
            VIDEOS v = db.VIDEOS.Find(video_id);
            TAG[] tags = new TAG[v.TAG.Count];
            for (int i = 0; i < v.TAG.Count; i++)
            {
                tags[i] = v.TAG.ElementAt(i);
            }

            return tags;
        }
        //获取某用户的投稿次数
        public int GetVideoCountOfUser(string user_id)
        {
            var items = from uv in db.UPLOAD_VIDEO
                        where uv.USER_ID == user_id
                        select uv;
            return items.Count();
        }

        public JsonResult RankingToJsonResult(List<VIDEOS> playList, List<VIDEOS> likeList, List<USERS> userList)
        {
            JsonData jsonData = new JsonData();

            jsonData["user_info"] = new JsonData();
            jsonData["play_num_ranking"] = new JsonData();
            jsonData["like_num_ranking"] = new JsonData();
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

                jsonData["user_info"].Add(temp_video_info);
            }
            if (playList.FirstOrDefault() == null)
            {
                jsonData["play_num_ranking"] = "null";
            }
            else
            {
                foreach (var item in playList)
                {

                    JsonData temp_video_info = new JsonData();
                    temp_video_info["video_id"] = item.VIDEO_ID;
                    temp_video_info["rank"] = (playList.FindIndex(i => i.Equals(item)) + 1).ToString();
                    ; temp_video_info["title"] = item.TITLE;
                    temp_video_info["img"] = item.COVER;
                    temp_video_info["play"] = item.PLAY_NUM.ToString();
                    jsonData["play_num_ranking"].Add(temp_video_info);

                }
            }
            if (likeList.FirstOrDefault() == null)
            {
                jsonData["like_num_ranking"] = "null";
            }
            else
            {
                foreach (var item in likeList)
                {

                    JsonData temp_video_info = new JsonData();
                    temp_video_info["video_id"] = item.VIDEO_ID;
                    temp_video_info["rank"] = (likeList.FindIndex(i => i.Equals(item)) + 1).ToString();
                    temp_video_info["title"] = item.TITLE;
                    temp_video_info["img"] = item.COVER;
                    temp_video_info["like"] = item.LIKES_NUM.ToString();



                    jsonData["like_num_ranking"].Add(temp_video_info);
                }
            }

            return Json(jsonData.ToJson());
        }


        public ActionResult video_ranking(string user_id)
        {

            RankRefresh();


            var play_video_sort = from v in db.SORT_VIDEO
                                  where v.TYPE == true
                                  select v;
            var play_video_sort1 = from v in play_video_sort
                                   from u in db.VIDEOS
                                   where v.REFRESH_TIME == play_video_sort.Select(s => s.REFRESH_TIME).Max() && v.RANK <= 8 && v.VIDEO_ID == u.VIDEO_ID
                                   select u;
            var play_sort_video = from i in play_video_sort1
                                  orderby i.PLAY_NUM descending
                                  select i;
            var play_list = play_sort_video.ToList();

            var like_video_sort = from v in db.SORT_VIDEO
                                  where v.TYPE == true
                                  select v;
            var like_video_sort1 = from v in play_video_sort
                                   from u in db.VIDEOS
                                   where v.REFRESH_TIME == play_video_sort.Select(s => s.REFRESH_TIME).Max() && v.RANK <= 8 && v.VIDEO_ID == u.VIDEO_ID
                                   select u;
            var like_sort_video = from i in like_video_sort1
                                  orderby i.LIKES_NUM descending
                                  select i;
            var like_list = like_sort_video.ToList();
            var user = from i in db.USERS
                       where i.USER_ID == user_id
                       select i;

            var userlist = user.ToList();
            return RankingToJsonResult(play_list, like_list, userlist);
        }


        //排行榜刷新函数
        public int RankRefresh()
        {
            //排行榜更新的时间
            DateTime dt = DateTime.Now;
            RANKING ranking = new RANKING();
            ranking.REFRESH_TIME = dt;
            db.RANKING.Add(ranking);

            var videos = from u in db.VIDEOS
                         orderby u.PLAY_NUM descending
                         select u;

            if (videos.FirstOrDefault() != null)
            {
                var num = 10;
                var Videos = videos.ToList();
                if (Videos.Count() > 10)
                {
                    num = 10;
                }
                else
                {
                    num = Videos.Count();
                }
                for (int i = 0; i < num; i++)
                {

                    //为每个视频设置排行榜联系
                    SORT_VIDEO sort_video = new SORT_VIDEO();
                    sort_video.REFRESH_TIME = dt;
                    sort_video.VIDEO_ID = Videos[i].VIDEO_ID;
                    sort_video.TYPE = true;
                    sort_video.RANK = Convert.ToByte(i + 1);
                    db.SORT_VIDEO.Add(sort_video);

                }
            }


            videos = from u in db.VIDEOS
                     orderby u.LIKES_NUM descending
                     select u;

            if (videos.FirstOrDefault() != null)
            {
                var num = 10;
                var Videos = videos.ToList();
                if (Videos.Count() > 10)
                {
                    num = 10;
                }
                else
                {
                    num = Videos.Count();
                }
                for (int i = 0; i < num; i++)
                {

                    //为每个视频设置排行榜联系
                    SORT_VIDEO sort_video = new SORT_VIDEO();
                    sort_video.REFRESH_TIME = dt;
                    sort_video.VIDEO_ID = Videos[i].VIDEO_ID;
                    sort_video.TYPE = false;
                    sort_video.RANK = Convert.ToByte(i + 1);
                    db.SORT_VIDEO.Add(sort_video);

                }
            }

            db.SaveChanges();
            return 0;
        }


        public ActionResult Search_video(string words, string user_Id)
        {
            JsonData root = new JsonData();
            root["video_info"] = new JsonData();
            root["user_info"] = new JsonData();
            root["top_searched"] = new JsonData();

            //获取所有搜索得到的视频
            List<VIDEOS> videoList = new List<VIDEOS>();
            var vds = from v in db.VIDEOS
                      select v;
            if (vds.FirstOrDefault() != null)
            {
                videoList = vds.ToList();
                int num = 0;
                while (num < videoList.Count())
                {
                    if (!videoList.ElementAt(num).TITLE.Contains(words) && videoList.ElementAt(num).TITLE != words)
                    {
                        videoList.Remove(videoList.ElementAt(num));
                    }
                    else
                    {
                        num++;
                    }
                }
            }
            if (videoList.Count() != 0)
            {
                root["video_info"] = VideosToJsonData(videoList);
            }
            else
            {
                root["video_info"].Add(new JsonData());
            }

            //获取搜索得到的用户
            List<USERS> userList = new List<USERS>();
            var users = from u in db.USERS
                        select u;
            if (users.FirstOrDefault() != null)
            {
                userList = users.ToList();
                int num = 0;
                while (num < userList.Count())
                {
                    if (!userList.ElementAt(num).NICK_NAME.Contains(words) && userList.ElementAt(num).NICK_NAME != words)
                    {
                        userList.Remove(userList.ElementAt(num));
                    }
                    else
                    {
                        num++;
                    }
                }
            }
            if (userList.Count() != 0)
            {
                root["user_info"] = UsersToJsonData(userList, user_Id);
            }
            else
            {
                root["user_info"].Add(new JsonData());
            }

            root["top_searched"] = TopSearched();

            return Json(root.ToJson());
        }

        //VideoList转JsonData
        public JsonData VideosToJsonData(List<VIDEOS> videoList)
        {
            JsonData jsonData = new JsonData();
            jsonData["video_info"] = new JsonData();
            foreach (var item in videoList)
            {

                JsonData temp_video_info = new JsonData();
                temp_video_info["tags"] = new JsonData();

                var tags = GetTagsOf(item.VIDEO_ID);
                foreach (var tag in tags)
                {
                    JsonData tag_name = new JsonData();
                    tag_name["tag_name"] = tag.TAG_NAME;
                    temp_video_info["tags"].Add(tag_name);
                }

                temp_video_info["link"] = item.PATH;
                temp_video_info["title"] = item.TITLE;
                temp_video_info["img"] = item.COVER;
                temp_video_info["description"] = item.DESCRIPTION;
                temp_video_info["watch_time"] = item.PLAY_NUM.ToString();
                temp_video_info["like"] = item.LIKES_NUM.ToString();
                temp_video_info["upload_time"] = item.UPLOAD_TIME.ToString();
                temp_video_info["up_name"] = GetUploaderOf(item.VIDEO_ID).NICK_NAME;
                temp_video_info["section"] = GetZoneOf(item.VIDEO_ID).ZONE_NAME;
                temp_video_info["video_id"] = item.VIDEO_ID;
                

                jsonData["video_info"].Add(temp_video_info);
            }

            return jsonData["video_info"];
        }
        //UserList转JsonData
        public JsonData UsersToJsonData(List<USERS> userList, string user_id)
        {
            JsonData jsonData = new JsonData();
            jsonData["user_info"] = new JsonData();
            foreach (var item in userList)
            {
                //头像路径
                JsonData temp_user_info = new JsonData();
                temp_user_info["name"] = item.NICK_NAME;
                temp_user_info["gender"] = item.GENDER.ToString();
                temp_user_info["is_followed"] = "true";
                temp_user_info["img"] = item.AVATAR;
                temp_user_info["description"] = item.SIGNATURE;
                temp_user_info["work_count"] = GetVideoCountOfUser(item.USER_ID).ToString();
                temp_user_info["fans_count"] = item.FANS_NUM.ToString();
                temp_user_info["follow_count"] = item.FOLLOW_NUM.ToString();

                var s = from ur in db.USER_RELATIONSHIP
                        where ur.ACTIVE_USER_ID == user_id && ur.PASSIVE_USER_ID == item.USER_ID && ur.RELATIONSHIP_TYPE == 1
                        select ur;
                if (s.FirstOrDefault() == null)
                {
                    temp_user_info["is_followed"] = "false";
                }

                jsonData["user_info"].Add(temp_user_info);
            }
            return jsonData["user_info"];
        }

        public JsonData TopSearched()
        {
            JsonData jsonData = new JsonData();
            jsonData["TopSearched"] = new JsonData();
            var sv_Ids = from v in db.SORT_VIDEO
                         where v.REFRESH_TIME == db.SORT_VIDEO.Select(s => s.REFRESH_TIME).Max() && v.RANK <= 3 && v.TYPE == true
                         select v;
            if (sv_Ids.FirstOrDefault() != null)
            {
                foreach (var item in sv_Ids)
                {
                    jsonData["TopSearched"].Add(db.VIDEOS.Find(item.VIDEO_ID).TITLE);
                }
            }


            return jsonData["TopSearched"];
        }

        // GET: Main
        public ActionResult Index()
        {
            return View();
        }



        [HttpPost]
        public ActionResult Index(string user_id)
        {
            return video_ranking(user_id);
        }

        public ActionResult Search()
        {
            return View();
        }
        [HttpPost]
        public ActionResult Search(string user_id, string keyword)
        {
            //var data = SearchVideoDB(keyword);
            var data = Search_video(keyword, user_id);

            return data;
        }


        //发布消息
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


        //上传视频
        public ActionResult UploadVideoDB(FormCollection formdata)
        {
            HttpPostedFileBase file = Request.Files["video_upload_name"];
            HttpPostedFileBase cover = Request.Files["cover_upload_name"];
            var zoneName = Request.Form["zone_name"];
            var privacy = Request.Form["privacy"];
            var title = Request.Form["title_name"];
            var tagNames = Request.Form["tag_name"];
            var description = Request.Form["description_name"];
            var uploaderId = Request.Form["user_id"];

            if (file == null || cover == null)
            {
                Dictionary<string, string> JData = new Dictionary<string, string>();
                JData.Add("Flag", "false");
                return Json(JsonConvert.SerializeObject(JData, Formatting.Indented));
            }

            //判断各个参数是否存在
            var z = db.ZONE.Find(zoneName);
            if (z == null || privacy == null || title == null || tagNames == null || tagNames == "")
            {
                Dictionary<string, string> JData = new Dictionary<string, string>();
                JData.Add("Flag", "false");
                return Json(JsonConvert.SerializeObject(JData, Formatting.Indented));
            }

            //video实例
            VIDEOS video = new VIDEOS();
            video.VIDEO_ID = "0";
            if (privacy == "all")
            {
                video.PRIVACY = true;
            }
            else
            {
                video.PRIVACY = false;
            }
            video.TITLE = title;
            video.DESCRIPTION = description;
            video.LIKES_NUM = 0;
            video.PLAY_NUM = 0;
            video.COLLECT_NUM = 0;
            video.SHARE_NUM = 0;
            video.UPLOAD_TIME = DateTime.Now;
            USERS uploader = db.USERS.Find(uploaderId);

            //加入VIDEOS元组
            if (ModelState.IsValid)
            {
                db.VIDEOS.Add(video);
                db.SaveChanges();
            }
            else
            {
                Dictionary<string, string> JsonD = new Dictionary<string, string>();
                JsonD.Add("Flag", "false");
                return Json(JsonConvert.SerializeObject(JsonD, Formatting.Indented));
            }

            //获取刚新建的元组
            var Ids = db.Database.SqlQuery<string>("select video_id from videos where upload_time=(select max(upload_time) from videos)").ToList();
            string newId = Ids[0];
            video = db.VIDEOS.Find(newId);

            //联系集Upload_Video
            var uv = new UPLOAD_VIDEO();
            uv.USER_ID = uploader.USER_ID;
            uv.VIDEO_ID = video.VIDEO_ID;
            db.UPLOAD_VIDEO.Add(uv);
            db.SaveChanges();

            //联系集Has_Tag
            string[] names = tagNames.Split(';');
            for (int i = 0; i < names.Length; i++)
            {
                var tag = db.TAG.Find(names[i]);
                if (tag == null)
                {
                    tag = new TAG();
                    tag.TAG_NAME = names[i];
                    tag.REFER_NUM = 0;
                    db.TAG.Add(tag);
                    db.SaveChanges();
                }
                tag.REFER_NUM++;

                video.TAG.Add(tag);
                db.SaveChanges();
            }

            //联系集Has_Zone
            var hz = new HAS_ZONE();
            hz.VIDEO_ID = video.VIDEO_ID;
            hz.ZONE_NAME = z.ZONE_NAME;
            db.HAS_ZONE.Add(hz);
            db.SaveChanges();
            z.VIDEO_NUM++;
            db.Entry(z).State = EntityState.Modified;
            db.SaveChanges();





            //存视频文件
            var filePath = "C:\\Users\\16214\\Desktop\\iVlog\\iVlog\\source\\file\\v\\" + newId;
            if (!System.IO.Directory.Exists(filePath))
            {
                System.IO.Directory.CreateDirectory(filePath);
            }
            var fileName = file.FileName;
            file.SaveAs(Path.Combine(filePath, fileName));

            filePath = "../../source/file/v/" + newId;
            video.PATH = Path.Combine(filePath, fileName);
            db.Entry(video).State = EntityState.Modified;
            db.SaveChanges();

            //存封面文件
            var coverPath = "C:\\Users\\16214\\Desktop\\iVlog\\iVlog\\source\\file\\c\\" + newId;
            if (!System.IO.Directory.Exists(coverPath))
            {
                System.IO.Directory.CreateDirectory(coverPath);
            }
            var coverName = cover.FileName;
            file.SaveAs(Path.Combine(coverPath, coverName));

            coverPath = "../../source/file/c/" + newId;
            video.COVER = Path.Combine(coverPath, coverName);
            db.Entry(video).State = EntityState.Modified;
            db.SaveChanges();

            //发布消息
            var ur = from a in db.USER_RELATIONSHIP
                     where a.PASSIVE_USER_ID == uploaderId
                     select a.ACTIVE_USER_ID;
            foreach (var item in ur)
            {
                SendMessage(4, uploaderId, item);
            }


            Dictionary<string, string> JsonData = new Dictionary<string, string>();
            JsonData.Add("Flag", "true");
            return Json(JsonConvert.SerializeObject(JsonData, Formatting.Indented));
        }

        public ActionResult Upload()
        {
            return View();
        }

        [HttpPost]
        [Route("PostFile")]
        public ActionResult Upload(FormCollection formdata)
        {
            var data = UploadVideoDB(formdata);
            return data;
        }

    }
}
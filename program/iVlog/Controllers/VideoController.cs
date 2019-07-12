using iVlog.Models;
using LitJson;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace iVlog.Controllers
{
    public class VideoController : Controller
    {

        private Entities2 db = new Entities2();

        struct RankInfo
        {
            public string videoName;
            public string coverPath;
            public string uperName;
            public int? playNum;
        }

        //向数据库中加入用户访问视频的记录
        //向数据库中加入用户访问视频的记录
        public void AddVisit(string user_id, string video_id)
        {
            VISIT vISIT = new VISIT();
            vISIT.VIDEO_ID = video_id;
            vISIT.USER_ID = user_id;
            vISIT.VISIT_TIME = DateTime.Now;

            db.VISIT.Add(vISIT);
            db.SaveChanges();
        }

        //向数据库中添加用户的评论
        public void AddComment(string user_id, string video_id, string comment_content)
        {
            COMMENTS cOMMENTS = new COMMENTS();
            cOMMENTS.COMMENT_CONTENT = comment_content;
            cOMMENTS.LIKES_NUM = 0;
            cOMMENTS.COMMENT_ID = "0";
            db.COMMENTS.Add(cOMMENTS);
            db.SaveChanges();

            SEND_COMMENT sEND_COMMENT = new SEND_COMMENT();
            sEND_COMMENT.USER_ID = user_id;
            var commentid = from c in db.COMMENTS
                            orderby c.COMMENT_ID descending
                            select c;
            sEND_COMMENT.COMMENT_ID = commentid.ToList()[0].COMMENT_ID;
            db.SEND_COMMENT.Add(sEND_COMMENT);
            db.SaveChanges();

            HAS_COMMENT hAS_COMMENT = new HAS_COMMENT();
            hAS_COMMENT.VIDEO_ID = video_id;
            var commentid2 = from c in db.COMMENTS
                             orderby c.COMMENT_ID descending
                             select c;
            hAS_COMMENT.COMMENT_ID = commentid2.ToList()[0].COMMENT_ID;
            hAS_COMMENT.COMMENT_TIME = DateTime.Now;
            db.HAS_COMMENT.Add(hAS_COMMENT);
            db.SaveChanges();

        }

        //返回排行榜前20名视频名，视频封面，作者名，播放量(TYPE1是播放量，0是点赞量)
        public JsonResult GetRanking()
        {

            List<RankInfo> rankInfos = new List<RankInfo>();
            var videoIdOfTen = from sv in db.SORT_VIDEO
                               orderby sv.RANK
                               where sv.REFRESH_TIME == db.SORT_VIDEO.Select(s => s.REFRESH_TIME).Max()
                               select sv;
            if (videoIdOfTen == null)
            {
                return Json(JsonConvert.SerializeObject("mmp", Formatting.Indented));
            }
            var videoIdOfTens = videoIdOfTen.ToList();
            foreach (var v in videoIdOfTens)
            {
                var temp = from n in db.VIDEOS
                           where (n.VIDEO_ID == v.VIDEO_ID)
                           select n;
                var ui = from uv in db.UPLOAD_VIDEO
                         where uv.VIDEO_ID == v.VIDEO_ID
                         select uv;
                RankInfo ri = new RankInfo();
                if (temp == null || ui == null)
                {
                    return Json(JsonConvert.SerializeObject("mmp", Formatting.Indented));
                }
                ri.videoName = temp.ToList()[0].TITLE;
                ri.coverPath = temp.ToList()[0].COVER;
                ri.uperName = db.USERS.Find(ui.ToList()[0].USER_ID).NICK_NAME;
                ri.playNum = temp.ToList()[0].PLAY_NUM;
                rankInfos.Add(ri);
            }
            JsonData jsondata_root = new JsonData();
            string json_rank_infos = JsonConvert.SerializeObject(rankInfos);
            jsondata_root["rank_infos"] = json_rank_infos;

            return Json(jsondata_root.ToJson());

        }

        //返回视频路径，视频简介，点赞数，收藏数，分享数，上传者头像，上传者昵称，
        //评论数，评论人昵称，评论人头像，评论时间，评论内容和返回排行榜信息
        public JsonResult GetVideoInfo(string video_id, string user_id)
        {
            var videoInfo = from v in db.VIDEOS
                            where v.VIDEO_ID == video_id
                            select v;
            if (videoInfo == null)
            {
                return Json(JsonConvert.SerializeObject("mmp", Formatting.Indented));
            }
            var videoPath = videoInfo.ToList()[0].PATH;
            var videoDescription = videoInfo.ToList()[0].DESCRIPTION;
            var videoLikeNum = videoInfo.ToList()[0].LIKES_NUM;
            var videoCollectNum = videoInfo.ToList()[0].COLLECT_NUM;
            var videoShareNum = videoInfo.ToList()[0].SHARE_NUM;
            var videoTitle = videoInfo.ToList()[0].TITLE;
            var uploadTime = videoInfo.ToList()[0].UPLOAD_TIME.ToString();

            var zone = db.HAS_ZONE.Find(videoInfo.ToList()[0].VIDEO_ID);
            var videoZone = zone.ZONE_NAME;
            



            var ui = from uv in db.UPLOAD_VIDEO
                     where uv.VIDEO_ID == video_id
                     select uv;
            if (ui == null)
            {
                return Json(JsonConvert.SerializeObject("mmp", Formatting.Indented));
            }
            var uperAvatar = db.USERS.Find(ui.ToList()[0].USER_ID).AVATAR;
            var uperNickName = db.USERS.Find(ui.ToList()[0].USER_ID).NICK_NAME;

            var commentIds = from hc in db.HAS_COMMENT
                             where hc.VIDEO_ID == video_id
                             select hc;
            if (commentIds == null)
            {
                return Json(JsonConvert.SerializeObject("mmp", Formatting.Indented));
            }

            JsonData keyValues = new JsonData();
            keyValues["comment_info"] = new JsonData();
            foreach (var ci in commentIds.ToList())
            {
                JsonData structValue = new JsonData();
                var cominf = from c in db.COMMENTS
                             where c.COMMENT_ID == ci.COMMENT_ID
                             select c;
                if (cominf == null)
                {
                    return Json(JsonConvert.SerializeObject("mmp", Formatting.Indented));
                }
                structValue["comment_content"] = cominf.ToList()[0].COMMENT_CONTENT;
                structValue["comment_time"] = ci.COMMENT_TIME.ToString();
                var userid = from sc in db.SEND_COMMENT
                             where sc.COMMENT_ID == ci.COMMENT_ID
                             select sc;
                if (userid == null)
                {
                    return Json(JsonConvert.SerializeObject("mmp", Formatting.Indented));
                }
                var userinfo = db.USERS.Find(userid.ToList()[0].USER_ID);
                if (userinfo == null)
                {
                    return Json(JsonConvert.SerializeObject("mmp", Formatting.Indented));
                }
                structValue["commenter_avatar"] = userinfo.AVATAR;
                structValue["commenter_nickname"] = userinfo.NICK_NAME;
                keyValues["comment_info"].Add(structValue);
            }

            keyValues["tag_info"] = new JsonData();
            foreach (var t in db.VIDEOS.Find(video_id).TAG)
            {
                keyValues["tag_info"].Add(t.TAG_NAME);
            }


            var videoIdOfTen = from sv in db.SORT_VIDEO
                               orderby sv.RANK
                               where sv.REFRESH_TIME == db.SORT_VIDEO.Select(s => s.REFRESH_TIME).Max()
                               select sv;
            if (videoIdOfTen == null)
            {
                return Json(JsonConvert.SerializeObject("mmp", Formatting.Indented));
            }
            var videoIdOfTens = videoIdOfTen.ToList();
            JsonData rankValues = new JsonData();
            rankValues["ranks_info"] = new JsonData();
            foreach (var v in videoIdOfTens)
            {

                JsonData structValue = new JsonData();
                var temp = from n in db.VIDEOS
                           where (n.VIDEO_ID == v.VIDEO_ID)
                           select n;
                var uui = from uv in db.UPLOAD_VIDEO
                          where uv.VIDEO_ID == v.VIDEO_ID
                          select uv;

                if (temp == null || ui == null)
                {
                    return Json(JsonConvert.SerializeObject("mmp", Formatting.Indented));
                }
                structValue["video_name"] = temp.ToList()[0].TITLE;
                structValue["video_cover"] = temp.ToList()[0].COVER;
                if(uui.FirstOrDefault()!=null)
                structValue["uper_nickname"] = db.USERS.Find(uui.FirstOrDefault().USER_ID).NICK_NAME;
                structValue["play_num"] = temp.ToList()[0].PLAY_NUM.ToString();
                rankValues["ranks_info"].Add(structValue);
            }





            var user = db.USERS.Find(user_id);
            string avatar = user.AVATAR;
            int commentNum = 9;
            keyValues["video_path"] = videoPath;
            keyValues["video_description"] = videoDescription;
            keyValues["like_num"] = videoLikeNum.ToString();
            keyValues["collect_num"] = videoCollectNum.ToString();
            keyValues["share_num"] = videoShareNum.ToString();
            keyValues["uper_avatar"] = uperAvatar;
            keyValues["uper_nickname"] = uperNickName;
            keyValues["comment_num"] = commentNum.ToString();
            keyValues["user_avatar"] = avatar;
            keyValues["zone_name"] = videoZone;
            keyValues["video_title"] = videoTitle;
            keyValues["upload_time"] = uploadTime;

            JsonData json_data_root = new JsonData();
            json_data_root["rank_info"] = rankValues;
            json_data_root["video_info"] = keyValues;
            return Json(json_data_root.ToJson());

        }

        //返回用户头像
        public JsonResult UserAvatar(string user_id)
        {
            var user = db.USERS.Find(user_id);
            string avatar = user.AVATAR;
            JsonData json_data_root = new JsonData();
            json_data_root["user_avatar"] = avatar;
            return Json(json_data_root.ToJson());
        }

        //给视频点赞
        public JsonResult LikeVideo(string user_id, string video_id)
        {
            JsonData json_data_root = new JsonData();
            var video = db.VIDEOS.Find(video_id);
            if (video == null)
            {
                json_data_root["result"] = "false";
                return Json(json_data_root.ToJson());
            }
            foreach (var users in video.USERS)
            {
                if (users.USER_ID == user_id)
                {
                    json_data_root["result"] = "false";
                    return Json(json_data_root.ToJson());
                }
            }
            var user = db.USERS.Find(user_id);
            if (user == null)
            {
                json_data_root["result"] = "false";
                return Json(json_data_root.ToJson());
            }
            user.VIDEOS.Add(video);
            video.USERS.Add(user);
            db.SaveChanges();
            json_data_root["result"] = "true";
            return Json(json_data_root.ToJson());
        }

        //取消点赞
        public ActionResult CancelLike(string user_id, string video_id)
        {
            var video = db.VIDEOS.Find(video_id);
            if (video == null)
            {
                Dictionary<string, string> JsonD = new Dictionary<string, string>();
                JsonD.Add("Flag", "false");
                return Json(JsonConvert.SerializeObject(JsonD, Formatting.Indented));
            }

            foreach (var like in video.USERS)
            {
                if (like.USER_ID == user_id)
                {
                    video.USERS.Remove(like);
                    db.SaveChanges();

                    Dictionary<string, string> JsonD = new Dictionary<string, string>();
                    JsonD.Add("Flag", "true");
                    return Json(JsonConvert.SerializeObject(JsonD, Formatting.Indented));
                }
            }

            Dictionary<string, string> JsonData = new Dictionary<string, string>();
            JsonData.Add("Flag", "false");
            return Json(JsonConvert.SerializeObject(JsonData, Formatting.Indented));
        }

        //收藏视频
        public ActionResult AddToFavorite(string user_Id, string video_Id)
        {
            //获取该用户的default收藏夹
            var items = from hf in db.HAS_FAVORITES
                        where hf.USER_ID == user_Id
                        select hf;
            FAVORITE fAVORITE = new FAVORITE();
            if (items.FirstOrDefault() == null)
            {
                //创建收藏夹
                FAVORITE f = new FAVORITE();
                f.FAVORITE_ID = "0";
                f.FAVORITE_NAME = "default";
                f.VIDEO_NUM = 0;
                if (ModelState.IsValid)
                {
                    db.FAVORITE.Add(f);
                    db.SaveChanges();
                }
                else
                {
                    Dictionary<string, string> JsonD = new Dictionary<string, string>();
                    JsonD.Add("Flag", "false");
                    return Json(JsonConvert.SerializeObject(JsonD, Formatting.Indented));
                }
                //将收藏夹与用户连接
                HAS_FAVORITES newHf = new HAS_FAVORITES();
                var newF = from fff in db.FAVORITE
                           where fff.FAVORITE_ID == db.FAVORITE.Select(ff => ff.FAVORITE_ID).Max()
                           select fff;
                foreach (var i in newF)
                {
                    newHf.FAVORITE_ID = i.FAVORITE_ID;
                    fAVORITE = i;
                }
                newHf.USER_ID = user_Id;
                db.HAS_FAVORITES.Add(newHf);
                db.SaveChanges();
            }
            else
            {
                foreach (var i in items)
                {
                    fAVORITE = db.FAVORITE.Find(i.FAVORITE_ID);
                }
                var already = from x in db.HAS_VIDEO
                              where x.FAVORITE_ID == fAVORITE.FAVORITE_ID && x.VIDEO_ID == video_Id
                              select x;
                if (already.FirstOrDefault() != null)
                {
                    Dictionary<string, string> JsonD = new Dictionary<string, string>();
                    JsonD.Add("Flag", "false");
                    return Json(JsonConvert.SerializeObject(JsonD, Formatting.Indented));
                }
            }

            //视频加入收藏夹
            var hv = new HAS_VIDEO();
            hv.FAVORITE_ID = fAVORITE.FAVORITE_ID;
            hv.VIDEO_ID = video_Id;
            hv.ADD_TIME = DateTime.Now;
            fAVORITE.VIDEO_NUM++;
            db.Entry(fAVORITE).State = EntityState.Modified;
            db.SaveChanges();

            //修改视频被收藏数量
            var v = db.VIDEOS.Find(video_Id);
            v.COLLECT_NUM++;
            db.Entry(v).State = EntityState.Modified;
            db.SaveChanges();

            //Has_favorite保存入数据库
            if (ModelState.IsValid)
            {
                db.HAS_VIDEO.Add(hv);
                db.SaveChanges();
                Dictionary<string, string> JsonD = new Dictionary<string, string>();
                JsonD.Add("Flag", "true");
                return Json(JsonConvert.SerializeObject(JsonD, Formatting.Indented));
            }
            else
            {
                Dictionary<string, string> JsonD = new Dictionary<string, string>();
                JsonD.Add("Flag", "false");
                return Json(JsonConvert.SerializeObject(JsonD, Formatting.Indented));
            }
        }

        //取消收藏
        public JsonResult DeleteFavorite(string user_id, string video_id)
        {
            JsonData json_data_root = new JsonData();

            var favoid = from hf in db.HAS_FAVORITES
                         where hf.USER_ID == user_id
                         select hf;
            if (favoid == null)
            {
                json_data_root["result"] = "nofavorite";
                return Json(json_data_root.ToJson());
            }
            var favorite = db.FAVORITE.Find(favoid.ToList()[0].FAVORITE_ID);
            favorite.VIDEO_NUM--;
            //db.Entry<FAVORITE>(favorite).State = System.Data.EntityState.modified;

            var hasvideo = from hv in db.HAS_VIDEO
                           where (hv.FAVORITE_ID == favorite.FAVORITE_ID) && (hv.VIDEO_ID == video_id)
                           select hv;
            db.Entry<HAS_VIDEO>(hasvideo.ToList()[0]).State = System.Data.Entity.EntityState.Deleted;
            db.SaveChanges();

            json_data_root["result"] = "true";
            return Json(json_data_root.ToJson());
        }

        //取消关注
        public JsonResult DeleteFollow(string active_user_id, string passive_user_id)
        {
            JsonData json_data_root = new JsonData();

            var uu = from ur in db.USER_RELATIONSHIP
                     where ur.ACTIVE_USER_ID == active_user_id && ur.PASSIVE_USER_ID == passive_user_id
                     select ur;
            if (uu == null)
            {
                json_data_root["result"] = "false";
                return Json(json_data_root.ToJson());
            }
            db.Entry<USER_RELATIONSHIP>(uu.ToList()[0]).State = System.Data.Entity.EntityState.Deleted;
            db.SaveChanges();

            json_data_root["result"] = "true";
            return Json(json_data_root.ToJson());
        }

        // GET: Video
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Index(string op, string user_id, string video_id, string comment_content)
        {
            if (op == "null")
            {
               var data = GetVideoInfo(video_id, user_id);
                return data;
            }
            else if(op == "like")
            {
                LikeVideo(user_id, video_id);
                JsonData data = new JsonData();
                data["op"] = "like";
                return Json(data.ToJson());
            }
            else if(op == "cancel_like")
            {
                CancelLike(user_id, video_id);
                JsonData data = new JsonData();
                data["op"] = "cancel_like";
                return Json(data.ToJson());
            }
            else if(op == "favorite")
            {
                AddToFavorite(user_id, video_id);
                JsonData data = new JsonData();
                data["op"] = "favorite";
                return Json(data.ToJson());
            }
            else if (op == "cancel_favorite")
            {
                DeleteFavorite(user_id, video_id);
                JsonData data = new JsonData();
                data["op"] = "cancel_favorite";
                return Json(data.ToJson());
            }
            else if(op == "comment")
            {
                AddComment(user_id, video_id, comment_content);
                JsonData data = new JsonData();
                data["op"] = "comment";
                return Json(data.ToJson());
            }
            else
            {
                JsonData data = new JsonData();
                data["op"] = "null";
                return Json(data.ToJson());
            }

        }

        //[HttpPost]
        //public ActionResult Index(string op, string user_id, string video_id)
        //{
        //    JsonData data = new JsonData();
        //    data["op"] = "null";
        //    if(op == "like")
        //    {
        //         LikeVideo(user_id, video_id);
        //        data["op"] = "like";
        //    }

        //    return Json(data.ToJson());
        //}

    }
}
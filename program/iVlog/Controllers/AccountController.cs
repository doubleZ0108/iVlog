using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Newtonsoft.Json;
using iVlog.Models;
using LitJson;


namespace iVlog.Controllers
{
    public class AccountController : Controller
    {
        private Entities2 db = new Entities2();
        JsonData jsondata = new JsonData();
        public JsonResult fun_login(string nick_name, string password)
        {
            USERS uSERS = new USERS();
            int flag = 0;
            var userid =
                        (from c in db.USERS
                         where c.NICK_NAME == nick_name
                         select c.USER_ID).Distinct();
            if (userid.FirstOrDefault() != null)
            {
                var id = userid.FirstOrDefault();
                uSERS = db.USERS.Find(id);
                if (uSERS.PASSWORD != password)
                {
                    flag = 2;//密码错误
                }
                else
                {
                    jsondata["userID"] = id;
                    flag = 0;//成功
                }
            }
            else
            {
                flag = 1;//用户名不存在
            }
            jsondata["LoginFlag"] = flag.ToString();
            return Json(jsondata.ToJson());
        }
        public JsonResult fun_register(string nick_name, string password)
        {
            USERS uSERS = new USERS();
            int flag = 0;
            var userid =
                    (from c in db.USERS
                     where c.NICK_NAME == nick_name
                     select c.USER_ID).Distinct();
            if (userid.FirstOrDefault() != null)
            {
                flag = 0;
            }
            else
            {
                uSERS.USER_ID = "1";
                uSERS.NICK_NAME = nick_name;
                uSERS.PASSWORD = password;
                db.USERS.Add(uSERS);
                db.SaveChanges();
                flag = 1;
            }
            //JsonData jsondata = new JsonData();
            //jsondata["LoginFlag"] = flag;
            //jsondata.ToJson();
            Dictionary<string, string> jsondata = new Dictionary<string, string>();
            jsondata.Add("RegisterFlag", flag.ToString());
            return Json(JsonConvert.SerializeObject(jsondata, Formatting.Indented));
        }


        // GET: Account
        /*登陆  with 动画*/
        public ActionResult Index()
        {
            return View();
        }
        [HttpPost]
        public ActionResult Index(string password, string name)
        {
            var data = fun_login(name, password);

            return data;
        }

        /*登陆*/
        public ActionResult Login()
        {
            return View();
        }
        [HttpPost]
        public ActionResult Login(string password, string name)
        {
            var data = fun_login(name, password);

            return data;
        }


        /*注册*/
        public ActionResult Register()
        {
            return View();
        }
        [HttpPost]
        public ActionResult Register(string password, string name)
        {
            var data = fun_register(name, password);

            return data;
        }
    }
}
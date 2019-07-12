using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace iVlog.Controllers
{
    public class myErrorController : Controller
    {
        // GET: myError
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Error404()
        {
            return View();
        }

        public ActionResult Error403()
        {
            return View();
        }

        public ActionResult Error500()
        {
            return View();
        }
    }
}
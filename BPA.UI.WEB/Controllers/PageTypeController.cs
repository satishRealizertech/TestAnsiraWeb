using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BPA.UI.WEB.Controllers
{
    public class PageTypeController : Controller
    {
        // GET: PageType
        public ActionResult PageType()
        {
            return View();
        }
        public ActionResult BackbonePage()
        {
            return View();
        }
        public ActionResult PageAnalysisPageElement()
        {
            return View();
        }
    }
}
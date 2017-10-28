using Monit95App.Domain.Core.Entities;
using Monit95App.Infrastructure.Data;
using Monit95App.Models;
using System;
using System.Linq;
using System.Net;
using System.Web.Http;
using System.Web.Mvc;

namespace Monit95App.Controllers
{
    [System.Web.Mvc.Authorize]
    public class WishesController : Controller
    {
        private readonly CokoContext _db;

        public WishesController(CokoContext cokoContext)
        {
            _db = cokoContext;
        }

        [System.Web.Mvc.HttpGet]
        public ActionResult Index()
        {
            if (User.IsInRole("coko"))
                return RedirectToAction("ViewForAdmins");

            return View();
        }

        [System.Web.Mvc.HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Index([FromBody] WishModel wishModel)
        {
            if (ModelState.IsValid)
            {
                var wish = new Wish { Message = wishModel.Message, Date = DateTime.Now, UserId = User.Identity.Name };

                _db.Wishes.Add(wish);
                _db.SaveChanges();
                return RedirectToRoute(new { controller = "Home", action = "Index" });
            }

            return View(wishModel);
        }

        [System.Web.Mvc.Authorize(Roles = "coko")]
        [System.Web.Mvc.HttpGet]
        public ActionResult ViewForAdmins()
        {
            var models = _db.Wishes.ToList().Select(wish => WishModelCreator.Create(wish, _db));
            return View(models);
        }

        [System.Web.Mvc.Authorize(Roles = "coko")]
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Wish wish = _db.Wishes.Find(id);
            if (wish == null)
            {
                return HttpNotFound();
            }
            var model = WishModelCreator.Create(wish, _db);
            return View(model);
        }

        [System.Web.Mvc.Authorize(Roles = "coko")]
        [System.Web.Mvc.HttpPost, System.Web.Mvc.ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            Wish wish = _db.Wishes.Find(id);
            _db.Wishes.Remove(wish);
            _db.SaveChanges();
            return RedirectToAction("ViewForAdmins");
        }
    }
}
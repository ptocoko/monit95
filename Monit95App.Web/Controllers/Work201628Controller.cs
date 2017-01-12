using Monit95App.ViewModels.Work201628;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Monit95App.Controllers
{
    public class Work201628Controller : Controller
    {
        public List<Subject> Subjects = new List<Subject>(); //предметы
        // GET: Work201628
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Select()
        {
            var viewModel = new SelectVM();
            return View(viewModel);
        }

        public void GetXlsxForm(List<Subject> _subjects) //Формирует файл "Формы_для_внес_результ_(2016-n).xlsx"
        {
            string temp_file = ""; //пусть где лежит шаблон
        }
    }
}
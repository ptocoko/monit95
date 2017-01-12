using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Monit95App.Controllers
{
    public class Work201630Controller : Controller
    {

        [HttpPost]
        public ActionResult Upload(HttpPostedFileBase upload)
        {
            if (upload != null)
            {
                //получаем расширение файла                
                string fileExten = System.IO.Path.GetExtension(upload.FileName);
                //сохраняем файл в папку Files в проекте
                upload.SaveAs(@"\\192.168.88.220\файлы_пто\Работы\[2016-30] - Готовность 1 кл\Сбор\" + User.Identity.Name + fileExten);
            }
            return RedirectToAction("Select");
        }

        // GET: Work201630
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Select()
        {
            var vm = new Monit95App.ViewModels.Work201630.SelectVM();
            //var ListSchoolID = FileManager.FileManager.GetSchoolIDs(@"\\192.168.88.220\файлы_пто\Работы\[2016-30] - Готовность 1 кл\Сбор");            
            //vm.SendFile = ListSchoolID.Contains(User.Identity.Name);
            return View(vm);
        }


    }
}
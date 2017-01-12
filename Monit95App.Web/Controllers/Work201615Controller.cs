using Monit95App.Domain.Core;
using Monit95App.Domain.Interfaces;
using Monit95App.Infrastructure.Data;
using Monit95App.Models;
using Monit95App.ViewModels.Work201615;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Monit95App.Controllers  //Итоговые работы в 1-3 классах
{
    public class Work201615Controller : Controller
    {        
        private cokoContext context = new cokoContext();
        public ActionResult Select()
        {
            var viewModel = new SelectVM();

            //Проверка наличия файлов
            //DirectoryInfo class1direc = new DirectoryInfo(@"\\192.168.88.220\файлы_пто\Работы\[2016-15] - ДР в 1-3 классов\1 класс\1_кл_Сбор\");
            //DirectoryInfo class2direc = new DirectoryInfo(@"\\192.168.88.220\файлы_пто\Работы\[2016-15] - ДР в 1-3 классов\2 класс\2_кл_Сбор\");
            //DirectoryInfo class3direc = new DirectoryInfo(@"\\192.168.88.220\файлы_пто\Работы\[2016-15] - ДР в 1-3 классов\3 класс\3_кл_Сбор\");

            //FileInfo[] listFiles = class1direc.GetFiles(User.Identity.Name + ".*");
            //if (listFiles.Length > 0)
            //{
            //    viewModel.class1icon = "ok";
            //}
            //else
            //{
            //    viewModel.class1icon = "remove";
            //}

            //listFiles = class2direc.GetFiles(User.Identity.Name + ".*");
            //if (listFiles.Length > 0)
            //{
            //    viewModel.class2icon = "ok";
            //}
            //else
            //{
            //    viewModel.class2icon = "remove";
            //}
            //listFiles = class3direc.GetFiles(User.Identity.Name + ".*");
            //if (listFiles.Length > 0)
            //{
            //    viewModel.class3icon = "ok";
            //}
            //else
            //{
            //    viewModel.class3icon = "remove";
            //}



            //                                
            //var user = userRepository.GetT(User.Identity.Name);
            //viewModel.UserName = user.describe;
            //viewModel.User = user;
            //if (user.CategoryCode == 2)
            //{
            //    viewModel.UserName = viewModel.UserName + " - " + schoolRepository.GetT(User.Identity.Name).SchoolName;
            //}
            //          
            ViewBag.Login = User.Identity.Name;  
            return View(viewModel);
        }

        [HttpPost]
        public ActionResult UploadFor1Class(HttpPostedFileBase upload)
        {
            if (upload != null)
            {
                //получаем расширение файла                
                string fileExten = System.IO.Path.GetExtension(upload.FileName);
                //сохраняем файл в папку Files в проекте
                upload.SaveAs(@"\\192.168.88.220\файлы_пто\Работы\[2016-15] - ДР в 1-3 классов\1 класс\1_кл_Сбор\" + User.Identity.Name + fileExten);
            }
            return RedirectToAction("Select");
        }

        [HttpPost]
        public ActionResult UploadFor2Class(HttpPostedFileBase upload)
        {
            if(upload!=null)
            {                
                //получаем расширение файла                
                string fileExten = System.IO.Path.GetExtension(upload.FileName);
                //сохраняем файл в папку Files в проекте
                upload.SaveAs(@"\\192.168.88.220\файлы_пто\Работы\[2016-15] - ДР в 1-3 классов\2 класс\2_кл_Сбор\" + User.Identity.Name + fileExten);
            }
            return RedirectToAction("Select");            
        }

        [HttpPost]
        public ActionResult UploadFor3Class(HttpPostedFileBase upload)
        {
            if (upload != null)
            {
                //получаем расширение файла                
                string fileExten = System.IO.Path.GetExtension(upload.FileName);
                //сохраняем файл в папку Files в проекте
                upload.SaveAs(@"\\192.168.88.220\файлы_пто\Работы\[2016-15] - ДР в 1-3 классов\3 класс\3_кл_Сбор\" + User.Identity.Name + fileExten);
            }
            return RedirectToAction("Select");
        }

        // GET: Work201615
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Class1()
        {
            return PartialView("_PartialClass1");            
        }
        public ActionResult Class2()
        {
            return PartialView("_PartialClass2");
        }
        public ActionResult Class3()
        {
            return PartialView("_PartialClass3");
        }
    }
}
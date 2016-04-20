using Ionic.Zip;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Monit95App.ViewModels.Monit10_1516;
using АИС_МОР.Domain.Abstract;
using АИС_МОР.Domain.Concrete;
using АИС_МОР.Domain.Concrete.Monit10_1516;
using Excel = Microsoft.Office.Interop.Excel;
using monit95App.Domain.Interfaces;
using monit95App.Domain.Core;
using monit95App.Infrastructure.Data;

namespace Monit95App.Controllers
{
    public class Monit10_1516Controller : Controller
    {
        IMonit101516_elementRepository elementRepository = new Monit101516_elementRepository(new cokoContext());
        IMonit101516_learnerRepository learnerRepository = new Monit101516_learnerRepository(new cokoContext());
        IMonit101516_ratingRepository ratingRepository = new Monit101516_ratingRepository(new cokoContext());

        public ActionResult GetLearnesList()
        {
            var learnes = learnerRepository.All;
            return View(GreateLearnesListVM(learnes));
        }

        public ActionResult DeleteLearner(int learnerID)
        {
            ratingRepository.DeleteLearnerRatings(learnerID); //сначала удалим его оценки
            learnerRepository.Delete(learnerID);
            ratingRepository.Save();
            learnerRepository.Save();

            return RedirectToAction("GetLearnesList");
        }

        public LearnesListVM GreateLearnesListVM(IQueryable<monit10_1516_learner> learnes)
        {
            var viewModel = new LearnesListVM();
            viewModel.Lerners = learnes.Where(x => x.SchoolID == User.Identity.Name).Select(x => new Learner
            {
                LearnerID = x.LearnerID,
                Surname = x.surname,
                Name = x.name,
                SecondName = x.SecondName
            }).Distinct();
                          
                                                              
            return viewModel;            
        }
        //
        // GET: /Monit10_1516/
        public ActionResult Index()
        {
            return View();
        }

         [HttpGet]
        public ActionResult AddLearner()
        {
            return View(CreateAddLearnerVM());
        }

        [HttpPost]
         public ActionResult AddLearner(AddLearnerVM viewModel)
         {
             if (ModelState.IsValid)
             {
                 var plans = viewModel.ElementPlans.Where(x => x.Checkbool == true);
                 var learner = new monit10_1516_learner();
                 if (plans.Any())
                 {
                     UpdateLearner(learner, viewModel.learner);
                     learnerRepository.InsertLearner(learner);
                     learnerRepository.Save();
                 }
                 // Сохраним rating
                 monit10_1516_rating rating = new monit10_1516_rating();
                 foreach (var elementPlan in plans)
                 {
                     UpdateRating(rating, elementPlan, learner.LearnerID);
                     ratingRepository.InsertRating(rating);
                     ratingRepository.Save();
                 }
                 

                 return RedirectToAction("GetLearnesList");
             }
             else
             {
                 // Обнаружена ошибка
                 return View(CreateAddLearnerVM());
             }

         }

        private void UpdateLearner(monit10_1516_learner learner, Learner newLearner)
        {
            learner.SchoolID = User.Identity.Name;
            learner.surname = newLearner.Surname;
            learner.name = newLearner.Name;
            learner.SecondName = newLearner.SecondName;
            learner.ClassName = "10";
        }

        private void UpdateRating(monit10_1516_rating rating, ElementPlan elementPlan, int learnerID)
        {
            rating.LearnerID = learnerID;
            rating.ElCode = elementPlan.ElCode;
            rating.ValueOge15 = Math.Round(elementPlan.ValueOge15 / 100, 2);
        }

        [HttpGet]
        public AddLearnerVM CreateAddLearnerVM()
        {
            var viewModel = new AddLearnerVM();
            var elements = elementRepository.All;
            viewModel.ElementPlans = elements.Select(x => new ElementPlan
                {
                    ElCode = x.ElCode,
                    ElName = x.ElName
                }).OrderBy(x => x.ElCode).ToList();

            return viewModel;
           
        }
	}
}


//public FileResult CreateInPlans()
//{

//    ////Скопировать шаблон во временную папку
//    //string tempFile = String.Format(@"{0}\{1}.xlsx", System.IO.Path.GetTempPath(), User.Identity.Name);
//    //System.IO.File.Copy(@"d:\YandexDisk\АИС МОР\Мониторинг 10 классов - 2015\Шаблоны\Индивидуальный план.xlsx", tempFile, true);

//    ////создать планы
//    //Excel.Application app = new Excel.Application();
//    //app.DisplayAlerts = false;

//    //var learnes = learnerRepository.All.Where(x => x.SchoolID == User.Identity.Name).Distinct(); //Получить всех обучающихся данной школы
//    //string folder = string.Empty; //папка где находятся готовые инпланы обуч. (C:\Users\Адам\Desktop\Планы\201 - Ачхой-Мартановский МР\0149\Индивидуальные планы\)
//    //Excel.Workbook book;
//    //foreach (var learner in learnes)
//    //{
//    //    book = app.Workbooks.Open(tempFile);
//    //    //LearnerPlan inPlan = new LearnerPlan(learner, book);
//    //    inPlan.PopulatePattern();
//    //    folder = inPlan.SavePattern();

//    //    book.Close();
//    //    book = null;

//    //}
//    //app.Quit();
//    //app = null;

//    ////заархивировать папку
//    //string zipFileName = "plans" + User.Identity.Name + ".zip"; //конечное имя архива БЕЗ пути
//    //string fullZipFileName = System.IO.Path.GetTempPath() + @"\" + zipFileName;
//    //using (ZipFile zip = new ZipFile())
//    //{
//    //    zip.UseUnicodeAsNecessary = true; //русские символы включаем
//    //    zip.AddDirectory(folder);                
//    //    zip.Save(fullZipFileName); //сохранить архив в полный путь
//    //}

//    ////загрузить планы
//    byte[] fileBytes = System.IO.File.ReadAllBytes(fullZipFileName);            
//    return File(fileBytes, System.Net.Mime.MediaTypeNames.Application.Octet, zipFileName);
//}
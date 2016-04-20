using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using Monit95App.Models;
using Monit95App.ViewModels;
using Monit95App.ViewModels.Monit10_1516;
using АИС_МОР.Domain.Abstract;
using АИС_МОР.Domain.Concrete;
using АИС_МОР.Domain.Concrete.Monit10_1516;
using Excel = Microsoft.Office.Interop.Excel;
using monit95App.Domain.Interfaces;
using monit95App.Infrastructure.Data;
using monit95App.Domain.Core;

namespace Monit95App.Controllers
{
    public class HomeController : Controller
    {
        private cokoContext context = new cokoContext();

        IMonit101516_planooRepository monit10PlanOORespository = new Monit101516_planooRepository(new cokoContext());
        IMonit101516_ratingRepository ratingRespository = new Monit101516_ratingRepository(new cokoContext());
        private PlanOOVM ViewModelFromPlanOO(monit10_1516_planoo planOO)
        {
            var viewModel = new PlanOOVM
            {                
                SchoolID = planOO.SchoolID,
                ElCode = planOO.ElCode,
                CountHours = planOO.CountHours,
                HoursDateStart = planOO.HoursDateStart,                
                HoursDateEnd = planOO.HoursDateEnd,
                ExamDate = planOO.ExamDate,
                ElName = planOO.monit10_1516_el.ElName.ToUpper()
            };
            return viewModel;
        }
        private ElListVM ElListVMFromPlanOO(monit10_1516_planoo planOO)
        {
            var viewModel = new ElListVM
            {
                AreaName = planOO.school.area.AreaName,
                SchoolName = planOO.school.SchoolName,
                ElName = planOO.monit10_1516_el.ElName,
                TaskNumOge15 = planOO.monit10_1516_el.TaskNumOge15,
                CountHours = planOO.CountHours,  
                HoursDateStart = planOO.HoursDateStart,
                HoursDateEnd = planOO.HoursDateEnd,
                ExamDate = planOO.ExamDate,
                ElCode = planOO.ElCode,
                SchoolID = User.Identity.Name
            };
            viewModel.DifineSubjectName();
            viewModel.PopulateTimeForExam();

            viewModel.Monit10Learnes = ratingRespository.All.Where(x => x.monit10_1516_learner.SchoolID == User.Identity.Name &&
                                                                                     x.ElCode == viewModel.ElCode).Select(x=> new Monit10Learner{
                                                                                         LearnerID = x.LearnerID,
                                                                                         ElCode = x.ElCode,
                                                                                         Surname = x.monit10_1516_learner.surname,
                                                                                         Name = x.monit10_1516_learner.name,
                                                                                         SecondName = x.monit10_1516_learner.SecondName,
                                                                                         ClassName = "10",
                                                                                         ValueOge15 = Math.Round(x.ValueOge15 * 100,0),
                                                                                         RatingID = x.RatingID,
                                                                                         RatingValue = x.RatingValue
                                                                                     }).ToList();

            return viewModel;
        }        

        [HttpGet]
        public ActionResult EditElLearn(string elCode)
        {
            var planOO = monit10PlanOORespository.GetBySchoolIDandElcode(User.Identity.Name, elCode);
            if (planOO == null) return new HttpNotFoundResult();
            return View(ElListVMFromPlanOO(planOO));
        }

        [HttpPost]
        public ActionResult EditElLearn(ElListVM viewModel)
        {
            var rat = ratingRespository.All;
            rat.First().RatingValue = 1;
            ratingRespository.Save();

            if (ModelState.IsValid)
            {                
                var existRatings = ratingRespository.GetRatingsBySchoolIDandElcode(User.Identity.Name, viewModel.ElCode);
                UpdateRating(existRatings, viewModel.Monit10Learnes);
                
                ratingRespository.Save();
                return RedirectToAction("MainWindow");
            }
            return View(viewModel);
        }

        private void UpdateRating(IQueryable<monit10_1516_rating> ratings, List<Monit10Learner> learnes)
        {
            foreach(var v in ratings)
            {
                v.RatingValue = learnes.Where(x => x.RatingID == v.RatingID).Select(x=>x.RatingValue).Single();                
            }
        }

        private void UpdatePlanOO(monit10_1516_planoo planOO, PlanOOVM viewModel)
        {
            planOO.SchoolID = viewModel.SchoolID;
            planOO.ElCode = viewModel.ElCode;
            planOO.CountHours = viewModel.CountHours;
            planOO.HoursDateStart = viewModel.HoursDateStart;
            planOO.HoursDateEnd = viewModel.HoursDateEnd;
            planOO.ExamDate = viewModel.ExamDate;
        }



        [HttpGet]    
        public ActionResult Edit(string elCode)
        {
            var planOO = monit10PlanOORespository.GetBySchoolIDandElcode(User.Identity.Name, elCode);
            if (planOO == null) return new HttpNotFoundResult();
            return View(ViewModelFromPlanOO(planOO));
        }

        [HttpPost]
        public ActionResult Edit(PlanOOVM viewModel)
        {
            if (ModelState.IsValid)
            {
                var existingBook = monit10PlanOORespository.GetBySchoolIDandElcode(User.Identity.Name, viewModel.ElCode);
                UpdatePlanOO(existingBook, viewModel);
                monit10PlanOORespository.Save();
                //return RedirectToAction("Index");
                return RedirectToAction("MainWindow");
            }
            return View(viewModel);
        }


        [HttpGet]
        public ActionResult MainWindow()
        {
            var plansOO = monit10PlanOORespository.All.Where(x => x.SchoolID == User.Identity.Name);
            if (plansOO == null) return new HttpNotFoundResult();
            return View(MainWindowVMFromPlansOO(plansOO));            
        }

        private MainWindowVM MainWindowVMFromPlansOO (IQueryable<monit10_1516_planoo> param)
        {
            var viewModel = new MainWindowVM();
            viewModel.ElementPlans = param.Select(x => new ElementPlan
                {
                  ElCode = x.ElCode,
                  ElName = x.monit10_1516_el.ElName,
                  TaskNumOge15 = x.monit10_1516_el.TaskNumOge15,
                  CountHours = x.CountHours,
                  ExamDate = x.ExamDate,
                  HoursStart = x.HoursDateStart,
                  HoursEnd = x.HoursDateEnd
                }).ToList();

            viewModel.ElementPlans.ForEach(x => x.SetSrok()); //Соединить даты
            viewModel.ElementPlans.OrderBy(x => x.ElCode);
            return viewModel;
        }        

        public ActionResult FillParticip(int _subjectCode)
        {
            Models.cokoEntitiesWAN dataContext = new Models.cokoEntitiesWAN();
            var particips = dataContext.ege_15_res_before.Where(x => x.SubjectCode == _subjectCode && x.SchoolID == User.Identity.Name).
                                                                Select(x => new { ParticipantID = x.ParticipantID, surname = x.surname + " " + x.name});
            return Json(particips, JsonRequestBehavior.AllowGet);
        }
        

        [HttpGet] //Первый раз посетил Ege15
        public ActionResult Ege15()
        {
            Models.cokoEntitiesWAN dataContext = new Models.cokoEntitiesWAN();
            string temp = dataContext.schools.Where(x => x.SchoolID == User.Identity.Name).Select(x => x.SchoolName).First().
                                                                                                                ToString();
            var model = new Ege15VM() 
            {
                Login = User.Identity.Name,                
                SchoolName = temp
            };            
            return View(model);            

        }

        [HttpPost]
        public ActionResult Ege15(Ege15VM model)
        {
            if (ModelState.IsValid)
            {
                System.Diagnostics.Debug.WriteLine("Validation succes!");
            }
            return View(model);                       
        }

        public EmptyResult MergeReport(int _param)
        {
            //...
            System.Diagnostics.Debug.WriteLine("MergeReport start! " + _param );
            return new EmptyResult();
        }
        public ActionResult Index()
        {
            if(!Request.IsAuthenticated)
            {                
                return View("Index", "~/Views/Shared/_GuestLayout.cshtml");
            }
            ViewBag.SchoolName = context.schools.Where(x=>x.SchoolID == User.Identity.Name).Select(x=>x.SchoolName).Single();
            ViewBag.SchoolID = User.Identity.Name;

            return View(new ViewModelBase { SchoolID = User.Identity.Name });
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";
            if (!Request.IsAuthenticated)
            {
                return View("About", "~/Views/Shared/_GuestLayout.cshtml");
            }
            return View();
        }

        public ActionResult Contact()
        {            
            return View();
        }

    }
}


//Создать отчет по кодификутору предмет 1 егэ 2015 для региона
//oneclass2015.Models.MyExcel.KillAllExcellProcess();
//element.Models.cokoEntitiesWAN dataContext = new element.Models.cokoEntitiesWAN();
//Excel.Application app = new Excel.Application();
//app.DisplayAlerts = false;
//Excel.Workbook bookEl = app.Workbooks.Open(@"d:\Dropbox\Проекты\АИС ГИА\Шаблоны отчетов\ege_15_pattern_el.xlsx");
//Excel.Workbook bookUm = app.Workbooks.Open(@"d:\Dropbox\Проекты\АИС ГИА\Шаблоны отчетов\ege_15_pattern_um.xlsx");
//Excel.Workbook bookNew = app.Workbooks.Add();
//Excel.Worksheet currentSheet = (Excel.Worksheet)bookNew.Worksheets["Лист1"];
//CodifierReportRepository codifierReportRepository = new CodifierReportRepository();

//Excel.Worksheet tmpSheet = (Excel.Worksheet)bookEl.Worksheets[journal.GetLetterCode(_reportProperty.SubjectCode)];
//codifierReportRepository.FillSheet(tmpSheet, _reportProperty, dataContext, "ege_15_res_before");
//tmpSheet.Name = "ЭЛЕМЕНТЫ СОДЕРЖАНИЙ";
//tmpSheet.Copy(currentSheet);

//tmpSheet = (Excel.Worksheet)bookUm.Worksheets[journal.GetLetterCode(_reportProperty.SubjectCode)];
//codifierReportRepository.FillSheet(tmpSheet, _reportProperty, dataContext, "ege_15_res_before");
//tmpSheet.Name = "УМЕНИЯ";
//tmpSheet.Copy(currentSheet);

//bookNew.Worksheets["Лист1"].Delete();

////Сохранить файл-отчет
//string reportPath = String.Format(Environment.GetFolderPath(Environment.SpecialFolder.Desktop) + @"\Отчеты по ЕГЭ-2015");
//if (!System.IO.Directory.Exists(reportPath))
//{
//    System.IO.Directory.CreateDirectory(reportPath);
//    reportPath = String.Format(@"{0}\{1} - {2}. Отчет.xlsx", reportPath, journal.GetLetterCode(_reportProperty.SubjectCode), journal.GetSubjectName(_reportProperty.SubjectCode));
//    bookNew.SaveAs(reportPath);
//}
//else
//{
//    reportPath = String.Format(@"{0}\{1} - {2}. Отчет.xlsx", reportPath, journal.GetLetterCode(_reportProperty.SubjectCode), journal.GetSubjectName(_reportProperty.SubjectCode));
//    bookNew.SaveAs(reportPath);
//}
//bookEl.Close(null, null, null);               // close your workbook
//bookUm.Close(null, null, null);               // close your workbook
//bookNew.Close(null, null, null);               // close your workbook
//app.Quit();                                 // exit excel application
//app = null;                                 // set to NULL    
//

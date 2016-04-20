using Microsoft.Office.Interop.Excel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using АИС_ГИА.Domain.Concrete;
using АИС_МОР.Domain.Abstract;
using Excel = Microsoft.Office.Interop.Excel;

namespace АИС_МОР.Domain.Concrete.Monit10_1516
{
    public class LearnerPlan //Индивидуальный план дополнительных занятий обучающегося 10 класса (001)
    {
        //свойства
        public int LearnerID {get;set;}
        public string SurnameNameSN {get;set;}
        public string SchoolName { get; set; }
        public string ClassName { get; set; }
        public string SubjectName { get; set; }
        public List<ElementPlan2> ElementPlans2 { get; set; }

        //хранилища
        private IRatingRepository ratingRepository = new RatingRepository(new АИС_ГИА.Domain.Concrete.cokoEntities());
        private IPlanOORepository planOORepository = new PlanOORepository(new АИС_ГИА.Domain.Concrete.cokoEntities());

        private Excel.Workbook book;
        private monit10_1516_learner learner;
        private List<monit10_1516_rating> ratings;
        private List<monit10_1516_planoo> planOOs;
        string[] rusElCodes = { "01-02", "01-05", "01-06", "01-07", "01-08", "01-09", "01-10", "01-11" };
        string[] matElCodes = { "02-01", "02-02", "02-03", "02-04", "02-05", "02-06", "02-07", "02-08" };
        string[] subjectCodes = { "01", "02" };

        public LearnerPlan(monit10_1516_learner learner, Excel.Workbook book) //зависимости bookPattern = Мониторинг 10 классов - 2015\Шаблоны\Индивидуальный лист.xlsx"
        {
            this.book = book;
            this.learner = learner;
            LearnerID = learner.LearnerID;
            SurnameNameSN = learner.surname + " " + learner.name;
            if (learner.SecondName != string.Empty)
            {
                SurnameNameSN += " " + learner.SecondName;
            }
            this.SchoolName = learner.school.SchoolName.ToUpper();
            this.ClassName = learner.ClassName;

            ratings = ratingRepository.All.Where(x => x.LearnerID == learner.LearnerID).OrderBy(x => x.ElCode).ToList();
            planOOs = planOORepository.All.Where(x => x.SchoolID == learner.SchoolID).OrderBy(x => x.ElCode).ToList(); 
        }

        public void PopulatePattern() 
        {            
            foreach (var subjectCode in subjectCodes)
            {
                Excel.Worksheet sheet = (Excel.Worksheet)book.Worksheets[subjectCode]; //Установить лист

                sheet.get_Range("D2").Value2 = LearnerID; //ID
                sheet.get_Range("D3").Value2 = SurnameNameSN.ToUpper(); //ФИО
                sheet.get_Range("D4").Value2 = SchoolName; //НАИМЕНОВАНИЕ ОО

                int rowNumber = 8;
                string[] elCodes;
                if(subjectCode == "01") elCodes = rusElCodes;
                else elCodes = matElCodes;

                foreach (var elCode in elCodes)
                {
                    var elCodeRating = ratings.Where(x => x.ElCode == elCode);
                    if (!elCodeRating.Any())
                    {
                        sheet.get_Range("E" + rowNumber).EntireRow.Delete(Excel.XlDeleteShiftDirection.xlShiftUp);
                    }
                    else
                    {
                        //% выполнения по КИМ ОГЭ-2015
                        sheet.get_Range("E" + rowNumber).Value2 = ratings.Where(x => x.ElCode == elCode).Select(x => x.ValueOge15).Single();
                        //Количество часов
                        sheet.get_Range("F" + rowNumber).Value2 = planOOs.Where(x => x.ElCode == elCode).Select(x => x.CountHours).DefaultIfEmpty().Single().ToString();
                        //Срок проведения дополнительных занятий
                        var HoursDateStart = planOOs.Where(x => x.ElCode == elCode).Select(x => x.HoursDateStart).DefaultIfEmpty().Single();
                        var HoursDateEnd = planOOs.Where(x => x.ElCode == elCode).Select(x => x.HoursDateEnd).DefaultIfEmpty().Single();
                        if (HoursDateStart != null && HoursDateEnd != null)
                        {
                            sheet.get_Range("G" + rowNumber).Value2 = HoursDateStart.GetValueOrDefault().ToShortDateString() + " - " + HoursDateEnd.GetValueOrDefault().ToShortDateString();
                        }
                        var ratingValue = ratings.Where(x => x.ElCode == elCode).Select(x => x.RatingValue).Single();
                        if (ratingValue != null)
                        {
                            sheet.get_Range("H" + rowNumber).Value2 = ratingValue;
                        }
                        rowNumber++;
                    }
                }
            }            
        }

        public string SavePattern(int code = 2) //1 - xlsx, 2 - pdf
        {
            string reportFolder = String.Format(Environment.GetFolderPath(Environment.SpecialFolder.Desktop) + @"\Планы\{0} - {1}\{2}\Индивидуальные планы", learner.school.AreaID,
                                                                                                                    learner.school.area.AreaName.TrimEnd(), learner.SchoolID);

            if (!System.IO.Directory.Exists(reportFolder))
            {
                System.IO.Directory.CreateDirectory(reportFolder);
            }

            switch(code)
            {
                case 1:                    
                    book.SaveAs(String.Format(@"{0}\{1}.xlsx", reportFolder, SurnameNameSN));
                    break;

                case 2:
                    string file = String.Format(@"{0}\{1}.pdf", reportFolder, SurnameNameSN);
                    book.ExportAsFixedFormat(XlFixedFormatType.xlTypePDF, file);                    
                    break;

                default:
                    break;
                 
            }                       
            return reportFolder;
        }
    }
}

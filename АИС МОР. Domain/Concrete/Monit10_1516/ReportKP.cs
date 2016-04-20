using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using АИС_ГИА.Domain.Concrete;
using АИС_МОР.Domain.Abstract;
using АИС_МОР.Domain.Concrete.Monit10_1516;
using Excel = Microsoft.Office.Interop.Excel;

namespace АИС_МОР.Domain.Concrete.Monit10_1516
{
    public class ReportKP //коррекционный план по русскому языку/математике для 10 классов
    {
        private IQueryable<monit10_1516_rating> monit10ratings;
        private IQueryable<monit10_1516_learner> learnes;
        private IPlanOORepository planOORepository;
        private ILearnerRepository learnerRepository;
        private Excel.Application app;
        string[] rusElCodes = { "01-02", "01-05", "01-06", "01-07", "01-08", "01-09", "01-10", "01-11" };
        string[] matElCodes = { "02-01", "02-02", "02-03", "02-04", "02-05", "02-06", "02-07", "02-08" };

        public ReportKP(IQueryable<monit10_1516_rating> monit10ratings)
        {
            app = new Excel.Application();
            app.DisplayAlerts = false;
            this.monit10ratings = monit10ratings;
            planOORepository = new PlanOORepository(new АИС_ГИА.Domain.Concrete.cokoEntities());
            learnerRepository = new LearnerRepository(new АИС_ГИА.Domain.Concrete.cokoEntities());
            learnes = learnerRepository.All;
        }

        public void CreateForSchool(school _school, int subjectCode)
        {
            List<string> elCodes;
            Excel.Workbook book;
            string fileName = string.Empty;
            if (subjectCode == 1)
            {
                elCodes = new List<string>(rusElCodes);
                book = app.Workbooks.Open(@"d:\YandexDisk\АИС МОР\Мониторинг 10 классов\Шаблоны\План по русскому языку.xlsx");
                fileName = "План по русскому языку.xlsx";
            }
            else
            {
                elCodes = new List<string>(matElCodes);
                book = app.Workbooks.Open(@"d:\YandexDisk\АИС МОР\Мониторинг 10 классов\Шаблоны\План по математике.xlsx");
                fileName = "План по математике.xlsx";
            }
            Excel.Worksheet sheet = (Excel.Worksheet)book.Worksheets["СВОДНЫЙ ПЛАН"];
            var records = monit10ratings.Where(x => x.monit10_1516_learner.SchoolID == _school.SchoolID);
            sheet.get_Range("C1").Value2 = _school.area.AreaName.ToUpper();
            sheet.get_Range("C2").Value2 = _school.SchoolName.ToUpper();

            foreach (var elCode in elCodes)
            {
                sheet = (Excel.Worksheet)book.Worksheets[elCode];
                int countLearner = 1;
                var elCodeRecords = records.Where(x => x.ElCode == elCode);
                if (elCodeRecords.Any())
                {
                    int rowNumber = 11;
                    foreach (var record in elCodeRecords)
                    {
                        sheet.get_Range("A" + rowNumber).Value2 = countLearner++;
                        sheet.get_Range("B" + rowNumber).Value2 = record.monit10_1516_learner.surname;
                        sheet.get_Range("C" + rowNumber).Value2 = record.monit10_1516_learner.name;
                        string sn = record.monit10_1516_learner.SecondName;
                        if (sn != string.Empty)
                        {
                            sheet.get_Range("D" + rowNumber).Value2 = sn;
                        }
                        sheet.get_Range("E" + rowNumber).Value2 = "10";
                        sheet.get_Range("F" + rowNumber++).Value2 = record.ValueOge15;
                    }
                }
            }

            //Сохранить файл-отчет
            string reportPath = String.Format(Environment.GetFolderPath(Environment.SpecialFolder.Desktop) + @"\Планы\{0} - {1}\{2}", _school.AreaID,
                                                                                                                    _school.area.AreaName.TrimEnd(), _school.SchoolID);
            if (!System.IO.Directory.Exists(reportPath))
            {
                System.IO.Directory.CreateDirectory(reportPath);
                string xlsxReportPath = String.Format(@"{0}\{1}", reportPath, fileName);
                book.SaveAs(xlsxReportPath);
            }
            else
            {
                string xlsxReportPath = String.Format(@"{0}\{1}", reportPath, fileName);
                book.SaveAs(xlsxReportPath);
            }
            book.Close();
        }      

        public void CreateIndiv(monit10_1516_learner learner)//Индивидуальных  лист коррекционной работы учащегося 10-го класса
        {
            Excel.Workbook book = app.Workbooks.Open(@"C:\YandexDisk\АИС МОР\Мониторинг 10 классов\Шаблоны\Индивидуальный лист.xlsx");
            Excel.Worksheet sheet = (Excel.Worksheet)book.Worksheets["01"];
            var records = monit10ratings.Where(x => x.LearnerID == learner.LearnerID);
            string surnameNameSN = learner.surname + " " + learner.name;
            if (learner.SecondName != string.Empty)
            { 
                surnameNameSN += " " + learner.SecondName;
            }
            sheet.get_Range("D3").Value2 = surnameNameSN.ToUpper();
            sheet.get_Range("D4").Value2 = learner.school.SchoolName.ToUpper();

            //русский язык
            int rowNumber = 8;
            foreach (var elCode in rusElCodes)
            {
                var indic = monit10ratings.Where(x => x.ElCode == elCode && x.LearnerID == learner.LearnerID);
                if (!indic.Any())
                {
                    sheet.get_Range("E" + rowNumber).EntireRow.Delete(Excel.XlDeleteShiftDirection.xlShiftUp);
                }
                else
                {
                    //% выполнения по КИМ ОГЭ-2015
                    sheet.get_Range("E" + rowNumber).Value2 = monit10ratings.Where(x => x.LearnerID == learner.LearnerID && x.ElCode == elCode).Select(x => x.ValueOge15).Single();
                    //Количество часов
                    sheet.get_Range("F" + rowNumber).Value2 = planOORepository.All.Where(x => x.SchoolID == learner.SchoolID && x.ElCode == elCode).Select(x => x.CountHours).DefaultIfEmpty().Single().ToString();
                    //Срок проведения дополнительных занятий
                    sheet.get_Range("G" + rowNumber).Value2 = planOORepository.All.Where(x => x.SchoolID == learner.SchoolID && x.ElCode == elCode).Select(x => x.CountHours).DefaultIfEmpty().Single().ToString();
                    rowNumber++;
                }

            }
            //математика
            rowNumber = 8;
            sheet = (Excel.Worksheet)book.Worksheets["02"];
            sheet.get_Range("D3").Value2 = surnameNameSN.ToUpper();
            sheet.get_Range("D4").Value2 = learner.school.SchoolName.ToUpper();
            foreach (var elCode in matElCodes)
            {
                var indic = monit10ratings.Where(x => x.ElCode == elCode && x.LearnerID == learner.LearnerID);
                if (!indic.Any())
                {
                    sheet.get_Range("E" + rowNumber).EntireRow.Delete(Excel.XlDeleteShiftDirection.xlShiftUp);
                }
                else
                {
                    //% выполнения по КИМ ОГЭ-2015
                    sheet.get_Range("E" + rowNumber).Value2 = monit10ratings.Where(x => x.LearnerID == learner.LearnerID && x.ElCode == elCode).Select(x => x.ValueOge15).Single();
                    //Количество часов
                    sheet.get_Range("F" + rowNumber).Value2 = planOORepository.All.Where(x => x.SchoolID == learner.SchoolID && x.ElCode == elCode).Select(x => x.CountHours).DefaultIfEmpty().Single().ToString();
                    //Срок проведения дополнительных занятий
                    sheet.get_Range("G" + rowNumber).Value2 = planOORepository.All.Where(x => x.SchoolID == learner.SchoolID && x.ElCode == elCode).Select(x => x.CountHours).DefaultIfEmpty().Single().ToString();
                    rowNumber++;
                }
            }

            //Сохранить файл-отчет
            string reportPath = String.Format(Environment.GetFolderPath(Environment.SpecialFolder.Desktop) + @"\Планы\{0} - {1}\{2}\Индивидуальные листы", learner.school.AreaID,
                                                                                                                    learner.school.area.AreaName.TrimEnd(), learner.SchoolID);
            if (!System.IO.Directory.Exists(reportPath))
            {
                System.IO.Directory.CreateDirectory(reportPath);
                string xlsxReportPath = String.Format(@"{0}\{1}.xlsx", reportPath, surnameNameSN);
                book.SaveAs(xlsxReportPath);
            }
            else
            {
                string xlsxReportPath = String.Format(@"{0}\{1}.xlsx", reportPath, surnameNameSN);
                book.SaveAs(xlsxReportPath);
            }

            book.Close();

        }      

    }
}

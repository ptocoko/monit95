using System;
using System.Collections.Generic;
using System.Linq;
using Monit95App.Services.Work.Concrete;
using Reporter;
using System.Runtime.InteropServices;
using System.IO;
using Ionic.Zip;
using Monit95App.Domain.Interfaces;
using Monit95App.Domain.Core;
using Excel = Microsoft.Office.Interop.Excel;
using Monit95App.Services.Work.Abstract;

namespace Monit95App.ConsoleApp
{
    class Program
    {
        //TODO: сделать тесты                         

        static void Main(string[] args)
        {
            System.Diagnostics.Process[] process = System.Diagnostics.Process.GetProcessesByName("Excel");
            foreach (System.Diagnostics.Process p in process)
            {
                if (!string.IsNullOrEmpty(p.ProcessName))
                {
                    try
                    {
                        p.Kill();
                    }
                    catch { }
                }
            }

            Excel.Application app = new Excel.Application();           
            app.DisplayAlerts = false;            

            //Карты, 3 и более результата, 201661
            Excel.Workbook excerInitBook = app.Workbooks.Open($@"d:\Dropbox\Работы\Карты\Карты учителя.xlsx"); //
            int currentProjectCode = 201661; //
            var currentTestGuid = new Guid("595A73D4-F446-4916-A8C5-0E38BAB6A069"); //
            var currentTestDate = new DateTime(2017, 02, 27); //  

            Excel.Worksheet sheet;                      
            string startSheetName =  currentTestGuid.ToString().Substring(0, currentTestGuid.ToString().IndexOf('-'));
            var testResultService = new TestResultService(new cokoContext());
            var results = testResultService.SelectParticipsGroupResults(currentProjectCode, currentTestGuid, currentTestDate);
            int countProcessedResults = 0;            
            foreach (var particip in results)
            {
                sheet = excerInitBook.Sheets["data"];                
                //Заполняем реквизиты
                var resultTest1 = particip.First();                               
                sheet.Range["B10"].Value2 = resultTest1.ParticipCode;
                sheet.Range["B19"].Value2 = resultTest1.TestDate;
                string fullName = $"{resultTest1.ProjectParticip.Surname} {resultTest1.ProjectParticip.Name}";
                if (!string.IsNullOrEmpty(resultTest1.ProjectParticip.SecondName))
                {
                    fullName += $" {resultTest1.ProjectParticip.SecondName}";
                }
                sheet.Range["B18"].Value2 = fullName;
                //
                int partRowNumber = 2;
                int elementRowNumber = 5;
                int primaryMarkRowNumber = 12;
                int grade5RowNumber = 15;
                string[] columns = new string[] { "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S" };
                int index = 0;
                foreach (var r in particip.OrderBy(x => x.TestNumber))
                {                                        
                    //Parts 
                    index = 0;                   
                    foreach (var value in r.Parts.Split(';'))
                    {
                        sheet.Range[columns[index] + partRowNumber].Value2 = Convert.ToDouble(value);
                        index++;
                    }
                    //Elements  
                    index = 0;                 
                    foreach (var value in r.Elements.Split(';'))
                    {
                        sheet.Range[columns[index] + elementRowNumber].Value2 = Convert.ToDouble(value);
                        index++;
                    }
                    //sheet.Range["B" + partRowNumber.ToString()].Value2 = r;                    
                    sheet.Range["B" + primaryMarkRowNumber.ToString()].Value2 = r.PrimaryMark;
                    sheet.Range["B" + grade5RowNumber.ToString()].Value2 = r.Mark5;
                    sheet.Range["B11"].Value2 = r.Marks;

                    partRowNumber++;
                    elementRowNumber++;
                    primaryMarkRowNumber++;
                    grade5RowNumber++;
                }                                                   

                //Сохранить отчет
                string reportFolder = String.Format(Environment.GetFolderPath(Environment.SpecialFolder.Desktop) + $@"\Учителя");
                if (!System.IO.Directory.Exists(reportFolder))
                    System.IO.Directory.CreateDirectory(reportFolder);
                sheet = excerInitBook.Sheets[startSheetName + particip.Count()]; //
                sheet.ExportAsFixedFormat(Excel.XlFixedFormatType.xlTypePDF, String.Format($@"{reportFolder}\{resultTest1.ParticipCode}.pdf"));
                Console.WriteLine(++countProcessedResults);
            }
            excerInitBook.Close();            

            //Создание РСЗК для «Я сдам ОГЭ!», 2016 год, предметы по выбору
            //int subjectCode = 6; //\\
            //int reportCode = 201655;
            //Excel.Workbook excerInitBook = app.Workbooks.Open($@"D:\Dropbox\К&С\К&С_ОГЭ-2017_{subjectCode}.xlsx");
            //RszkVMmanager_201648 viewModelManager = new RszkVMmanager_201648(new MarksFormat2(),
            //                                                                 excerInitBook.Sheets["ЗАДАНИЯ"].Range["A3:F34"], //\\ 
            //                                                                 subjectCode);

            //Excel.Workbook rszkTemplateBook = app.Workbooks.Open(@"d:\Dropbox\РСЗК\РСЗК_201648.xlsx");
            //RszkViewModelExporter viewModelExporter = new RszkViewModelExporter(rszkTemplateBook.Sheets["РСЗК"], reportCode);

            //int i = 1;            
            //foreach (var schoolId in context.oge_16_res.Where(x => x.SubjectCode == subjectCode).Select(x => x.SchoolId).Distinct())
            //{
            //    var results = context.oge_16_res.Where(x => x.SchoolId == schoolId && x.SubjectCode == subjectCode);
            //    var viewModel = viewModelManager.GetViewModel(context.Schools.Find(schoolId), results.Select(x => x.Marks));
            //    viewModelExporter.ExportModel(viewModel);

            //    Console.WriteLine(i++);
            //}

            //excerInitBook.Close(0);
            //rszkTemplateBook.Close(0);
            //app.Quit();
            //app = null;
            //

            //Account account = new Account("chr_coko.pto@mail.ru", "coko95");
            //var api = new MailRuCloud();
            //api.Account = account;
            //var items = api.GetItems("/Reports/0005");
            //foreach(var a in items.Result.Files)
            //{
            //    Console.WriteLine(a.Name);
            //}
            //Console.Read();
            //            

            //СОЗДАНИЕ ШКОЛЬНЫХ ОТЧЕТОВ 2016-30-ГОТОВНОСТЬ 1 КЛ. 2016/2017 - НАЧАЛО
            //IRepository<readyoneclass_res> repository = new ReadyOneClassRepository(context);           
            //ReportManager_201636 reportManager = new ReportManager_201636();
            //var SchoolIDs = repository.GetTList().Where(x => x.year == 2016).Select(x => x.SchoolID).Distinct();
            //int countSchools = SchoolIDs.Count();
            //foreach (var schoolID in SchoolIDs)
            //{
            //    var learnerResults = repository.GetTList().Where(x => x.year == 2016 && x.SchoolID == schoolID);
            //    var schoolReport = reportManager.GreateSchoolReport(learnerResults.ToList());
            //    reportManager.ExportSchoolReport(schoolReport);

            //    Console.WriteLine(countSchools--);
            //}
            //СОЗДАНИЕ ШКОЛЬНЫХ ОТЧЕТОВ 2016-30-ГОТОВНОСТЬ 1 КЛ. 2016/2017 - КОНЕЦ


            //СОЗДАНИЕ РСЗК НА ОСНОВЕ РЕЗУЛЬТАТОВ ОГЭ-2016 ПО РУССКОМУ ЯЗЫКУ И МАТЕМАТИКЕ - НАЧАЛО
            //cokoContext context = new cokoContext();
            //Excel.Workbook book_template = app.Workbooks.Open(@"d:\Dropbox\[2016-29] - РСЗД по РУ и МА\РСЗК ОГЭ-2016.xlsx");
            //Excel._Worksheet sheet_template = book_template.Sheets["РУ_РСЗК"];

            //var count = context.temp_oge16_rszk.Select(x=>x.SchoolID).Distinct().Count();            
            //foreach (var record_ru in context.temp_oge16_rszk.Where(x=>x.SubjectCode == 1))
            //{                
            //    sheet_template.Range["C2"].Value2 = record_ru.school.area.AreaName.TrimEnd();
            //    sheet_template.Range["C3"].Value2 = record_ru.school.SchoolName.TrimEnd();

            //    List<ElementWork> elements = new List<ElementWork>();
            //    elements.Add(new ElementWork { NumCode = 1, CurrentValue = (double)record_ru.t1 });
            //    elements.Add(new ElementWork { NumCode = 2, CurrentValue = (double)record_ru.t2 });
            //    elements.Add(new ElementWork { NumCode = 3, CurrentValue = (double)record_ru.t3 });
            //    elements.Add(new ElementWork { NumCode = 4, CurrentValue = (double)record_ru.t4 });
            //    elements.Add(new ElementWork { NumCode = 5, CurrentValue = (double)record_ru.t5 });
            //    elements.Add(new ElementWork { NumCode = 6, CurrentValue = (double)record_ru.t6 });
            //    elements.Add(new ElementWork { NumCode = 7, CurrentValue = (double)record_ru.t7 });
            //    elements.Add(new ElementWork { NumCode = 8, CurrentValue = (double)record_ru.t8 });
            //    elements.Add(new ElementWork { NumCode = 9, CurrentValue = (double)record_ru.t9 });
            //    elements.Add(new ElementWork { NumCode = 10, CurrentValue = (double)record_ru.t10 });
            //    elements.Add(new ElementWork { NumCode = 11, CurrentValue = (double)record_ru.t11 });
            //    elements.Add(new ElementWork { NumCode = 12, CurrentValue = (double)record_ru.t12 });
            //    elements.Add(new ElementWork { NumCode = 13, CurrentValue = (double)record_ru.t13 });
            //    elements.Add(new ElementWork { NumCode = 14, CurrentValue = (double)record_ru.t14 });
            //    elements.Add(new ElementWork { NumCode = 15, CurrentValue = (double)record_ru.t15 });     

            //    int n = 7; //номер строки в Excel
            //    foreach (var value in elements.OrderByDescending(x => x.CurrentValue))
            //    {
            //        sheet_template.Range["A" + n++].Value2 = value.NumCode;
            //    }
            //    sheet_template.Rows.AutoFit();
            //    //получить результаты по математике этой школы
            //    sheet_template = book_template.Sheets["МА_РСЗК"];
            //    var record_ma = context.temp_oge16_rszk.Where(x => x.SchoolID == record_ru.SchoolID && x.SubjectCode == 2).Single();
            //    sheet_template.Range["C2"].Value2 = record_ru.school.area.AreaName.TrimEnd();
            //    sheet_template.Range["C3"].Value2 = record_ru.school.SchoolName.TrimEnd();

            //    elements.Clear();
            //    elements.Add(new ElementWork { NumCode = 1, CurrentValue = (double)record_ma.t1 });
            //    elements.Add(new ElementWork { NumCode = 2, CurrentValue = (double)record_ma.t2 });
            //    elements.Add(new ElementWork { NumCode = 3, CurrentValue = (double)record_ma.t3 });
            //    elements.Add(new ElementWork { NumCode = 4, CurrentValue = (double)record_ma.t4 });
            //    elements.Add(new ElementWork { NumCode = 5, CurrentValue = (double)record_ma.t5 });
            //    elements.Add(new ElementWork { NumCode = 6, CurrentValue = (double)record_ma.t6 });
            //    elements.Add(new ElementWork { NumCode = 7, CurrentValue = (double)record_ma.t7 });
            //    elements.Add(new ElementWork { NumCode = 8, CurrentValue = (double)record_ma.t8 });
            //    elements.Add(new ElementWork { NumCode = 9, CurrentValue = (double)record_ma.t9 });
            //    elements.Add(new ElementWork { NumCode = 10, CurrentValue = (double)record_ma.t10 });
            //    elements.Add(new ElementWork { NumCode = 11, CurrentValue = (double)record_ma.t11 });
            //    elements.Add(new ElementWork { NumCode = 12, CurrentValue = (double)record_ma.t12 });
            //    elements.Add(new ElementWork { NumCode = 13, CurrentValue = (double)record_ma.t13 });
            //    elements.Add(new ElementWork { NumCode = 14, CurrentValue = (double)record_ma.t14 });
            //    elements.Add(new ElementWork { NumCode = 15, CurrentValue = (double)record_ma.t15 });
            //    elements.Add(new ElementWork { NumCode = 16, CurrentValue = (double)record_ma.t16 });
            //    elements.Add(new ElementWork { NumCode = 17, CurrentValue = (double)record_ma.t17 });
            //    elements.Add(new ElementWork { NumCode = 18, CurrentValue = (double)record_ma.t18 });
            //    elements.Add(new ElementWork { NumCode = 19, CurrentValue = (double)record_ma.t19 });
            //    elements.Add(new ElementWork { NumCode = 20, CurrentValue = (double)record_ma.t20 });

            //    var zadaniy1 = elements.Take(8).OrderByDescending(x=>x.CurrentValue).Take(3);           //Модуль «Алгебра»
            //    var zadaniy2 = elements.Skip(8).Take(4).OrderByDescending(x => x.CurrentValue).Take(2); //Модуль «Геометрия»
            //    var zadaniy3 = elements.Skip(13).OrderByDescending(x => x.CurrentValue).Take(2);        //Модуль «Реальная математика»
            //    var zadaniy_rest = elements.Except(zadaniy1).Except(zadaniy2).Except(zadaniy3).OrderByDescending(x => x.CurrentValue)
            //                                                                                  .Take(3); //Запасные 3               

            //    n = 7;
            //    foreach (var value in zadaniy1)
            //    {
            //        sheet_template.Range["A" + n++].Value2 = value.NumCode;
            //    }
            //    foreach (var value in zadaniy2)
            //    {
            //        sheet_template.Range["A" + n++].Value2 = value.NumCode;
            //    }
            //    foreach (var value in zadaniy3)
            //    {
            //        sheet_template.Range["A" + n++].Value2 = value.NumCode;
            //    }
            //    foreach (var value in zadaniy_rest)
            //    {
            //        sheet_template.Range["A" + n++].Value2 = value.NumCode;
            //    }
            //    sheet_template.Rows.AutoFit();
            //    sheet_template = book_template.Sheets["РУ_РСЗК"]; //для того чтобы открытие начиналось с первого листа

            //    string reportFolder = String.Format(Environment.GetFolderPath(Environment.SpecialFolder.Desktop) +
            //                                                    $@"\РСЗК_ОГЭ-2016\{record_ru.school.AreaID}-{ record_ru.SchoolID }");
            //    if (!System.IO.Directory.Exists(reportFolder))
            //        System.IO.Directory.CreateDirectory(reportFolder);

            //    book_template.SaveAs(String.Format($@"{ reportFolder }\{ record_ru.school.AreaID }-{ record_ru.SchoolID }.xlsx"));
            //    using (ZipFile zip = new ZipFile())
            //    {
            //        zip.UseUnicodeAsNecessary = true; //русские символы включаем
            //        zip.AddFile(String.Format($@"{ reportFolder }\{ record_ru.school.AreaID }-{ record_ru.SchoolID }.xlsx"), "");
            //        zip.Save(String.Format($@"{ reportFolder }\{record_ru.SchoolID}_201629.zip")); //сохранить архив в полный путь
            //    }



            //    Console.WriteLine(count--);
            //}

            //book_template.Close(0);
            //book_template = null;
            //СОЗДАНИЕ КТП НА ОСНОВЕ РЕЗУЛЬТАТОВ ВПР-2016 ПО РУССКОМУ ЯЗЫКУ И МАТЕМАТИКЕ В 4 КЛ. 2015/2016 УЧ. Г. - КОНЕЦ



            ////СОЗДАНИЕ КТП НА ОСНОВЕ РЕЗУЛЬТАТОВ ВПР-2016 ПО РУССКОМУ ЯЗЫКУ И МАТЕМАТИКЕ В 4 КЛ. 2015/2016 УЧ. Г. - НАЧАЛО
            //cokoContext context = new cokoContext();
            //Excel.Workbook book_template = app.Workbooks.Open(@"D:\Dropbox\[2016-26] - ВПР-2016\ВПР-2016_К&C.xlsx");
            //Excel._Worksheet sheet_template = book_template.Sheets["РУ_КТП"];

            //var count = context.temp_ktp_4_ru.Count();
            //foreach (var record_ru in context.temp_ktp_4_ru)
            //{
            //    sheet_template.Range["D2"].Value2 = record_ru.school.area.AreaName.TrimEnd();
            //    sheet_template.Range["D3"].Value2 = record_ru.school.SchoolName.TrimEnd();                

            //    List<ElementWork> elements = new List<ElementWork>();
            //    elements.Add(new ElementWork { NumCode = 1, CurrentValue = record_ru.el1 });
            //    elements.Add(new ElementWork { NumCode = 2, CurrentValue = record_ru.el2 });
            //    elements.Add(new ElementWork { NumCode = 3, CurrentValue = record_ru.el3 });
            //    elements.Add(new ElementWork { NumCode = 4, CurrentValue = record_ru.el4 });
            //    elements.Add(new ElementWork { NumCode = 5, CurrentValue = record_ru.el5 });
            //    elements.Add(new ElementWork { NumCode = 6, CurrentValue = record_ru.el6 });
            //    elements.Add(new ElementWork { NumCode = 7, CurrentValue = record_ru.el7 });
            //    elements.Add(new ElementWork { NumCode = 8, CurrentValue = record_ru.el8 });
            //    elements.Add(new ElementWork { NumCode = 9, CurrentValue = record_ru.el9 });
            //    elements.Add(new ElementWork { NumCode = 10, CurrentValue = record_ru.el10 });
            //    elements.Add(new ElementWork { NumCode = 11, CurrentValue = record_ru.el11 });
            //    elements.Add(new ElementWork { NumCode = 12, CurrentValue = record_ru.el12 });
            //    elements.Add(new ElementWork { NumCode = 13, CurrentValue = record_ru.el13 });
            //    elements.Add(new ElementWork { NumCode = 14, CurrentValue = record_ru.el14 });
            //    elements.Add(new ElementWork { NumCode = 15, CurrentValue = record_ru.el15 });
            //    elements.Add(new ElementWork { NumCode = 16, CurrentValue = record_ru.el16 });
            //    elements.Add(new ElementWork { NumCode = 17, CurrentValue = record_ru.el17 });                

            //    int n = 8;
            //    foreach (var value in elements.OrderByDescending(x => x.CurrentValue))
            //    {
            //        sheet_template.Range["B" + n++].Value2 = value.NumCode;
            //    }

            //    //получить результаты по математике этой школы
            //    sheet_template = book_template.Sheets["МА_КТП"];
            //    var record_ma = context.temp_ktp_4_ma.Where(x => x.SchoolID == record_ru.SchoolID).Single();
            //    sheet_template.Range["D2"].Value2 = record_ru.school.area.AreaName.TrimEnd();
            //    sheet_template.Range["D3"].Value2 = record_ru.school.SchoolName.TrimEnd();

            //    elements.Clear();
            //    elements.Add(new ElementWork { NumCode = 1, CurrentValue = record_ma.el1});
            //    elements.Add(new ElementWork { NumCode = 2, CurrentValue = record_ma.el2 });
            //    elements.Add(new ElementWork { NumCode = 3, CurrentValue = record_ma.el3 });
            //    elements.Add(new ElementWork { NumCode = 4, CurrentValue = record_ma.el4 });
            //    elements.Add(new ElementWork { NumCode = 5, CurrentValue = record_ma.el5 });
            //    elements.Add(new ElementWork { NumCode = 6, CurrentValue = record_ma.el6 });
            //    elements.Add(new ElementWork { NumCode = 7, CurrentValue = record_ma.el7 });
            //    elements.Add(new ElementWork { NumCode = 8, CurrentValue = record_ma.el8 });
            //    elements.Add(new ElementWork { NumCode = 9, CurrentValue = record_ma.el9 });

            //    n = 8;
            //    foreach (var value in elements.OrderByDescending(x => x.CurrentValue))
            //    {
            //        sheet_template.Range["B" + n++].Value2 = value.NumCode;
            //    }

            //    sheet_template = book_template.Sheets["РУ_КТП"];                
            //    string reportFolder = String.Format(Environment.GetFolderPath(Environment.SpecialFolder.Desktop) +
            //                                                    $@"\КТП_5_кл");
            //    if (!System.IO.Directory.Exists(reportFolder))
            //        System.IO.Directory.CreateDirectory(reportFolder);

            //    book_template.SaveAs(String.Format($@"{ reportFolder }\{ record_ru.school.AreaID }-{ record_ru.SchoolID }.xlsx"));
            //    Console.WriteLine(count--);

            //}

            //book_template.Close(0);
            //book_template = null;
            ////СОЗДАНИЕ КТП НА ОСНОВЕ РЕЗУЛЬТАТОВ ВПР-2016 ПО РУССКОМУ ЯЗЫКУ И МАТЕМАТИКЕ В 4 КЛ. 2015/2016 УЧ. Г. - КОНЕЦ


            //СОЗДАНИЕ КТП НА ОСНОВЕ ИТОГОВОЙ РАБОТЫ ПО РУССКОМУ ЯЗЫКУ В 3 КЛ. 2015/2016 УЧ. Г. - НАЧАЛО
            //cokoContext context = new cokoContext();
            //Excel.Workbook book_template = app.Workbooks.Open(@"D:\Dropbox\[2016-15] - ДР в 1-3 классов\3 класс\МА_3_кл_К&С.xlsx");
            //Excel._Worksheet sheet_template = book_template.Sheets["КТП"];

            //var count = context.temp_ktp_03_m.Count();
            //foreach (var record in context.temp_ktp_03_m)
            //{
            //    sheet_template.Range["D2"].Value2 = record.school.area.AreaName.TrimEnd();
            //    sheet_template.Range["D3"].Value2 = record.school.SchoolName.TrimEnd();
            //    sheet_template.Range["D4"].Value2 = record.ClassName.TrimEnd();

            //    List<ElementWork> elements = new List<ElementWork>();
            //    elements.Add(new ElementWork { StrCode = "01", CurrentValue = record.el1 });
            //    elements.Add(new ElementWork { StrCode = "02", CurrentValue = record.el2 });
            //    elements.Add(new ElementWork { StrCode = "03", CurrentValue = record.el3 });
            //    elements.Add(new ElementWork { StrCode = "04", CurrentValue = record.el4 });
            //    elements.Add(new ElementWork { StrCode = "05", CurrentValue = record.el5 });
            //    elements.Add(new ElementWork { StrCode = "06", CurrentValue = record.el6 });
            //    elements.Add(new ElementWork { StrCode = "07", CurrentValue = record.el7 });
            //    elements.Add(new ElementWork { StrCode = "08", CurrentValue = record.el8 });
            //    elements.Add(new ElementWork { StrCode = "09", CurrentValue = record.el9 });
            //    elements.Add(new ElementWork { StrCode = "10", CurrentValue = record.el10 });
            //    elements.Add(new ElementWork { StrCode = "11", CurrentValue = record.el11 });
            //    elements.Add(new ElementWork { StrCode = "12", CurrentValue = record.el12 });
            //    elements.Add(new ElementWork { StrCode = "13", CurrentValue = record.el13 });
            //    elements.Add(new ElementWork { StrCode = "14", CurrentValue = record.el14 });
            //    elements.Add(new ElementWork { StrCode = "15", CurrentValue = record.el15 });
            //    elements.Add(new ElementWork { StrCode = "16", CurrentValue = record.el16 });
            //    elements.Add(new ElementWork { StrCode = "17", CurrentValue = record.el17 });
            //    elements.Add(new ElementWork { StrCode = "18", CurrentValue = record.el18 });                

            //    int n = 8;
            //    foreach (var record2 in elements.OrderByDescending(x => x.CurrentValue))
            //    {
            //        sheet_template.Range["B" + n++].Value2 = record2.StrCode;
            //    }
            //    string reportFolder = String.Format(Environment.GetFolderPath(Environment.SpecialFolder.Desktop) +
            //                                                    $@"\КТП_3_кл_МА\{ record.school.AreaID }-{ record.SchoolID }");
            //    if (!System.IO.Directory.Exists(reportFolder))
            //        System.IO.Directory.CreateDirectory(reportFolder);

            //    book_template.SaveAs(String.Format($@"{ reportFolder }\МА_{ record.ClassCode.TrimEnd()}.xlsx"));
            //    Console.WriteLine(count--);
            //}
            //book_template.Close(0);
            //book_template = null;
            //СОЗДАНИЕ КТП НА ОСНОВЕ ИТОГОВОЙ РАБОТЫ ПО РУССКОМУ ЯЗЫКУ В 3 КЛ. 2015/2016 УЧ. Г. - КОНЕЦ


            //СОЗДАНИЕ КТП НА ОСНОВЕ КОМПЛЕКСНОЙ РАБОТЫ В 1 КЛ. 2015/2016 УЧ. Г. - НАЧАЛО
            //cokoContext context = new cokoContext();
            //Excel.Workbook book_template = app.Workbooks.Open(@"D:\Dropbox\[2016-15] - ДР в 1-3 классов\1 класс\КР_1_кл_К&С.xlsx");
            //Excel._Worksheet sheet_template = book_template.Sheets["КТП"];

            //var count = context.temp_ktp_01.Count();
            //foreach(var record in context.temp_ktp_01)
            //{
            //    sheet_template.Range["D2"].Value2 = record.school.area.AreaName.TrimEnd();
            //    sheet_template.Range["D3"].Value2 = record.school.SchoolName.TrimEnd();
            //    sheet_template.Range["D4"].Value2 = record.ClassName.TrimEnd();

            //    List<ElementWork> elements = new List<ElementWork>();
            //    elements.Add(new ElementWork { Code = "1", CurrentValue = record.el1 });
            //    elements.Add(new ElementWork { Code = "2", CurrentValue = record.el2 });
            //    elements.Add(new ElementWork { Code = "3", CurrentValue = record.el3 });
            //    elements.Add(new ElementWork { Code = "4", CurrentValue = record.el4 });
            //    elements.Add(new ElementWork { Code = "5", CurrentValue = record.el5 });
            //    elements.Add(new ElementWork { Code = "6", CurrentValue = record.el6 });
            //    elements.Add(new ElementWork { Code = "7", CurrentValue = record.el7 });
            //    elements.Add(new ElementWork { Code = "8", CurrentValue = record.el8 });

            //    int n = 8;
            //    foreach(var record2 in elements.OrderByDescending(x=>x.CurrentValue))
            //    {
            //        sheet_template.Range["B" + n++].Value2 = record2.Code;
            //    }         
            //    string reportFolder = String.Format(Environment.GetFolderPath(Environment.SpecialFolder.Desktop) + 
            //                                                    $@"\КТП_1_кл\{ record.school.AreaID }-{ record.SchoolID }");
            //    if (!System.IO.Directory.Exists(reportFolder))
            //        System.IO.Directory.CreateDirectory(reportFolder);

            //    book_template.SaveAs(String.Format($@"{ reportFolder }\{ record.ClassCode.TrimEnd()}.xlsx"));
            //    Console.WriteLine(count--);
            //}
            //book_template.Close(0);
            //book_template = null;            
            //СОЗДАНИЕ КТП НА ОСНОВЕ КОМПЛЕКСНОЙ РАБОТЫ В 1 КЛ. 2015/2016 УЧ. Г. - КОНЕЦ

            //context.temp_ktp_01
            //

            //шаблон для карт
            //string template_cartfile = Path.GetTempPath() + @"\" + Path.GetFileName(template_cartfile_path);
            //File.Copy(template_cartfile_path, template_cartfile, true);
            //
            //ReportManager reportManager = new ReportManager();                       
            //List<LearnerReport> learnerReportsList = new List<LearnerReport>();
            //cokoContext context = new cokoContext();

            //var all_results = context.Work201615_3_r.Where(x => x.mWasOrWasnt == 1); //
            //var schoolIDs = all_results.Select(x => x.SchoolID).Distinct();
            //int count_schools = schoolIDs.Count();
            //Excel.Workbook book_template = app.Workbooks.Open(@"d:\Dropbox\[2016-15] - ДР в 1-3 классов\Карты.xlsx");
            //Excel.Workbook book_template = app.Workbooks.Open(Directory.GetCurrentDirectory() + @"\Карты.xlsx");
            //Excel._Worksheet sheet_template = book_template.Sheets["3_кл_МА"];                        //
            //foreach (var schoolID in schoolIDs)
            //{
            //    int areaID = context.schools.Find(schoolID).AreaID; //получить areaid для сохранения
            //    string areaName = context.schools.Find(schoolID).area.AreaName; 

            //    Console.WriteLine("Осталось школ: " + count_schools--);
            //    learnerReportsList.Clear();
            //    var schoolResults = all_results.Where(x => x.SchoolID == schoolID).ToList();
            //    schoolResults.ForEach(x => learnerReportsList.Add(reportManager.CreateLearnerReport(x)));

            //    Excel.Workbook book_result = app.Workbooks.Add();
            //    int sheet_number = 1;
            //    foreach (var report in learnerReportsList.OrderBy(x => x.ClassName)
            //                                             .ThenBy(x => x.SNS))
            //    {
            //        report.ExportToXlsx(sheet_template);

            //        Excel.ChartObject chartObject1 = sheet_template.ChartObjects(@"Диаграмма1");
            //        Excel.Series ser1 = (Excel.Series)chartObject1.Chart.SeriesCollection(1);
            //        Excel.Range range1 = sheet_template.get_Range("F13", "F18");
            //        Painter painter1 = new Painter(ser1, range1);
            //        painter1.Draw();

            //        sheet_template.Copy(book_result.Worksheets[sheet_number++]);
            //    }
            //    string reportFolder = String.Format(Environment.GetFolderPath(Environment.SpecialFolder.Desktop) + @"\Итоговые работы. 3 класс\{0} - {1}\{2}",
            //                                                                                                       areaID, areaName.TrimEnd(), schoolID);
            //    if (!System.IO.Directory.Exists(reportFolder))                
            //        System.IO.Directory.CreateDirectory(reportFolder);

            //    book_result.ExportAsFixedFormat(Excel.XlFixedFormatType.xlTypePDF, String.Format(@"{0}\{1}_МА_201623.pdf", reportFolder, schoolID)); //
            //    book_result.Close(Type.Missing, Type.Missing, Type.Missing);
            //    Marshal.FinalReleaseComObject(book_result);
            //}

            //book_template.Close(0);
            //book_template = null;






            //oneclass2015.Models.MyExcel.KillAllExcellProcess();

            //АИС_ГИА.Domain.Concrete.cokoEntities context = new АИС_ГИА.Domain.Concrete.cokoEntities();
            //IRatingRepository monit10RatRepos = new Monit101516_ratingRepository(context);
            //ILearnerRepository learnerRepository = new LearnerRepository(context);
            //ITeacherResRepository teacherRes = new TeacherResRepository(context);
            //var ratings = monit10RatRepos.All;

            //Report
            //IRepository<school> schoolRepository = new SchoolRepository(new cokoContext());
            //IReportRepository reportRepository = new ReportRepository(new monit95Context());
            //var _school = schoolRepository.GetT("0286");
            //Console.WriteLine(_school.SchoolName);
            //var reports = reportRepository.GetReportListForSchool(_school);       

            //

            ////ЛИСТЫ УЧИТЕЛЕЙ
            ////var teacherResults = teacherRes.All.Where(x => x.SchoolID == "0199");
            //var teacherResults = teacherRes.All;
            //foreach (var teacherResult in teacherResults)
            //{                
            //    Excel.Workbook book =  app.Workbooks.Open(@"D:\YandexDisk\АИС МОР\Мониторинг 10 классов - 2015\Учителя\Индивидуальный лист учителя.xlsx");
            //    TeacherList teacherList = new TeacherList(teacherResult, book);
            //    teacherList.PopulatePattern();
            //    teacherList.SavePattern(2);
            //    book.Close(0);
            //    book = null;
            //}
            ////ЛИСТЫ УЧИТЕЛЕЙ//

            //ИНДИВИДУЛЬНЫЙ ПЛАН ОБУЧАЮЩЕГОСЯ
            //Скопировать шаблон во временную папку
            //string tempFile = System.IO.Path.GetTempPath() + @"\0519.xlsx";
            //File.Copy(@"d:\YandexDisk\АИС МОР\Мониторинг 10 классов - 2015\Шаблоны\Индивидуальный план.xlsx", tempFile, true);

            //var learnes = learnerRepository.All.Where(x => x.SchoolID == "0519").Distinct();
            //string folder = string.Empty;
            //foreach (var learner in learnes)
            //{
            //    Excel.Workbook book = app.Workbooks.Open(tempFile);
            //    LearnerPlan inPlan = new LearnerPlan(learner, book);
            //    inPlan.PopulatePattern();
            //    folder = inPlan.SavePattern(1);

            //    book.Close(0);
            //    book = null;
            //}
            //


            //ReportKP reportKP = new ReportKP(ratings);

            //var schoolIDs = learnes.Select(x => x.SchoolID).Distinct();
            //var schoolsForC = schools.Where(x => schoolIDs.Contains(x.SchoolID));
            //int countSchools = schoolsForC.Count();
            //foreach (var schoolOb in schoolsForC)
            //{
            //    //reportKP.CreateForSchool(schoolOb, 1);
            //    //reportKP.CreateForSchool(schoolOb, 2);                
            //}

            //var school = schools.Single(x => x.SchoolID == "0286");

            //int[] areaIDs = { 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217 };
            //foreach (var areaID in areaIDs)
            //{
            //    var areaLearnes = learnes.Where(x => x.school.AreaID == areaID);
            //    int countAreaLearnes = areaLearnes.Count();
            //    foreach (var learner in areaLearnes)
            //    {
            //        reportKP.CreateIndiv(learner);
            //        Console.WriteLine(areaID + ". Осталось: " + countAreaLearnes--);
            //    }
            //}

            //app.Quit();

            //АИС_ГИА.Domain.Concrete.cokoEntities context = new АИС_ГИА.Domain.Concrete.cokoEntities();
            //var records = context.monit10_1516_planoo;
            //foreach (var r in records)
            //{
            //    Console.WriteLine(r.monit10_1516_el.ElName);
            //}
            app.Quit();
        }
    }
}

//карты огэ-2016 
//Excel.Workbook excerInitBook = app.Workbooks.Open($@"d:\Dropbox\Карты_ОГЭ-2016.xlsx");
//Excel.Worksheet sheet;
//var results = context.oge_16_res.Where(x => x.SubjectCode == 1);
//int count = 0;
//foreach (var result in results)
//{
//    sheet = excerInitBook.Sheets["01_data"];
//    sheet.Range["B8"].Value2 = result.PrimaryMark;
//    sheet.Range["B9"].Value2 = result.TestMark5;
//    string fullName = $"{result.Surname} {result.Name}";
//    if (!string.IsNullOrEmpty(result.SecondName))
//    {
//        fullName += $" {result.SecondName}";
//    }
//    sheet.Range["B10"].Value2 = fullName;
//    sheet.Range["B13"].Value2 = $"{result.School.AreaId} - {result.School.area.AreaName}";
//    sheet.Range["B11"].Value2 = $"{result.SchoolId} - {result.School.Name}";

//    string[] columns = new string[] { "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P" };
//    sheet.Range["B2"].Value2 = result.t1;
//    sheet.Range["C2"].Value2 = result.t2;
//    sheet.Range["D2"].Value2 = result.t3;
//    sheet.Range["E2"].Value2 = result.t4;
//    sheet.Range["F2"].Value2 = result.t5;
//    sheet.Range["G2"].Value2 = result.t6;
//    sheet.Range["H2"].Value2 = result.t7;
//    sheet.Range["I2"].Value2 = result.t8;
//    sheet.Range["J2"].Value2 = result.t9;
//    sheet.Range["K2"].Value2 = result.t10;
//    sheet.Range["L2"].Value2 = result.t11;
//    sheet.Range["M2"].Value2 = result.t12;
//    sheet.Range["N2"].Value2 = result.t13;
//    sheet.Range["O2"].Value2 = result.t14;
//    sheet.Range["P2"].Value2 = result.t15;
//    //sheet.Range["Q2"].Value2 = result.t16;
//    //sheet.Range["R2"].Value2 = result.t17;
//    //sheet.Range["S2"].Value2 = result.t18;
//    //sheet.Range["T2"].Value2 = result.t19;
//    //sheet.Range["U2"].Value2 = result.t20;
//    //sheet.Range["V2"].Value2 = result.t21;
//    //sheet.Range["W2"].Value2 = result.t22;
//    //sheet.Range["X2"].Value2 = result.t23;
//    //sheet.Range["Y2"].Value2 = result.t24;
//    //sheet.Range["Z2"].Value2 = result.t25;
//    //sheet.Range["AA2"].Value2 = result.t26;
//    string reportFolder = $@"{Environment.GetFolderPath(Environment.SpecialFolder.Desktop)}\Карты01\{result.SchoolId}\201656";
//    if (!System.IO.Directory.Exists(reportFolder))
//        System.IO.Directory.CreateDirectory(reportFolder);

//    sheet = excerInitBook.Sheets["01"];
//    sheet.ExportAsFixedFormat(Excel.XlFixedFormatType.xlTypePDF, String.Format($@"{reportFolder}\{result.ParticipId}.pdf")); //                
//    Console.WriteLine(count++);
//}
//excerInitBook.Close();
using System;
using System.Collections.Generic;
using System.Linq;
using Monit95App.Domain.Work.Concrete;
using Reporter;
using System.Runtime.InteropServices;
using System.IO;
using Ionic.Zip;
using Excel = Microsoft.Office.Interop.Excel;
using Monit95App.Domain.Work.Abstract;
using Autofac;
using Monit95App.Infrastructure.Business;
using Monit95App.Infrastructure.Business.Interfaces;
using Newtonsoft.Json.Linq;
using Autofac.Core;
using Monit95App.Domain.Interfaces;
using Monit95App.Infrastructure.Data;
using Monit95App.Domain.Core;

namespace Monit95App.ConsoleApp
{
    class Program
    {
        static IContainer BuildContainer()
        {
            var builder = new ContainerBuilder();

            builder.RegisterType<UnitOfWork>().As<IUnitOfWork>().WithParameter("context", new cokoContext());
            builder.RegisterType<GenericRepository<TestResult>>().As<IGenericRepository<TestResult>>();
            builder.RegisterType<RsurParticipProtocolService>().As<IParticipProtocolService>();

            builder.RegisterType<RsurParticipProtocolService>();            

            return builder.Build();
        }

        static void Main(string[] args)
        {
            var container = BuildContainer();
            var rsurParticipProtocolService = container.Resolve<RsurParticipProtocolService>();

            JObject o1 = JObject.Parse(File.ReadAllText(@"config.json"));

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

            Excel.Application app = new Excel.Application()
            {
                DisplayAlerts = false
            };

            //РСУР
            Excel.Workbook excerInitBook = app.Workbooks.Open($@"d:\MailRu\Работы\Карты\Карты.xlsx");
            string currentTestGuidStr = "BCD81DE6-1640-4AA7-91F5-6EF79548E54F"; //
            var currentTestDate = new DateTime(2017, 05, 22); //  

            Excel.Worksheet sheet;
            string startSheetName = currentTestGuidStr.ToString().Substring(0, currentTestGuidStr.ToString().IndexOf('-') + 1);                        
            var results = rsurParticipProtocolService.GetTestResultsGroupByParticipCode(currentTestGuidStr, currentTestDate);
            int countProcessedResults = 0;
            foreach (var particip in results)
            {
                sheet = excerInitBook.Sheets["data"];
                //Заполняем реквизиты
                var resultTest1 = particip.First();
                sheet.Range["B27"].Value2 = resultTest1.ParticipTest.ProjectParticip.ParticipCode;
                string fullName = $"{resultTest1.ParticipTest.ProjectParticip.Surname} { resultTest1.ParticipTest.ProjectParticip.Name }";
                if (!string.IsNullOrEmpty(resultTest1.ParticipTest.ProjectParticip.SecondName))
                {
                    fullName += $" {resultTest1.ParticipTest.ProjectParticip.SecondName}";
                }
                sheet.Range["B29"].Value2 = fullName;
                //
                int primaryMarkRowNumber = 2;
                int grade5RowNumber = 7;
                int partRowNumber = 12;
                int elementRowNumber = 17;

                string[] columns = new string[] { "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S" };
                int index = 0;
                foreach (var r in particip.OrderBy(x => x.ParticipTest.ProjectTest.TestNumber))
                {
                    sheet.Range["B" + primaryMarkRowNumber.ToString()].Value2 = r.PrimaryMark; //primaryMark
                    sheet.Range["B" + grade5RowNumber.ToString()].Value2 = r.Grade5; //grade5

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

                    sheet.Range["B28"].Value2 = r.Marks; //Баллы последнего среза                    
                    sheet.Range["B30"].Value2 = r.ParticipTest.ProjectTest.TestDate;

                    partRowNumber++;
                    elementRowNumber++;
                    primaryMarkRowNumber++;
                    grade5RowNumber++;
                }

                //Сохранить отчет
                string reportFolder = String.Format(Environment.GetFolderPath(Environment.SpecialFolder.Desktop) + $@"\{resultTest1.ParticipTest.ProjectTest.Test.Name}");
                if (!System.IO.Directory.Exists(reportFolder))
                    System.IO.Directory.CreateDirectory(reportFolder);
                sheet = excerInitBook.Sheets[startSheetName + particip.Count()]; //e.g.: 873D064B-1
                sheet.ExportAsFixedFormat(Excel.XlFixedFormatType.xlTypePDF, String.Format($@"{reportFolder}\{resultTest1.ParticipTest.ParticipCode}.pdf"));
                Console.WriteLine(++countProcessedResults);
            }
            excerInitBook.Close();                                                          
        }
    }
}
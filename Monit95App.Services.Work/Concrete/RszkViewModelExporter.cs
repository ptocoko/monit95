using Ionic.Zip;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Excel = Microsoft.Office.Interop.Excel;

namespace Monit95App.Services.Work.Concrete
{
    //Экспорт модели РСЗК для ОДНОГО предмета
    public class RszkViewModelExporter
    {
        private int projectCode; //201639 - РУ
                                 

        private Excel.Worksheet templateSheet;
        private string projectFolderNameOnDesktop = "РСЗК";

        public RszkViewModelExporter(Excel.Worksheet _templateSheet, int _projectCode)
        {
            this.projectCode = _projectCode;
            this.templateSheet = _templateSheet;
        }
        public void ExportModel(RszkViewModel viewModel)
        {
            templateSheet.Range["C3"].Value2 = viewModel.SchoolBaseInfo.AreaName;
            templateSheet.Range["C4"].Value2 = viewModel.SchoolBaseInfo.Name;            
            int rowNumber = 8;
            foreach (var excer in viewModel.Exercises.OrderByDescending(x => x.Result.Percent))
            {
                templateSheet.Range["A" + rowNumber].Value2 = excer.Number;
                templateSheet.Range["B" + rowNumber].Value2 = excer.SubjectParts;
                templateSheet.Range["C" + rowNumber].Value2 = excer.SubjectThemes;
                templateSheet.Range["D" + rowNumber].Value2 = excer.SubjectSkills;
                rowNumber++;
            }
            //Сохранение в .xlsx            
            //1. Создаем папку на рабочем столе            
            string reportFolder = $@"{Environment.GetFolderPath(Environment.SpecialFolder.Desktop)}\{projectFolderNameOnDesktop}\{viewModel.SchoolBaseInfo.Id}";
            if (!System.IO.Directory.Exists(reportFolder)) System.IO.Directory.CreateDirectory(reportFolder);
            //2. Сохраняем в папку на рабочем столе
            string file_xlsx = $@"{reportFolder}\{viewModel.SchoolBaseInfo.Id}_{projectCode}.xlsx";
            string file_zip = $@"{reportFolder}\{viewModel.SchoolBaseInfo.Id}_{projectCode}.zip";
            templateSheet.SaveAs(file_xlsx);

            //3. Архивируем
            using (ZipFile zip = new ZipFile())
            {
                zip.UseUnicodeAsNecessary = true; //русские символы включаем
                zip.AddFile(file_xlsx, "");
                zip.Save(file_zip); //сохранить архив в полный путь
            }
            //
        }
    }
}

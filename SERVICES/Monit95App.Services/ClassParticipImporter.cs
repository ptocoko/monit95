using ClosedXML.Excel;
using Monit95App.Domain.Core.Entities;
using Monit95App.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.IO;
using System.Linq;

namespace Monit95App.Services
{
    public class ClassParticipImporter : IClassParticipImporter
    {
        private readonly IEnumerable<Class> _allClasses;

        public ClassParticipImporter(IClassService classService)
        {
            _allClasses = classService.GetAll(); //все классы загружаются заранее, 
                                                //чтобы не делать запрос в базу данных на каждую валидацию ClassName
        }

        public (IList<ClassParticip>, IEnumerable<int>) GetParticipsFromFilePath(string filePath)
        {
            using(Stream stream = new FileStream(filePath, FileMode.Open))
            {
                return ImportFromExcelFileStream(stream);
            }
        }

        public (IList<ClassParticip>, IEnumerable<int>) ImportFromExcelFileStream(Stream stream)
        {
            if (stream == null)
            {
                throw new ArgumentNullException(nameof(stream));
            }

            using (var workbook = new XLWorkbook(stream))
            {
                var (classParticips, rowNumbersWithErrors) = GetParticipsFromWorksheet(workbook.Worksheets.First());

                return (classParticips, rowNumbersWithErrors);
            }
        }
        
        private (List<ClassParticip>, List<int>) GetParticipsFromWorksheet(IXLWorksheet excelList)
        {
            var participsFromExcelList = new List<ClassParticip>();
            var rowNumbersWithErrors = new List<int>();

            foreach (var row in excelList.RowsUsed().Skip(1).Take(500))
            {
                var model = new ClassParticip
                {
                    Surname = NormalizeNames(row.Cell(1).Value.ToString()),
                    Name = NormalizeNames(row.Cell(2).Value.ToString()),
                    SecondName = NormalizeNames(row.Cell(3).Value.ToString()),
                    ClassName = NormalizeClassName(row.Cell(4).Value.ToString())
                };

                if (ValidateModel(model))
                    participsFromExcelList.Add(model);
                else
                    rowNumbersWithErrors.Add(row.RowNumber());
            }

            return (participsFromExcelList, rowNumbersWithErrors.Count == 0 ? null : rowNumbersWithErrors);
        }

        private bool ValidateModel(ClassParticip model)
        {
            bool isValidModel = true;

            var validContext = new ValidationContext(model);
            var validationResults = new Collection<ValidationResult>();
            if (!Validator.TryValidateObject(model, validContext, validationResults, true) || !ValidateClassName(model.ClassName))
            {
                isValidModel = false;
            }

            return isValidModel;
        }

        private string NormalizeClassName(string className)
        {
            return className.Replace("\"", "").Replace("'", "").Replace(" ", "").ToUpper();
        }

        private string NormalizeNames(string name)
        {
            if(name.Length < 4)
            {
                return name;
            }
            else
            {
                return name.Replace(" ", "").Split('-').Select(s => s.Substring(0, 1).ToUpper() + s.Remove(0, 1).ToLower())
                                                       .Aggregate((s1, s2) => $"{s1}-{s2}");
            }
        }

        private bool ValidateClassName(string className)
        {
            return _allClasses.Select(s => s.Name).Any(p => p == className);
        }
    }
}

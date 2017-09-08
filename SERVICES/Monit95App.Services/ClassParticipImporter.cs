using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;

using ClosedXML.Excel;

using Monit95App.Domain.Core.Entities;
using Monit95App.Services.Interfaces;
using System.Globalization;

namespace Monit95App.Services
{
    public class ClassParticipImporter : IClassParticipImporter
    {
        private List<Class> _allClasses;
        private readonly IClassService _classService;

        public ClassParticipImporter(IClassService classService)
        {
            _classService = classService;
        }

        public (IList<ClassParticip>, IEnumerable<int>) GetParticipsFromFilePath(string filePath, List<int> classNumbers = null)
        {
            using(Stream stream = new FileStream(filePath, FileMode.Open))
            {
                return ImportFromExcelFileStream(stream);
            }
        }

        public (IList<ClassParticip>, IEnumerable<int>) ImportFromExcelFileStream(Stream stream, List<int> classNumbers = null)
        {
            if (stream == null)
            {
                throw new ArgumentNullException(nameof(stream));
            }

            if (classNumbers == null)
            {
                _allClasses = _classService.GetAll().ToList();
            }
            else
            {
                _allClasses = new List<Class>();
                var classes = _classService.GetAll();
                foreach (var classNumber in classNumbers)
                {
                    _allClasses.AddRange(classes.Where(p => p.Name.StartsWith(classNumber.ToString() + " ")));
                }
            }

            using (var workbook = new XLWorkbook(stream))
            {
                return GetParticipsFromWorksheet(workbook.Worksheets.First());
            }
        }
        
        private (List<ClassParticip>, List<int>) GetParticipsFromWorksheet(IXLWorksheet excelList)
        {
            List<ClassParticip> participsFromExcelList = new List<ClassParticip>();
            List<int> rowNumbersWithErrors = new List<int>();

            foreach (var row in excelList.RowsUsed().Skip(1).Take(500))
            {
                var model = new ClassParticip
                {
                    Surname = NormalizeNames(row.Cell(1).Value.ToString()),
                    Name = NormalizeNames(row.Cell(2).Value.ToString()),
                    SecondName = NormalizeNames(row.Cell(3).Value.ToString()),
                    ClassName = NormalizeClassName(row.Cell(4).Value.ToString()),
                    Birthday = NormalizeDateString(row.Cell(5).Value.ToString())
                };

                if (ValidateModel(model))
                    participsFromExcelList.Add(model);
                else
                    rowNumbersWithErrors.Add(row.RowNumber());
            }

            return (participsFromExcelList, rowNumbersWithErrors.Count == 0 ? null : rowNumbersWithErrors);
        }

        private DateTime? NormalizeDateString(string v)
        {
            string dateString = Regex.Replace(v, @"[A-я]", "");
            if (DateTime.TryParse(dateString, new DateTimeFormatInfo() { ShortDatePattern = "dd.MM.yyyy" }, DateTimeStyles.None, out DateTime resultDate))
            {
                return resultDate;
            }
            else
            {
                return null;
            }
        }

        private bool ValidateModel(ClassParticip model)
        {
            var validContext = new ValidationContext(model);
            var validationResults = new Collection<ValidationResult>();
            return (Validator.TryValidateObject(model, validContext, validationResults, true) && ValidateClassName(model.ClassName));
        }

        private string NormalizeClassName(string className)
        {
            if (className.Length > 0)
            {
                var newClassName = className.Replace("\"", "").Replace("'", "").Replace(" ", "").ToUpper();
                if (char.IsLetter(newClassName.Last()))
                {
                    return Regex.Replace(newClassName, "([A-я]$)", " $0");
                }
                else
                {
                    return newClassName;
                }
            }
            else
            {
                return className;
            }
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
            return _allClasses.Select(s => s.Name.Trim()).Any(p => p == className);
        }
    }
}

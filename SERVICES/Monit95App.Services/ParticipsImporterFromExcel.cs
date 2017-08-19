﻿using AutoMapper;
using ClosedXML.Excel;
using Monit95App.Domain.Core;
using Monit95App.Domain.Core.Entities;
using Monit95App.Domain.Interfaces;
using Monit95App.Infrastructure.Data;
using Monit95App.Services.Interfaces;
using Monit95App.Services.Models;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Services
{
    public class ExcelParticipImporter : IParticipsImporterFromExcel
    {
        public bool HasRowsWithErrors { get; private set; } = false;
        public Dictionary<ExcelRowAdress, ParticipModel> RowsWithErrors { get; private set; } = new Dictionary<ExcelRowAdress, ParticipModel>(); 

        private IMapper _mapper;
        private IEnumerable<Class> _allClasses;

        public ExcelParticipImporter(IClassService classService)
        {
            _allClasses = classService.GetAll(); //все классы загружаются заранее, 
                                                //чтобы не делать запрос в базу данных на каждое преобразование из ClassName в ClassCode

            var mapperConfig = new MapperConfiguration(cfg => cfg.CreateMap<ParticipModel, Particip>()
                                                             .ForMember(d => d.ClassCode, opt => opt.MapFrom(src => GetSchoolCodeByName(src.ClassName))));
            _mapper = mapperConfig.CreateMapper();
        }

        public IList<Particip> GetParticipsFromFilePath(string filePath)
        {
            using(Stream stream = new FileStream(filePath, FileMode.Open))
            {
                return GetFromStream(stream);
            }
        }

        public (IList<ClassParticip>, IEnumerable<int>) GetFromStream()
        {
            var tuple = (new List<ClassParticip>(), new List<int>());

            return tuple;
        }
        public IList<Particip> GetFromStream(Stream stream)
        {
            if (stream == null)
            {
                throw new ArgumentNullException(nameof(stream));
            }

            List<Particip> particips = new List<Particip>();
            using(var workbook = new XLWorkbook(stream))
            {
                int numberOfList = 1;
                particips.AddRange(GetParticipsFromWorksheet(workbook.Worksheets.First(), numberOfList));
            }

            return particips;
        }

        private List<Particip> GetParticipsFromWorksheet(IXLWorksheet excelList, int numberOfList)
        {
            List<Particip> participsFromExcelList = new List<Particip>();

            foreach (var row in excelList.RowsUsed().Skip(1))
            {
                var model = new ParticipModel
                {
                    Surname = NormalizeNames(row.Cell(1).Value.ToString()),
                    Name = NormalizeNames(row.Cell(2).Value.ToString()),
                    SecondName = NormalizeNames(row.Cell(3).Value.ToString()),
                    ClassName = NormalizeClassName(row.Cell(4).Value.ToString())
                };

                ValidateModel(ref participsFromExcelList, model, numberOfList, row.RowNumber());
            }

            return participsFromExcelList;
        }

        private void ValidateModel(ref List<Particip> participsFromExcelList, ParticipModel model, int listNumber, int rowNumber)
        {
            var validContext = new System.ComponentModel.DataAnnotations.ValidationContext(model);
            var validationResults = new Collection<ValidationResult>();
            if (Validator.TryValidateObject(model, validContext, validationResults, true) && !String.IsNullOrEmpty(model.ClassName))
            {
                try
                {
                    var particip = _mapper.Map<Particip>(model);
                    participsFromExcelList.Add(particip);
                }
                catch (AutoMapperMappingException)
                {
                    HasRowsWithErrors = true;
                    RowsWithErrors.Add(new ExcelRowAdress(listNumber, rowNumber),  model);
                }
            }
            else
            {
                HasRowsWithErrors = true;
                RowsWithErrors.Add(new ExcelRowAdress(listNumber, rowNumber), model);
            }
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

        private string GetSchoolCodeByName(string schoolName)
        {
            return _allClasses.Where(p => p.Name.Trim() == schoolName).Select(s => s.Id).Single();
        }
    }
}
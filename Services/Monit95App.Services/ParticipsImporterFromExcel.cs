using AutoMapper;
using ClosedXML.Excel;
using Monit95App.Domain.Core;
using Monit95App.Domain.Interfaces;
using Monit95App.Infrastructure.Data;
using Monit95App.Services.Interfaces;
using Monit95App.Services.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Services
{
    public class ParticipsImporterFromExcel : IParticipsImporterFromExcel
    {
        public bool HasRowsWithErrors { get; set; } = false;
        public List<ParticipModel> RowsWithErrors { get; set; } = new List<ParticipModel>();

        private IMapper _mapper;
        private IEnumerable<Class> _allClasses;

        public ParticipsImporterFromExcel(IClassService classService)
        {
            _allClasses = classService.GetAll(); //все классы загружаются заранее, чтобы не делать запрос в базу данных на каждое преобразование из ClassName в ClassCode

            var mapperConfig = new MapperConfiguration(cfg => cfg.CreateMap<ParticipModel, Particip>()
                                                             .ForMember(d => d.ClassCode, opt => opt.MapFrom(src => GetSchoolCodeByName(src.ClassName))));
            _mapper = mapperConfig.CreateMapper();
        }

        public List<Particip> GetParticipsFromExcelPath(string path)
        {
            if (String.IsNullOrEmpty(path)) throw new ArgumentException(nameof(path));

            List<ParticipModel> participModels = new List<ParticipModel>();
            using(var workbook = new XLWorkbook(path))
            {
                int numberOfSheet = 1;
                foreach(var sheet in workbook.Worksheets)
                {
                    participModels.AddRange(GetParticipsFromWorksheet(sheet, numberOfSheet));
                    numberOfSheet++;
                }
            }

            return _mapper.Map<List<Particip>>(participModels);
        }

        private List<ParticipModel> GetParticipsFromWorksheet(IXLWorksheet sheet, int numberOfSheet)
        {
            List<ParticipModel> models = new List<ParticipModel>();
            int countOfRows = sheet.RowsUsed().Count();

            for(int i = 1; i >= countOfRows; i++)
            {

            }

            return models;
        }
        
        private string GetSchoolCodeByName(string schoolName)
        {
            return _allClasses.Where(p => p.Name.Trim() == schoolName).Select(s => s.Id).Single();
        }
    }
}

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using AutoMapper;
using Monit95App.Domain.Core;
using Monit95App.Domain.Interfaces;
using Monit95App.Services.Interfaces;
using Monit95App.Services.Models;
using Monit95App.Services.Models.Rsur;

namespace Monit95App.Services.Rsur
{
    public class RsurParticipService : IRsurParticipService
    {
        #region Fields
        
        private readonly IGenericRepository<ProjectParticip> _rsurParticipRepository;
        
        #warning separate 
        private readonly IGenericRepository<TestResult> _testResultRepository;

        private readonly IGenericRepository<ProjectParticipsEdit> _rsurParticipEditRepository;

        #warning separate 
        private readonly IRsurParticipViewer _rsurParticipViewer;

        #endregion

        #region Methods

        public RsurParticipService(IGenericRepository<ProjectParticip> rsurParticipRepository, 
                                   IGenericRepository<TestResult> testResultRepository,
                                   IGenericRepository<ProjectParticipsEdit> rsurParticipEditRepository,
                                   IRsurParticipViewer rsurParticipViewer)
        {            
            _rsurParticipRepository = rsurParticipRepository;
            _testResultRepository = testResultRepository;
            _rsurParticipEditRepository = rsurParticipEditRepository;
            _rsurParticipViewer = rsurParticipViewer;
        }

        public IEnumerable<RsurParticipFullInfo> Get(int? areaCode, string schoolId)
        {
            var queryToGetEntities = _rsurParticipRepository.GetAll();
            if (areaCode != null)
            {
                queryToGetEntities = queryToGetEntities.Where(p => p.School.AreaCode == areaCode);
            }
            if (schoolId != null)
            {
                queryToGetEntities = queryToGetEntities.Where(p => p.SchoolId == schoolId);
            }
            var entities = queryToGetEntities.ToList();

            var rsurParticipFullInfoList = new List<RsurParticipFullInfo>();

            foreach (var entity in entities)
            {
                var fullInfo = new RsurParticipFullInfo(_rsurParticipEditRepository);
                fullInfo.TemplateMethod(entity);
                rsurParticipFullInfoList.Add(fullInfo);
            }                                    

            return rsurParticipFullInfoList;
        }
        public RsurParticipBaseInfo GetByParticipCode(string participCode)
        {
            return new RsurParticipBaseInfo();


        }
        public void Add(RsurParticipBaseInfo model)
        {
            //newPParticip.School = _db.Schools.Find(newPParticip.SchoolId);            

            //var areaPParticips = _db.ProjectParticips.Where(x => x.School.AreaCode == newPParticip.School.AreaCode).ToList();                                              
            //var areaParticipCodes = areaPParticips.Select(x => Int32.Parse(x.ParticipCode.Substring(9, 3)));
            //var validCodes = Enumerable.Range(1, 2000).Except(areaParticipCodes);            
            //var firstValidCode = validCodes.OrderBy(x => x).First().ToString();

            //if (firstValidCode.Length == 1) firstValidCode = "00" + firstValidCode;
            //if (firstValidCode.Length == 2) firstValidCode = "0" + firstValidCode;

            //string newParticipCode = $"2016-{newPParticip.School.AreaCode.ToString()}-{firstValidCode}";

            //return newParticipCode;
        }
        public void Update(RsurParticipFullInfo model)
        {
            //if (model == null)
            //{
            //    throw new ArgumentNullException(nameof(model));
            //}

            var validContext = new System.ComponentModel.DataAnnotations.ValidationContext(model);
            Validator.ValidateObject(model, validContext);            
        }
        public IEnumerable<IGrouping<string, ParticipResultsModel>> GetParticipResults(string participCode)
        {
            return _testResultRepository.GetAll().Where(s => s.ParticipTest.ProjectParticip.ParticipCode == participCode).ToList()
                                                    .Select(s => _rsurParticipViewer.CreateResultModel(s, participCode))
                                                        .GroupBy(x => x.NumberCode).OrderBy(o => o.Key).ToList();
        }
        
        #endregion
    }
}

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

        private readonly MapperConfiguration _fullMapConfiguration = new MapperConfiguration(cfg => cfg.CreateMap<RsurParticipFullInfo, ProjectParticip>());
        private readonly MapperConfiguration _partMapConfiguration = new MapperConfiguration(cfg => cfg.CreateMap<RsurParticipFullInfo, ProjectParticip>()
                                                                                                      .ForMember(member => member.Name, opt => opt.Ignore())
                                                                                                      .ForMember(member => member.Surname, opt => opt.Ignore()));
        #endregion

        #region Dependency

        private readonly IGenericRepository<ProjectParticip> _rsurParticipRepository;
        private readonly IRsurParticipEditService _rsurParticipEditService;
        #warning separate 
        private readonly IGenericRepository<TestResult> _testResultRepository;
        #warning separate 
        private readonly IRsurParticipViewer _rsurParticipViewer;

        #endregion

        #region Methods

        public RsurParticipService(IGenericRepository<ProjectParticip> rsurParticipRepository, 
                                   IGenericRepository<TestResult> testResultRepository,
                                   IRsurParticipViewer rsurParticipViewer,
                                   IRsurParticipEditService rsurParticipEditService)
        {            
            _rsurParticipRepository = rsurParticipRepository;
            _testResultRepository = testResultRepository;
            _rsurParticipViewer = rsurParticipViewer;
            _rsurParticipEditService = rsurParticipEditService;
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
                var fullInfo = new RsurParticipFullInfo();
                fullInfo.TemplateMethod(entity);
                rsurParticipFullInfoList.Add(fullInfo);
            }                                    

            return rsurParticipFullInfoList;
        }
        public RsurParticipFullInfo GetByParticipCode(string participCode)
        {
            if(participCode == null)
            {
                throw new ArgumentNullException(nameof(participCode));
            }

            var entity = _rsurParticipRepository.GetById(participCode);
            if(entity == null)
            {
                throw new ArgumentException(nameof(participCode));
            }

            Mapper.Initialize(cfg => cfg.CreateMap<ProjectParticip, RsurParticipFullInfo>());
            var fullInfo = Mapper.Map<ProjectParticip, RsurParticipFullInfo>(entity);
            
            if (entity.ProjectParticipEdit != null)
            {
                if (entity.ProjectParticipEdit.Surname != null)
                    fullInfo.HasSurnameEdit = true;
                if (entity.ProjectParticipEdit.Name != null)
                    fullInfo.HasNameEdit = true;
            }                

            return fullInfo;
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
        public IEnumerable<IGrouping<string, ParticipResultsModel>> GetParticipResults(string participCode)
        {
            return _testResultRepository.GetAll().Where(s => s.ParticipTest.ProjectParticip.ParticipCode == participCode).ToList()
                                                    .Select(s => _rsurParticipViewer.CreateResultModel(s, participCode))
                                                        .GroupBy(x => x.NumberCode).OrderBy(o => o.Key).ToList();
        }
        public RsurParticipFullInfo Update(RsurParticipFullInfo fullInfo, bool doNotMustTakeEdit)
        {
            if (fullInfo == null)
            {
                throw new ArgumentNullException(nameof(fullInfo));
            }

            var validContext = new System.ComponentModel.DataAnnotations.ValidationContext(fullInfo);
            Validator.ValidateObject(fullInfo, validContext);

            var entity = _rsurParticipRepository.GetById(fullInfo.ParticipCode);

            if (entity == null)
            {
                throw new ArgumentException(nameof(fullInfo.ParticipCode));
            }

            IMapper mapper;            
            if (doNotMustTakeEdit)
            {
                mapper = _fullMapConfiguration.CreateMapper();
                mapper.Map(fullInfo, entity);
            }
            else
            {                                
                mapper = _partMapConfiguration.CreateMapper();                
                if (entity.ProjectParticipEdit == null)
                {
                    entity.ProjectParticipEdit = new ProjectParticipEdit();
                }
                mapper.Map(fullInfo, entity);

                //Check that all entity's properties are null
                var isEntityEditPropertiesNull = entity.GetType().GetProperties()
                                                       .Where(pi => pi.GetValue(entity) is string)
                                                       .Select(pi => (string)pi.GetValue(entity))
                                                       .All(value => value == null);
                if (isEntityEditPropertiesNull)
                {
                    entity.ProjectParticipEdit = null;
                }
            }
            
            _rsurParticipRepository.Update(entity);            
            
            return GetByParticipCode(fullInfo.ParticipCode);
        }
        public void FullUpdate(RsurParticipFullInfo fullInfo)
        {
            //Validation
            if (fullInfo == null)
            {
                throw new ArgumentNullException(nameof(fullInfo));
            }
            var validContext = new System.ComponentModel.DataAnnotations.ValidationContext(fullInfo);
            Validator.ValidateObject(fullInfo, validContext);
            var entity = _rsurParticipRepository.GetById(fullInfo.ParticipCode);
            if (entity == null)
            {
                throw new ArgumentException(nameof(fullInfo.ParticipCode));
            }

            //Mapping
            IMapper mapper = _fullMapConfiguration.CreateMapper();
            mapper.Map(fullInfo, entity);

            _rsurParticipRepository.Update(entity);            
        }
        public RsurParticipFullInfo PartUpdate(RsurParticipFullInfo fullInfo)
        {
            //Validation
            if (fullInfo == null)
            {
                throw new ArgumentNullException(nameof(fullInfo));
            }
            var validContext = new System.ComponentModel.DataAnnotations.ValidationContext(fullInfo);
            Validator.ValidateObject(fullInfo, validContext);
            var entity = _rsurParticipRepository.GetById(fullInfo.ParticipCode);
            if (entity == null)
            {
                throw new ArgumentException(nameof(fullInfo.ParticipCode));
            }

            //Mapping
            IMapper mapper = _partMapConfiguration.CreateMapper();
            mapper.Map(fullInfo, entity);

            if(entity.ProjectParticipEdit == null)
            {
                entity.ProjectParticipEdit = new ProjectParticipEdit();
            }
            if(fullInfo.Surname != entity.Surname)
            {
                entity.ProjectParticipEdit.Surname = fullInfo.Surname;
                fullInfo.HasSurnameEdit = true;
            }
            if (fullInfo.Name != entity.Name)
            {
                entity.ProjectParticipEdit.Name = fullInfo.Name;
                fullInfo.HasNameEdit = true;
            }

            _rsurParticipRepository.Update(entity);

            return fullInfo;
        }

        #endregion
    }
}

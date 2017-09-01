using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

using AutoMapper;

using Monit95App.Domain.Core.Entities;
using Monit95App.Domain.Interfaces;
using Monit95App.Services.Interfaces;

namespace Monit95App.Services.Rsur
{
    using Monit95App.Services.DTOs;

    public class RsurParticipService : IRsurParticipService
    {
        #region Fields        

        //private readonly MapperConfiguration _fullMapConfiguration = new MapperConfiguration(cfg => cfg.CreateMap<RsurParticipPostDto, RsurParticip>());
        //private readonly MapperConfiguration _partMapConfiguration = new MapperConfiguration(cfg => cfg.CreateMap<RsurParticipPostDto, RsurParticip>()
        //                                                                                              .ForMember(member => member.Name, opt => opt.Ignore())
        //                                                                                              .ForMember(member => member.Surname, opt => opt.Ignore()));
        #endregion

        #region Dependencies

        private readonly IRsurParticipService _rsurParticipService;        

        #endregion

        public RsurParticipService(IRsurParticipService rsurParticipService)            
        {            
            _rsurParticipService = rsurParticipService;           
        }

        #region Methods

        public string Add(RsurParticipPostDto dto)
        {
            var validContext = new System.ComponentModel.DataAnnotations.ValidationContext(dto);
            Validator.ValidateObject(dto, validContext, true);

            Mapper.Initialize(cfg => cfg.CreateMap<RsurParticipPostDto, RsurParticip>());
            var entity = Mapper.Map<RsurParticipPostDto, RsurParticip>(dto);




            newPParticip.School = _db.Schools.Find(newPParticip.SchoolId);

            var areaPParticips = _db.ProjectParticips.Where(x => x.School.AreaCode == newPParticip.School.AreaCode).ToList();
            var areaParticipCodes = areaPParticips.Select(x => Int32.Parse(x.ParticipCode.Substring(9, 3)));
            var validCodes = Enumerable.Range(1, 2000).Except(areaParticipCodes);
            var firstValidCode = validCodes.OrderBy(x => x).First().ToString();

            if (firstValidCode.Length == 1) firstValidCode = "00" + firstValidCode;
            if (firstValidCode.Length == 2) firstValidCode = "0" + firstValidCode;

            string newParticipCode = $"2016-{newPParticip.School.AreaCode.ToString()}-{firstValidCode}";

            return newParticipCode;
        }

        //public IEnumerable<RsurParticipFullInfo> Get(int? areaCode = null, string schoolId = null)
        //{
        //    //If areaCode and schoolId are null then return for region

        //    var queryToGetCodes = _rsurParticipRepository.GetAll();
        //    if (areaCode != null)
        //    {
        //        queryToGetCodes = queryToGetCodes.Where(pr => pr.School.AreaCode == areaCode);
        //    }
        //    if (schoolId != null)
        //    {
        //        queryToGetCodes = queryToGetCodes.Where(pr => pr.SchoolId == schoolId);
        //    }
        //    var participCodes = queryToGetCodes.Select(pp => pp.ParticipCode).ToList();  

        //    var rsurParticipFullInfoList = new List<RsurParticipFullInfo>();
        //    foreach (var participCode in participCodes)
        //    {
        //        rsurParticipFullInfoList.Add(GetByParticipCode(participCode));
        //    }            

        //    return rsurParticipFullInfoList;
        //}
        //public virtual RsurParticipFullInfo GetByParticipCode(string participCode)
        //{
        //    if(participCode == null)
        //    {
        //        throw new ArgumentNullException(nameof(participCode));
        //    }

        //    var entity = _rsurParticipRepository.GetById(participCode);
        //    if(entity == null)
        //    {
        //        throw new ArgumentException(nameof(participCode));
        //    }

        //    Mapper.Initialize(cfg => cfg.CreateMap<RsurParticip, RsurParticipFullInfo>());
        //    var fullInfo = Mapper.Map<RsurParticip, RsurParticipFullInfo>(entity);
            
        //    if (entity.RsurParticipEdit != null)
        //    {
        //        if (entity.RsurParticipEdit.Surname != null)
        //            fullInfo.HasSurnameEdit = true;
        //        if (entity.RsurParticipEdit.Name != null)
        //            fullInfo.HasNameEdit = true;
        //    }                

        //    return fullInfo;
        //}
        
        //public IEnumerable<IGrouping<string, ParticipResultsModel>> GetParticipResults(string participCode)
        //{
        //    return _rsurTestResultRepository.GetAll().Where(s => s.RsurParticipTest.RsurParticip.ParticipCode == participCode).ToList()
        //                                            .Select(s => _rsurParticipViewer.CreateResultModel(s, participCode))
        //                                                .GroupBy(x => x.NumberCode).OrderBy(o => o.Key).ToList();
        //}        

        //public void FullUpdate(RsurParticipFullInfo fullInfo)
        //{
        //    //Validation
        //    if (fullInfo == null)
        //    {
        //        throw new ArgumentNullException(nameof(fullInfo));
        //    }
        //    var validContext = new System.ComponentModel.DataAnnotations.ValidationContext(fullInfo);
        //    Validator.ValidateObject(fullInfo, validContext);
        //    var entity = _rsurParticipRepository.GetById(fullInfo.ParticipCode);
        //    if (entity == null)
        //    {
        //        throw new ArgumentException(nameof(fullInfo.ParticipCode));
        //    }

        //    //Mapping
        //    IMapper mapper = _fullMapConfiguration.CreateMapper();
        //    mapper.Map(fullInfo, entity);

        //    _rsurParticipRepository.Update(entity);            
        //}
        //public RsurParticipFullInfo PartUpdate(RsurParticipFullInfo fullInfo)
        //{
        //    //Validation
        //    if (fullInfo == null)
        //    {
        //        throw new ArgumentNullException(nameof(fullInfo));
        //    }
        //    var validContext = new System.ComponentModel.DataAnnotations.ValidationContext(fullInfo);
        //    Validator.ValidateObject(fullInfo, validContext);
        //    var entity = _rsurParticipRepository.GetById(fullInfo.ParticipCode);
        //    if (entity == null)
        //    {
        //        throw new ArgumentException(nameof(fullInfo.ParticipCode));
        //    }

        //    //Mapping
        //    IMapper mapper = _partMapConfiguration.CreateMapper();
        //    mapper.Map(fullInfo, entity);

        //    if(entity.RsurParticipEdit == null)
        //    {
        //        entity.RsurParticipEdit = new RsurParticipEdit();
        //    }
        //    if(fullInfo.Surname != entity.Surname)
        //    {
        //        entity.RsurParticipEdit.Surname = fullInfo.Surname;
        //        fullInfo.HasSurnameEdit = true;
        //    }
        //    if (fullInfo.Name != entity.Name)
        //    {
        //        entity.RsurParticipEdit.Name = fullInfo.Name;
        //        fullInfo.HasNameEdit = true;
        //    }

        //    //Check that all entity.ProjectParticipEdit's properties are null                                        
        //    var isNullAllProperties = entity.RsurParticipEdit.GetType()
        //                                    .GetProperties()                                             
        //                                    .Select(pi => pi.GetValue(entity.RsurParticipEdit))
        //                                    .All(ob => ob == null);

        //    if (isNullAllProperties)
        //    {
        //        entity.RsurParticipEdit = null;
        //    }

        //    _rsurParticipRepository.Update(entity);

        //    return fullInfo;
        //}

        #endregion
    }
}

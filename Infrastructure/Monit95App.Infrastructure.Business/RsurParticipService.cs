using Monit95App.Infrastructure.Business.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Monit95App.Domain.Interfaces;
using Monit95App.Domain.Core;
using Monit95App.Infrastructure.Business.Models;
using System.Data.Entity.Infrastructure;

namespace Monit95App.Infrastructure.Business
{
    public class RsurParticipService : IRsurParticipService
    {
        #region Fields

        private readonly IUnitOfWork _unitOfWork;
        private readonly IGenericRepository<ProjectParticip> _rsurParticipRepository;
        private readonly IGenericRepository<TestResult> _testResultRepository;
        private readonly IRsurParticipViewer _rsurParticipViewer;

        #endregion

        #region Methods

        public RsurParticipService(IUnitOfWork unitOfWork, IGenericRepository<ProjectParticip> rsurParticipRepository, IGenericRepository<TestResult> testResultRepository, IRsurParticipViewer rsurParticipViewer)
        {
            _unitOfWork = unitOfWork;
            _rsurParticipRepository = rsurParticipRepository;
            _testResultRepository = testResultRepository;
            _rsurParticipViewer = rsurParticipViewer;
        }
        
        public IEnumerable<RsurParticipBaseInfo> GetByUserName(string userName, string userRoles)
        {
            var allParticips = _rsurParticipRepository.GetAll();

            IEnumerable<RsurParticipBaseInfo> result = null;

            if (userRoles.Contains("coko"))
                result = allParticips.Where(x => x.SchoolId == "0000").ToList().Select(x => _rsurParticipViewer.CreateModel(x));

            if (userRoles.Contains("area"))
            {
                var areaCode = int.Parse(userName);
                result = allParticips.Where(x => x.School.AreaCode == areaCode).ToList().Select(x => _rsurParticipViewer.CreateModel(x));
            }
            if (userRoles.Contains("school"))
                result = allParticips.Where(x => x.SchoolId == userName).ToList().Select(x => _rsurParticipViewer.CreateModel(x));

            return result;
        }

        public RsurParticipBaseInfo GetByParticipCode(string participCode)
        {
            return _rsurParticipRepository.GetAll().Where(p => p.ParticipCode == participCode).ToList()
                                                           .Select(s => _rsurParticipViewer.CreateModel(s)).SingleOrDefault();


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

        public bool Update(RsurParticipBaseInfo model)
        {
            var entity = _rsurParticipRepository.GetAll().SingleOrDefault(x => x.ParticipCode == model.ParticipCode);
            if (entity == null)
                return false;

            entity.Surname = model.Surname;
            entity.Name = model.Name;
            entity.SecondName = model.SecondName;
            entity.Birthday = model.Birthday;
            entity.ClassNumbers = model.ClassNumbers;

            try
            {
                _unitOfWork.Save();
            }
            catch (RetryLimitExceededException)
            {
                return false;
            }

            return true;
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

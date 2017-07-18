using Monit95App.Domain.Core;
using Monit95App.Domain.Interfaces;
using Monit95App.Infrastructure.Business.Interfaces;
using System;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Infrastructure.Business
{
    public class SchoolInfoEditService : ISchoolInfoEditService
    {
        private IGenericRepository<School> _schoolRepository;
        private IGenericRepository<SchoolsEdit> _schoolEditRepository;
        private IUnitOfWork _unitOfWork;
        public SchoolInfoEditService(IGenericRepository<School> schoolRepository, IGenericRepository<SchoolsEdit> schoolEditRepository, IUnitOfWork unitOfWork)
        {
            _schoolRepository = schoolRepository;
            _schoolEditRepository = schoolEditRepository;
            _unitOfWork = unitOfWork;
        }

        public bool AddNameCorrection(string name, string schoolId)
        {
            if (_schoolEditRepository.GetAll().FirstOrDefault(s => s.Id == schoolId) != null)
                return false;

            _schoolEditRepository.Insert(new SchoolsEdit { Id = schoolId, Name = name });
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

        public bool DeleteNameCorrection(string schoolId)
        {
            var correction = _schoolEditRepository.GetAll().FirstOrDefault(s => s.Id == schoolId);
            if (correction == null)
                return false;

            _unitOfWork.DbContext.SchoolsEdits.Remove(correction);

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

        public bool UpdateField(Action<School> setProperty, string schoolId)
        {
            var school = _schoolRepository.GetAll().SingleOrDefault(p => p.Id == schoolId);
            if (school == null)
                return false;

            setProperty(school);
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
    }
}

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
        private IUnitOfWork _unitOfWork;
        public SchoolInfoEditService(IGenericRepository<School> schoolRepository, IUnitOfWork unitOfWork)
        {
            _schoolRepository = schoolRepository;
            _unitOfWork = unitOfWork;
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

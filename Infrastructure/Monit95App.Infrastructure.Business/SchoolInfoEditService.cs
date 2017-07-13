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

        //public bool UpdateEmail(string schoolId, string email)
        //{
        //    var school = _schoolRepository.GetAll().SingleOrDefault(p => p.Id == schoolId);
        //    if (school == null)
        //        return false;

        //    school.Email = email;
        //    try
        //    {
        //        _unitOfWork.Save();
        //    }
        //    catch (RetryLimitExceededException)
        //    {
        //        return false;
        //    }
        //    return true;
        //}

        //public bool UpdateName(string schoolId, string name)
        //{
        //    var school = _schoolRepository.GetAll().SingleOrDefault(p => p.Id == schoolId);
        //    if (school == null)
        //        return false;

        //    school.Name = name;
        //    try
        //    {
        //        _unitOfWork.Save();
        //    }
        //    catch (RetryLimitExceededException)
        //    {
        //        return false;
        //    }
        //    return true;
        //}

        //public bool UpdatePhoneNumbaer(string schoolId, string number)
        //{
        //    throw new NotImplementedException();
        //}

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

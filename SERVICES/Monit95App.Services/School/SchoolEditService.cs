using System;
using System.Data.Entity.Infrastructure;
using System.Linq;
using Monit95App.Domain.Core;
using Monit95App.Domain.Interfaces;
using Monit95App.Services.Interfaces;
using System.Threading.Tasks;
    
namespace Monit95App.Services.School
{
    public class SchoolEditService : ISchoolEditService
    {
        #region Fileds

        private readonly IGenericRepository<Domain.Core.School> _schoolRepository;
        private readonly IGenericRepository<SchoolEdit> _schoolEditRepository;

        #endregion      

        public SchoolEditService(IGenericRepository<Domain.Core.School> schoolRepository, 
                                 IGenericRepository<SchoolEdit> schoolEditRepository)
        {
            _schoolRepository = schoolRepository;
            _schoolEditRepository = schoolEditRepository;            
        }

        #region Services

        public bool DeleteEditTask(string schoolId) //schoolId = schoolEditId
        {

            var correction = _schoolEditRepository.GetById(schoolId);
            if (correction == null)
            {
                return false;
            }
            _schoolRepository.Delete(schoolId);
            _schoolRepository.Save();

            return true;

        }

        public bool AddEditTask(SchoolEdit schoolEdit)
        {

            if (schoolEdit == null)
            {
                return false;
            }

            _schoolEditRepository.Insert(schoolEdit);
            _schoolRepository.Save();

            return true;
        }

        #endregion
    }
}

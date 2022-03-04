using Monit95App.Domain.Interfaces;
using Monit95App.Services.Interfaces;
using Monit95App.Domain.Core.Entities;

namespace Monit95App.Services.School
{
    public class SchoolEditService : ISchoolEditService
    {
        #region Fields

        private readonly IGenericRepository<Domain.Core.Entities.School> _schoolRepository;
        private readonly IGenericRepository<SchoolEdit> _schoolEditRepository;

        #endregion      

        public SchoolEditService(IGenericRepository<Domain.Core.Entities.School> schoolRepository, 
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

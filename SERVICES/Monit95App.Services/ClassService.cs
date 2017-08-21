using Monit95App.Domain.Core;
using Monit95App.Domain.Interfaces;
using System.Collections.Generic;
using System.Linq;
using Monit95App.Services.Interfaces;
using Monit95App.Domain.Core.Entities;

namespace Monit95App.Services
{
    public class ClassService : IClassService
    {        
        private readonly IGenericRepository<Class> _classRepository;

        public ClassService(IGenericRepository<Class> classRepository)
        {            
            _classRepository = classRepository;
        }

        public IEnumerable<Class> GetAll()
        {
            return _classRepository.GetAll().ToList();
        }

        public string GetId(string className)
        {
            var allClasses = GetAll();            
            return allClasses.Where(x => x.Name.TrimEnd().Equals(className.TrimEnd())).Select(x => x.Id).Single();
        }

        public string GetName(string classCode)
        {
            var allClasses = GetAll();
            return allClasses.Where(x => x.Id.TrimEnd().Equals(classCode.TrimEnd())).Select(s => s.Name).Single();
        }
    }
}

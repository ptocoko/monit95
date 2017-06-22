using Monit95App.Domain.Core;
using Monit95App.Domain.Interfaces;
using Monit95App.Services.DTO.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Services.DTO
{
    public class ClassService : IClassService
    {
        private IUnitOfWork _unitOfWork;
        private IGenericRepository<Class> _classRepository;

        public ClassService(IUnitOfWork unitOfWork, IGenericRepository<Class> classRepository)
        {
            _unitOfWork = unitOfWork;
            _classRepository = classRepository;
        }

        public List<Class> GetAll()
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

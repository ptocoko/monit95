using Monit95App.Services.DTO.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Monit95App.Domain.Core;
using Monit95App.Domain.Interfaces;

namespace Monit95App.Services.DTO
{
    public class ClassService : IClassService
    {
        private IUnitOfWork _unitOfWork;
        private IRepositoryV2<Class> _classRepository;

        public ClassService(IUnitOfWork unitOfWork, IRepositoryV2<Class> classRepository)
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
            return allClasses.Where(x => x.Name.TrimEnd().Equals(className)).Select(x => x.Id).Single();
        }
    }
}

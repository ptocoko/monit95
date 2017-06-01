using Monit95App.Domain.Core;
using Monit95App.Domain.Interfaces;
using Monit95App.Infrastructure.Data;
using Monit95App.Infrastructure.Data.Interfaces;
using Monit95App.Models;
using Monit95App.Models.Abstarct;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace Monit95App.Api
{    
    public class ProjectParticipController : ApiController
    {
        private readonly UnitOfWork _unitOfWork;
        private readonly cokoContext _db;     
        private readonly IPParticipCodeCreator _pparticipCodeCreator;
        private readonly IPParticipViewer _pparticipViewer;

        public ProjectParticipController(cokoContext db, IPParticipCodeCreator pparticipCodeCreator, IPParticipViewer pparticipViewer)
        {
            _unitOfWork = new UnitOfWork(db);
            _pparticipCodeCreator = pparticipCodeCreator;
            _pparticipViewer = pparticipViewer;
        }

        public ProjectParticipController()
        {
            _db = new cokoContext();
            _unitOfWork = new UnitOfWork(_db);
            _pparticipCodeCreator = new PParticipCodeCreator(_db);
            _pparticipViewer = new PParticipViewer();
        }
   
        //TODO: необходим automapper           
        //[Route("api/ProjectParticip/GetParticips/{area:int}")]
        public async Task<IEnumerable<PParticipViewModel>> GetByUserName(string userName, bool isAreaRole)
        {
            var allPParticips =  await Task.Run(() => _unitOfWork.ProjectParticips.GetAll());
            IEnumerable<PParticipViewModel> result;

            if (isAreaRole)
                result = allPParticips.Where(x => x.School.AreaCode == int.Parse(userName)).Select(x => _pparticipViewer.CreateViewModel(x));
            else
                result = allPParticips.Where(x => x.SchoolId == userName).Select(x => _pparticipViewer.CreateViewModel(x));
            
            return result;
        }
        //TODO: возвращать нормально
        public async Task<object> PostParticip(ProjectParticip newParticip)
        {
            newParticip.Category = _db.Categories.Find(newParticip.CategId);
            newParticip.NsurSubject = _db.NsurSubjects.Find(newParticip.NSubjectCode);
            newParticip.ProjectCode = 201661;
            newParticip.ParticipCode = _pparticipCodeCreator.FactoryMethod(newParticip);
            _unitOfWork.ProjectParticips.Add(newParticip);
            await Task.Run(() =>_unitOfWork.Save());
                        
            return _pparticipViewer.CreateViewModel(newParticip);
        }
    
        public string GetDParticip(string primaryKey)
        {
            _unitOfWork.ProjectParticips.Delete(primaryKey);
            _unitOfWork.Save();
            return "Yes";
        }
        
    }
}

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
    //[RoutePrefix("/api/ProjectParticip")]
    public class ProjectParticipController : ApiController
    {
        private UnitOfWork _unitOfWork;
        private cokoContext _db;     
        private IPParticipCodeCreator _pparticipCodeCreator;
        private IPParticipViewer _pparticipViewer;

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
        public async Task<IEnumerable<PParticipViewModel>> GetParticips(int areaCode)
        {
            var allPParticips =  await Task.Run(() => _unitOfWork.ProjectParticips.GetAll());
            var areaPParticips = allPParticips.Where(x => x.School.AreaCode == areaCode)
                .Select(x => _pparticipViewer.CreateViewModel(x));
           
            return areaPParticips;
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

        public IEnumerable<ProjectParticip> PutParticip(ProjectParticip item, string code, int pc, int areaId)
        {
            //item.Code = code;
            //item.ProjectCode = pc;
            //if (participRepository.Update(item))
            //{
            //    return participRepository.GetAreaParticips(areaId);
            //}
            //else
            //{
            //    return null;
            //}
            return new List<ProjectParticip>();
        }

        public HttpResponseMessage ooo(int Uid)
        {
            // Employee emp = this.GetEmployee(Uid);
            //if (emp == null)
            //{
            //    throw new HttpResponseException(HttpStatusCode.NotFound);
            //}
            //   _emp.Remove(emp);
            var response = new HttpResponseMessage();
            response.Headers.Add("DeleteMessage", "Succsessfuly Deleted!!!");
            return response;
        }
        public string GetDParticip(string primaryKey)
        {

            _unitOfWork.ProjectParticips.Delete(primaryKey);
            _unitOfWork.Save();
            return "Yes";
        }
        //}
    }
}

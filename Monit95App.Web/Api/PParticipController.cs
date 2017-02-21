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
using System.Web.Http;
using System.Web.Mvc;

namespace Monit95App.Api
{
    public class Product
    {
        public string Name { get; set; }
    }
    public class PParticipController : ApiController
    {
        private UnitOfWork _unitOfWork;
        private cokoContext _db;     
        private IPParticipCodeCreator _pparticipCodeCreator;
        private IPParticipViewer _pparticipViewer;

        public PParticipController(cokoContext db, IPParticipCodeCreator pparticipCodeCreator, IPParticipViewer pparticipViewer)
        {
            _unitOfWork = new UnitOfWork(db);
            _pparticipCodeCreator = pparticipCodeCreator;
            _pparticipViewer = pparticipViewer;
        }

        public PParticipController()
        {
            _db = new cokoContext();
            _unitOfWork = new UnitOfWork(_db);
            _pparticipCodeCreator = new PParticipCodeCreator(_db);
            _pparticipViewer = new PParticipViewer();
        }
        //public PParticipController()
        //    : this(new UnitOfWork(new cokoContext()))
        //{

        //}
        //TODO: необходим automapper

        public IEnumerable<object> GetParticips(int areaCode)
        {
            var allPParticips = _unitOfWork.PParticips.GetAll();
            var areaPParticips = allPParticips.Where(x => x.School.AreaCode == areaCode)
                .Select(x => _pparticipViewer.CreateViewModel(x));
           
            return areaPParticips;
        }
        //TODO: возвращать нормально
        public object PostParticip(ProjectParticip newParticip)
        {            
            newParticip.ProjectCode = 201661;
            newParticip.ParticipCode = _pparticipCodeCreator.FactoryMethod(newParticip);
            _unitOfWork.PParticips.Add(newParticip);
            _unitOfWork.Save();
                        
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

            _unitOfWork.PParticips.Delete(primaryKey);
            _unitOfWork.Save();
            return "Yes";

        }
        //}
    }
}

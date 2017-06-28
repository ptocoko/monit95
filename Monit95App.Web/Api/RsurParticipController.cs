using Monit95App.Domain.Core;
using Monit95App.Infrastructure.Data;
using Monit95App.Infrastructure.Data.Interfaces;
using Monit95App.Infrastructure.Services.Interfaces;
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
    public class RsurParticipController : ApiController
    {
        private readonly UnitOfWork _unitOfWork;
        private readonly cokoContext _db;     
       // private readonly IRsurParticipCodeCreator _pparticipCodeCreator;
        private readonly IRsurParticipViewer _pparticipViewer;

        private readonly IRsurParticipService _rsurParticipService;

        public RsurParticipController(cokoContext db, IRsurParticipCodeCreator pparticipCodeCreator, IRsurParticipViewer pparticipViewer)
        {
            _unitOfWork = new UnitOfWork(db);
       //     _pparticipCodeCreator = pparticipCodeCreator;
            _pparticipViewer = pparticipViewer;
        }

        public RsurParticipController()
        {
            _db = new cokoContext();
            _unitOfWork = new UnitOfWork(_db);
           // _pparticipCodeCreator = new RsurParticipCodeCreator(_db);
            _pparticipViewer = new RsurParticipViewer();
        }

        //[HttpPut]
        //public async Task UpdateParticip(ParticipModel participVM)
        //{
        //    if (!ModelState.IsValid) return;

        //    var particip = await Task.Run(() => _db.ProjectParticips.SingleOrDefault(s => s.ParticipCode == participVM.ParticipCode));
        //    if(particip != null)
        //    {
        //        particip.Birthday = participVM.Birthday?.AddDays(1);
        //        particip.ClassNumbers = participVM.ClassNumbers;
        //        await Task.Run(() => _unitOfWork.Save());
        //    }
        //    else
        //    {
        //        throw new ArgumentException();
        //    }
        //}

        [HttpPut]
        [Route("api/rsurParticips")]
        public async Task<HttpResponseMessage> PutParticip([FromBody]RsurParticipModel model)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Не удалось внести изменения");
            }

            return Request.CreateErrorResponse(HttpStatusCode.OK, "Ресурс успешно обновлен");
            //if (dto != null)
            //{
            //    try
            //    {
            //        await _projectParticipV2Service.UpdateAsync(dto);
            //    }
            //    catch (ArgumentNullException)
            //    {
            //        Request.CreateResponse(HttpStatusCode.Conflict);
            //    }
            //    return Request.CreateResponse(HttpStatusCode.OK);
            //}

            //throw new ArgumentNullException("async Task<HttpResponseMessage> Update(ProjectParticipV2Dto dto)");
        }


        public async Task<object> PostParticip(ProjectParticip newParticip)
        {
            newParticip.Category = _db.Categories.Find(newParticip.CategId);
            newParticip.NsurSubject = _db.NsurSubjects.Find(newParticip.NSubjectCode);
            newParticip.ProjectCode = 201661;
          //  newParticip.ParticipCode = _pparticipCodeCreator.FactoryMethod(newParticip);
            _unitOfWork.ProjectParticips.Add(newParticip);
            await Task.Run(() => _unitOfWork.Save());

            return _pparticipViewer.CreateViewModel(newParticip);
        }
             
        //[Route("api/ProjectParticip/GetParticips/{area:int}")]
        public async Task<IEnumerable<RsurParticipModel>> GetByUserName(string userName, bool isAreaRole)
        {
            var allPParticips =  await Task.Run(() => _unitOfWork.ProjectParticips.GetAll());
            IEnumerable<RsurParticipModel> result;

            if (isAreaRole)
                result = allPParticips.Where(x => x.School.AreaCode == int.Parse(userName)).Select(x => _pparticipViewer.CreateViewModel(x));
            else
                result = allPParticips.Where(x => x.SchoolId == userName).Select(x => _pparticipViewer.CreateViewModel(x));
            
            return result;
        }


        

        public async Task<IEnumerable<IGrouping<string, ParticipResultsViewModel>>> GetParticipResults(string participCode)
        {
            if (String.IsNullOrEmpty(participCode)) return null;

            var res = await Task.Run(() => _db.TestResults.Where(s => s.ParticipTest.ProjectParticip.ParticipCode == participCode).ToList()
                                              .Select(s => _pparticipViewer.CreateResultViewModel(s, participCode))
                                              .GroupBy(x => x.NumberCode).OrderBy(o => o.Key).ToList());
            return res;
        }     

        public string GetDParticip(string primaryKey)
        {
            _unitOfWork.ProjectParticips.Delete(primaryKey);
            _unitOfWork.Save();
            return "Yes";
        }
        
    }
}

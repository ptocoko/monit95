using Monit95App.Domain.Core;
using Monit95App.Infrastructure.Business.Interfaces;
using Monit95App.Infrastructure.Business.Models;
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
        private readonly IRsurParticipViewer _rsurParticipViewer;
        private readonly IRsurParticipService _rsurParticipService;

        public async Task<IEnumerable<RsurParticipModel>> GetByUserName(string userName, bool isAreaRole)
        {
            var allPParticips = await Task.Run(() => _unitOfWork.ProjectParticips.GetAll());
            IEnumerable<RsurParticipModel> result;

            if (isAreaRole)
                result = allPParticips.Where(x => x.School.AreaCode == int.Parse(userName)).Select(x => _rsurParticipViewer.CreateModel(x));
            else
                result = allPParticips.Where(x => x.SchoolId == userName).Select(x => _rsurParticipViewer.CreateModel(x));

            return result;
        }      

        public RsurParticipController()
        {            
            _unitOfWork = new UnitOfWork(new cokoContext());           
            _rsurParticipViewer = new RsurParticipViewer();
        }

        public RsurParticipController(IRsurParticipService rsurParticipService)
        {
            _rsurParticipService = rsurParticipService;
        }

        [HttpPut]
        [Route("api/rsurParticips")]
        public HttpResponseMessage PutParticip([FromBody]RsurParticipModel model)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Не удалось внести изменения");
            }

            _rsurParticipService.Update(model);
            return Request.CreateResponse(HttpStatusCode.OK, "Ресурс успешно обновлен");           
        }


        public async Task<object> PostParticip(ProjectParticip newParticip)
        {
            newParticip.Category = _db.Categories.Find(newParticip.CategId);
            newParticip.NsurSubject = _db.NsurSubjects.Find(newParticip.NSubjectCode);
            newParticip.ProjectCode = 201661;
          //  newParticip.ParticipCode = _pparticipCodeCreator.FactoryMethod(newParticip);
            _unitOfWork.ProjectParticips.Add(newParticip);
            await Task.Run(() => _unitOfWork.Save());

            return _rsurParticipViewer.CreateModel(newParticip);
        }
             
        //[Route("api/ProjectParticip/GetParticips/{area:int}")]
        


        

        public async Task<IEnumerable<IGrouping<string, ParticipResultsViewModel>>> GetParticipResults(string participCode)
        {
            if (String.IsNullOrEmpty(participCode)) return null;

            var res = await Task.Run(() => _db.TestResults.Where(s => s.ParticipTest.ProjectParticip.ParticipCode == participCode).ToList()
                                              .Select(s => _rsurParticipViewer.CreateResultViewModel(s, participCode))
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

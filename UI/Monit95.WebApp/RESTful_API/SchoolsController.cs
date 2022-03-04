using System.Web.Http;

using Monit95App.Services.Interfaces;
using Monit95App.Services.School;
using Monit95App.Web.Services;

// ReSharper disable CheckNamespace
namespace Monit95App.Web.Api
{
    using Monit95App.Services.DTOs;

    [Authorize(Roles = "coko, school")]
    [RoutePrefix("api/schools")]
    public class SchoolsController : ApiController
    {
        #region Dependencies

        private readonly ISchoolService _schoolService;
        private readonly IAccountService _accountService;

        #endregion

        public SchoolsController(ISchoolService schoolService, IAccountService accountService)
        {
            _schoolService = schoolService;
            this._accountService = accountService;
        }

        #region APIs

        [HttpGet]
        [Route("")]
        public IHttpActionResult GetAll()
        {
            return this.Ok(this._schoolService.GetAll());
        }

        [HttpGet]
        [Route("{areaCode:int}")]
        public IHttpActionResult GetByAreaCode([FromUri]int areaCode)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            return Ok(_schoolService.GetByAreaCode(areaCode));
        }

        [HttpPut]
        [Route("{id:length(4)}")]
        public IHttpActionResult Put([FromBody] SchoolDto dto)
        {
            //if (!ModelState.IsValid)
            //{
            //    return BadRequest(ModelState);
            //}

            //return Ok(dto);
            return BadRequest();
        }

        [HttpGet]
        [Route("getInfo")]
        public IHttpActionResult GetInfo([FromUri] string id)
        {
            return Ok(_schoolService.GetModel(id));
        }

        #endregion     
    }
}

using Monit95App.Domain.Core;
using Monit95App.Domain.Interfaces;
using Monit95App.Infrastructure.Data;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Monit95App.Api
{
    public class SchoolController : ApiController
    {
        private UnitOfWork unitOfWork = new UnitOfWork(new cokoContext());

        public SchoolController(UnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;            
        }

        public SchoolController()
        {

        }
       
        public IEnumerable GetSchools(int areaCode)
        {
            var areaSchools = unitOfWork.Schools.GetAreaAll(areaCode).ToList();
            var result = areaSchools.Select(x => new
            {
                id = x.Id,
                idWithName = $"{x.Id} - {x.Name}"
            });

            return result;
        }
    }
}

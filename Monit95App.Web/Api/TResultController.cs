using Monit95App.Domain.Core;
using Monit95App.Infrastructure.Data;
using Monit95App.Models;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Monit95App.Api
{
    public class TResultController : ApiController
    {
        private UnitOfWork _uow;
        public TResultController(UnitOfWork uow)
        {
            _uow = uow;
        }
        public TResultController()
        {
            _uow = new UnitOfWork(new cokoContext());
        }

        //Get for certain area test's results
        public IEnumerable<TestResult> GetOpenTestResultsForArea(int areaCode) //testDateString format is ddMMyyyy
        {
            //var testId = new Guid(testIdString);
            //var testDate = DateTime.ParseExact(testDateString, "ddMMyyyy", CultureInfo.InvariantCulture);
            return _uow.TResults.GetOpenTestResultsForArea(areaCode);
        }

        public TResultViewModel PostTResult()
        {
            return new TResultViewModel();
        }
    }
}

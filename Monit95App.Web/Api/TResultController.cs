using Monit95App.Domain.Core;
using Monit95App.Infrastructure.Data;
using Monit95App.Models;
using Monit95App.Models.Abstarct;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace Monit95App.Api
{
    public class TResultController : ApiController
    {
        private UnitOfWork _uow;
        private ITResultDTOcreator _tresultDTOcreator;
        public TResultController(cokoContext db, ITResultDTOcreator tresultDTOcreator)
        {
            _uow = new UnitOfWork(db);
            _tresultDTOcreator = tresultDTOcreator;
        }
        public TResultController()
        {
            _uow = new UnitOfWork(new cokoContext());
            _tresultDTOcreator = new TResultDTOcreator();
        }

        //Get for certain area test's results
        public async Task<IEnumerable<TResultDTO>> GetOpenTestResultsForArea(int areaCode)
        {          
            var openTestResultsForArea = await Task.Run(() => _uow.TResults.GetOpenTestResultsForArea(areaCode));
            var tresultDTOs = openTestResultsForArea.ToList().Select(x => _tresultDTOcreator.FactoryMethod(x));

            return tresultDTOs;
        }

        public TResultDTO PostTResult()
        {
            return new TResultDTO();
        }
    }
}

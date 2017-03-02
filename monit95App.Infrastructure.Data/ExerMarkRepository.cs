using Monit95App.Domain.Core;
using Monit95App.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Infrastructure.Data
{
    public class ExerMarkRepository : IRepository<ExerMark>
    {
        private cokoContext _db;
        public ExerMarkRepository(cokoContext db)
        {
            _db = db;
        }
        public bool Delete(string id)
        {
            throw new NotImplementedException();
        }

        IEnumerable<ExerMark> IRepository<ExerMark>.GetAll()
        {
            throw new NotImplementedException();
        }

        //TODO: а какая лучшая практика выполнения метода Get
        public ExerMark Get(string id) //e.g.: "201661#873D064B-8039-4255-8FC5-C0CE7F711B59#2017-02-22#2016-206-001#1"
        {
            var idArray = id.Split('&');

            var projectCode = Convert.ToInt32(idArray[0]);
            var testId = idArray[1].ToString();
            var testNumber = Convert.ToInt32(idArray[2]);
            var testDate = DateTime.Parse(idArray[3]).ToShortDateString();
            var participCode = idArray[4];
            var exerNumber = Convert.ToInt32(idArray[5]);

            return _db.ExerMarks.Find(projectCode, testId, testNumber, testDate, participCode, exerNumber);            
        }

        public void Add(ExerMark item)
        {
            throw new NotImplementedException();
        }

        public void Update(ExerMark item)
        {
            throw new NotImplementedException();
        }
    }
}

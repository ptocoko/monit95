using Monit95App.Domain.Core;
using Monit95App.Infrastructure.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Infrastructure.Business
{   
    public class RsurParticipCodeCreator : IRsurParticipCodeCreator
    {
        private cokoContext _db;        
        public RsurParticipCodeCreator(cokoContext db)
        {
            _db = db;            
        }
        public string FactoryMethod(ProjectParticip newPParticip)
        {
            //newPParticip.School = _db.Schools.Find(newPParticip.SchoolId);            

            //var areaPParticips = _db.ProjectParticips.Where(x => x.School.AreaCode == newPParticip.School.AreaCode).ToList();                                              
            //var areaParticipCodes = areaPParticips.Select(x => Int32.Parse(x.ParticipCode.Substring(9, 3)));
            //var validCodes = Enumerable.Range(1, 2000).Except(areaParticipCodes);            
            //var firstValidCode = validCodes.OrderBy(x => x).First().ToString();

            //if (firstValidCode.Length == 1) firstValidCode = "00" + firstValidCode;
            //if (firstValidCode.Length == 2) firstValidCode = "0" + firstValidCode;

            //string newParticipCode = $"2016-{newPParticip.School.AreaCode.ToString()}-{firstValidCode}";

            //return newParticipCode;
            return String.Empty;
        }
    }
}

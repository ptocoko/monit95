﻿using Monit95App.Domain.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OneTwoThreeReporter
{
    public class SchoolProtocolFactory
    {
        private cokoContext _db = new cokoContext();
        SchoolProtocol Create(int projectCode, string schoolId)
        {
            var protocol = new SchoolProtocol();
            protocol.SchoolName = _db.Schools.Find(schoolId).Name;
            protocol.AreaName = _db.Schools.Find(schoolId).Area.Name;

            var participResults = _db.TestResultsV2.Where(x => x.ExerciseMark.ProjectParticipsV2.ProjectCode == projectCode
                                                          && x.ExerciseMark.ProjectParticipsV2.SchoolId == schoolId).ToList();

            foreach(var result in participResults)
            {
                protocol.ParticipProtocols.Add(new ParticipProtocol
                {

                });                    
            }
            
            return protocol;
        }
    }
}

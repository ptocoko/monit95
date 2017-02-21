using Monit95App.Domain.Core;
using Monit95App.Services.Work.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Services.Report
{
    public class ParticipReportModelCreator
    {
        private IMarks iMarks;
        public ParticipReportModelCreator(IMarks iMarks)
        {
            this.iMarks = iMarks;
        }
        public ParticipReportModel FactoryMethod(TestResult result)
        {
            //TODO: add AutoMapper
            var participReportModel = new ParticipReportModel();
            participReportModel.ParticipCode = result.ParticipCode;
            participReportModel.ParticipSNS = $"{result.ProjectParticip.Surname} {result.ProjectParticip.Name}";
            if (!String.IsNullOrEmpty(result.ProjectParticip.SecondName))
            {
                participReportModel.ParticipSNS += result.ProjectParticip.SecondName;
            }
            participReportModel.TestDate = result.TestDate;
            participReportModel.Marks = iMarks.GetMarks(new[] { result.Marks }).Single();
            participReportModel.PrimaryMark = (double)result.PrimaryMark;
            participReportModel.Mark5 = (short)result.Mark5;
            participReportModel.Parts = result.Parts.Split(';').Select(x => Convert.ToDouble(x)).ToList();
            participReportModel.Elements = result.Elements.Split(';').Select(x => Convert.ToDouble(x)).ToList();
            return participReportModel;
        }
    }
}

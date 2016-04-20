using monit95App.Domain.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace monit95App.Domain.Interfaces
{
    public interface IReportRepository: IDisposable // Domain Services
    {
        List<Report> GetReportListForSchool(school _school);
        Report GetReport(string code);

        void Save();

        //void Create(SchoolReport item);
        //void Update(SchoolReport item);
        //void Delete(string code);
    }
}

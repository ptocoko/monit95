using Monit95App.Services.Work.Abstract;
using Monit95App.Services.Work.Concrete;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Services.Work.Abstract
{
    //Создание модели-отчета из данных БД
    public interface ICreateReportFromDB<TEntity, U>
           where TEntity : class
           where U : LRmodel
    {
        SRmodel<U> GreateSchoolReport(List<TEntity> learnerResults);
    }
}

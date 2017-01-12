using Monit95App.Domain.Core;
using Monit95App.Services.Work.Concrete;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Services.Work.Abstract
{
    public class LRmodel //LearnerReportModel
    {
        //данные обучающегося        
        public Learner LearnerInfo { get; set; }
        public string ClassName { get; set; }
        public string TestResult5Name { get; set; } //какая группа на основе тестового балла
        public double? PrimaryMark { get; set; }
        public string ValueArray { get; set; } //баллы за задания = 1;1;0;0;1...
        
        public LRmodel()
        {
            LearnerInfo = new Learner();
        }
    }
}

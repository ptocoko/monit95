using Monit95App.Domain.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Services.Work.Concrete
{
    public class RszkViewModel //Ранжированный список заданий КИМ
    {
        public SchoolBaseInfo SchoolBaseInfo = new SchoolBaseInfo();
        public List<ExerciseExtend> Exercises = new List<ExerciseExtend>();

        public RszkViewModel()
        {                        
        }
    }
}

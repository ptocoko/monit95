using Monit95App.Domain.Core;
using Monit95App.Services.Work.Concrete;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Excel = Microsoft.Office.Interop.Excel;

namespace Monit95App.Services.Work.Abstract
{
    public abstract class RszkVMmanager
    {
        #region abstract
        protected abstract void FormatViewModel(RszkViewModel vm);
        #endregion

        private readonly IMarks iMarks;  
        private readonly List<ExerciseExtend> exercises;
        protected int subjectCode;
            
        public RszkVMmanager(IMarks iMarks, Excel.Range rows, int subjectCode)
        {
            this.iMarks = iMarks;
            this.exercises = ExercisesFactory.Create(rows);            
            this.subjectCode = subjectCode;
        }        

        public RszkViewModel GetViewModel(School school, string[] marksArray)
        {
            RszkViewModel vm = new RszkViewModel
            {
                Exercises = this.exercises.Select(x => (ExerciseExtend)x.Clone()).ToList()
            };

            var actualMarks = iMarks.GetMarks(marksArray); //actualMarks = {"0,5;1;0", "1;2;0" }            
            foreach (var marks in actualMarks)
            {
                var newMarks = marks.Split(';');
                vm.Exercises.ForEach(x =>
                x.LearnerMarks.Add(Convert.ToDouble(newMarks[x.Number - 1])));
            }

            vm.Exercises.ForEach(x => x.Result.Percent = Math.Round(x.LearnerMarks.Sum() / (x.MaxMark * x.LearnerMarks.Count()), 3)); //compute percent                    
            vm.SchoolBaseInfo = CreatorSchoolInfo.CreateBaseVersion(school); //schoolInfo            

            FormatViewModel(vm);

            return vm;
        }        
    }
}

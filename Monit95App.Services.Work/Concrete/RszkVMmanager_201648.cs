using Monit95App.Domain.Core;
using Monit95App.Services.Work.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Excel = Microsoft.Office.Interop.Excel;

namespace Monit95App.Services.Work.Concrete
{
    //201648: РСЗК на основе результатов ОГЭ-2016. Предметы по выбору
    public class RszkVMmanager_201648 : RszkVMmanager 
    {
        public RszkVMmanager_201648(IMarks iMarks, Excel.Range rows, int subjectCode) 
            : base(iMarks, rows, subjectCode)
        {
        }
        protected override void FormatViewModel(RszkViewModel vm)
        {
            switch (this.subjectCode)
            {
                case (3): //минимальный ПБ = 10
                    {
                        vm.Exercises.RemoveAll(x => !x.Level.Contains("Б"));
                        vm.Exercises = vm.Exercises.OrderByDescending(x => x.Result.Percent).Take(12).ToList();
                    }
                    break;
                case (4):
                    {
                        vm.Exercises.RemoveAll(x => !x.Level.Contains("Б"));
                        vm.Exercises = vm.Exercises.OrderByDescending(x => x.Result.Percent).Take(11).ToList();
                    }
                    break;
                case (6):
                    {
                        vm.Exercises.RemoveAll(x => !x.Level.Contains("Б"));
                        vm.Exercises = vm.Exercises.OrderByDescending(x => x.Result.Percent).Take(15).ToList();
                    }
                    break;
                default: break;
            }
        }                               
    }
}

//public RSZKvmManager_201648(List<ExerciseExtend> exercises, int subjectCode = 3)
//{            
//    viewModel = new RSZKviewModel();
//    viewModel.Exercises = exercises;
//    this.subjectCode = subjectCode;
//    FormatExrecises();
//}       
//public RSZKviewModel GetRSZKviewModel(IEnumerable<oge_16_res> subjectResults)
//{            
//    viewModel.Exercises.ForEach(x => x.LearnerMarks.Clear());
//    var markArray = subjectResults.Select(x => x.MarkArray).ToArray();
//    Regex rgx = new Regex(@"(\(\d\))");            
//    foreach (var marks in markArray)
//    {
//        var newMarks = rgx.Replace(marks, "").Split(';'); //"0,5(1);1(1);0(2)"->"0,5;1;0"->{"0,5","1","0"}
//        viewModel.Exercises.ForEach(x =>
//        x.LearnerMarks.Add(Convert.ToDouble(newMarks[x.Number - 1])));
//    }

//    viewModel.Exercises.ForEach(x => x.Result.Percent = Math.Round(x.LearnerMarks.Sum() / (x.MaxMark * x.LearnerMarks.Count()), 3)); //compute percent                    
//    viewModel.SchoolBaseInfo = CreatorSchoolInfo.CreateBaseVersion(subjectResults.First().School); //schoolInfo            

//    return this.viewModel;
//}
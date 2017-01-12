using Monit95App.Services.Work.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Excel = Microsoft.Office.Interop.Excel;

namespace Monit95App.Services.Work.Concrete
{   
    public class ExercisesFactory
    {       
        public List<ExerciseBase> Create(string[] resultsFormat1) //resultsFormat1 - 1(1);1(1);1(2) 
        {            
            double[] resultArray = resultsFormat1.First().Split(new[] { '(', ')', ';' }, StringSplitOptions.RemoveEmptyEntries)
                                                  .Select(double.Parse).ToArray(); //e.g.: "1(1);1(1);1(2)" => { 1,1,1,1,1,2 }  
            List<ExerciseBase> exercises = new List<ExerciseBase>();
            //fill exercises
            int indexMaxValue = 1;
            int currentNumber = 1;
            while (indexMaxValue < resultArray.Count())
            {
                exercises.Add(new ExerciseBase
                {
                    Number = currentNumber,
                    MaxMark = Convert.ToInt32(resultArray[indexMaxValue]),
                });
                indexMaxValue += 2;
                currentNumber++;
            }
            return exercises;
        }
        public List<ExerciseBase> Create2(string[] resultsFormat2) //resultsFormat2 - 1;1;1|1;1;2 
        {
            return new List<ExerciseBase>();
        }
        public static List<ExerciseExtend> Create(Excel.Range rows)
        {
            List<ExerciseExtend> exercises = new List<ExerciseExtend>();
            foreach (Excel.Range row in rows.Rows)
            {
                exercises.Add(new ExerciseExtend
                {
                    Number = Convert.ToInt32(row.Cells[1, 1].Value2.ToString()),
                    SubjectParts = row.Cells[1, 2].Value2.ToString(),
                    SubjectThemes = row.Cells[1, 3].Value2.ToString(),
                    SubjectSkills = row.Cells[1, 4].Value2.ToString(),
                    Level = row.Cells[1, 5].Value2.ToString(),
                    MaxMark = Convert.ToInt32(row.Cells[1, 6].Value2.ToString())
                });
            }
            return exercises;
        }
    }
} 
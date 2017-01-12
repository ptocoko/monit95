using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Excel = Microsoft.Office.Interop.Excel;

namespace Monit95App.Services.Work.Concrete
{
    public class ExerciseManager
    {
        public List<ExerciseBase> GetExerciseList(IEnumerable<string> results) //e.g.: results = { "1(1);1(1);1(2)", "0(1);1(1);0(2)" }; V1(MX1);V2(MX2);Vn(MXn) - V-value, MX-max value 
        {
            List<ExerciseBase> exercises = new List<ExerciseBase>();
            foreach(var result in results)
            {
                double[] resultArray = result.Split(new[] { '(', ')', ';' }, StringSplitOptions.RemoveEmptyEntries) 
                                             .Select(double.Parse).ToArray(); //e.g.: "1(1);1(1);1(2)" => { 1,1,1,1,1,2 }
                int indexValue = 0;
                int indexMaxValue = 1;
                int currentNumber = 1;
                while(indexMaxValue < resultArray.Count())
                {
                    exercises.Add(new ExerciseBase
                    {
                        Number = currentNumber,
                        MaxMark = Convert.ToInt32(resultArray[indexMaxValue]),                       
                    });
                    indexValue += 2;
                    indexMaxValue += 2;
                    currentNumber++;
                }
            }

            return exercises;
        }        
        public List<ExerciseExtend> GetExerciseList(Excel.Range rows)
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

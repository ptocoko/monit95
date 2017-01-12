using Monit95App.Domain.Core;
using Monit95App.Services.Work.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Excel = Microsoft.Office.Interop.Excel;

namespace Monit95App.Services.Work.Concrete.Project201638
{
    //1 оценочная процедуры. Несколько предметов
    public class RSZKmodelManager_201638 
    {     
        private void FormatExrecises()
        {
            switch (model.SubjectCode)
            {
                case (1): FormatExercises_01(); break;
                case (3): FormatExercises_03(); break;
                case (5): FormatExercises_05(); break;
                case (7): FormatExercises_07(); break;
                case (8): FormatExercises_08(); break;
                case (12): FormatExercises_12(); break;
                case (22): FormatExercises_22(); break;
                default: break;
            }
        }   
        private void FormatExercises_01()
        {            
            model.Exercises.RemoveAll(x=>x.Number == 24);
            model.Exercises = model.Exercises.OrderByDescending(x => x.Result.Percent).Take(12).ToList();            
        }
        private void FormatExercises_03()
        {
            model.Exercises[5].Number = 3;
            model.Exercises[6].Number = 5;
            model.Exercises[12].Number = 8;
            model.Exercises[13].Number = 7;
            model.Exercises[14].Number = 10;
            model.Exercises[15].Number = 16;
            model.Exercises[16].Number = 12;
            model.Exercises[17].Number = 13;

            int[] indexToDelete = new int[] { 2, 3, 4, 7, 8, 9, 10, 11, 18, 19, 20, 23, 24, 25, 26 };
            foreach (var idx in indexToDelete.OrderByDescending(x => x))
                model.Exercises.RemoveAt(idx);

            //валидация
            int[] rightNumbers = new int[] { 0, 1, 3, 5, 7, 8, 10, 12, 13, 16, 21, 22 };
            model.Exercises.ForEach(x =>
            {
                if (!rightNumbers.Contains(x.Number))
                {
                    Console.WriteLine("В моделе находится ошибочный номер задания: " + x.Number);                    
                }
            });

            model.Exercises = model.Exercises.OrderByDescending(x => x.Result.Percent).Take(11).ToList();

         
        }
        private void FormatExercises_05()
        {            
            //валидация            
            var rightNumbers = Enumerable.Range(0, 12);
            model.Exercises.ForEach(x =>
            {
                if (!rightNumbers.Contains(x.Number))
                {
                    Console.WriteLine("В моделе находится ошибочный номер задания: " + x.Number);
                }
            });

            model.Exercises = model.Exercises.OrderByDescending(x => x.Result.Percent).Take(8).ToList();
        }
        private void FormatExercises_07()
        {                    
            model.Exercises.RemoveAll(x => !x.Level.Contains("Б"));
            model.Exercises = model.Exercises.OrderByDescending(x => x.Result.Percent).Take(11).ToList();
        }
        private void FormatExercises_08()
        {
            model.Exercises.RemoveAll(x => !x.Level.Contains("Б"));
            model.Exercises = model.Exercises.OrderByDescending(x => x.Result.Percent).Take(13).ToList();
        }
        private void FormatExercises_12()
        {
            model.Exercises.RemoveAt(18);
        }
        private void FormatExercises_22()
        {                                    
            model.Exercises[4].Number = 17;
            model.Exercises[6].Number = 8;
            model.Exercises[7].Number = 9;
            model.Exercises[8].Number = 10;
            model.Exercises[10].Number = 13;
            model.Exercises[11].Number = 7;

            int[] indexToDelete = new int[] { 14, 13, 12, 9, 5 };
            foreach (var idx in indexToDelete.OrderByDescending(x => x))
                model.Exercises.RemoveAt(idx);

            model.Exercises = model.Exercises.OrderByDescending(x => x.Result.Percent).Take(9).ToList();
        }        

        public RSZKviewModel model;
        private List<ExerciseExtend> exercises;
        public RSZKmodelManager_201638(Excel.Range rows) //инициализируем некторые свойства модели 
        {
            model = new RSZKviewModel();
            exercises = new List<ExerciseExtend>();
            int number = 0;            
            foreach (Excel.Range row in rows.Rows)
            {                
                exercises.Add(new ExerciseExtend
                {
                    Number = number++,
                    SubjectParts = row.Cells[1, 1].Value2.ToString(),
                    SubjectThemes = row.Cells[1, 2].Value2.ToString(),
                    SubjectSkills = row.Cells[1, 3].Value2.ToString(),
                    Level = row.Cells[1, 4].Value2.ToString(),                    
                });
            }
        }       
        public void PopulateModel(IEnumerable<idoege2016_res> _subjectResults) //инициализация //метод нуждается в рефакторинге
        {
            // Check _results
            if (_subjectResults.Select(x => x.SubjectCode).Distinct().Count() > 1)
            {
                Console.WriteLine("Ошибка: Результаты больше чем по одному предмету");
                return;
            }

            var _results_s = _subjectResults.Select(x => x.ValueArray).ToArray();
            double[] results_d = _results_s.First().Split(new[] { '(', ')', ';' }, StringSplitOptions.RemoveEmptyEntries)
                                           .Select(double.Parse).ToArray();
            int countTask = results_d.Count() / 2; //3
            if (countTask != exercises.Count())
            {
                Console.WriteLine("ОШИБКА: countTask и Excercises.Count не совпадают");
                return;
            }

            var entity = _subjectResults.First();
            model.SubjectCode = entity.SubjectCode;
            model.schoolBaseInfo.Name = entity.SchoolID;
            model.schoolBaseInfo.AreaName = $"{entity.School.AreaId} - {entity.School.area.AreaName}";
           
            //максимальный балл
            int[] MaxValue = new int[countTask];
            int iResult = 1;
            for (int i = 0; i < countTask; i++)
            {
                MaxValue[i] += Convert.ToInt32(results_d[iResult]);
                iResult += 2;
            }
            //
            List<double> c_taskValueSum = new List<double>(countTask);            
            for (int i = 0; i < countTask; i++) //инициализация  
            {
                c_taskValueSum.Add(0.0);
            }          
                
            foreach (var result in _results_s)
            {
                double[] result_d = result.Split(new[] { '(', ')', ';' }, StringSplitOptions.RemoveEmptyEntries)
                                          .Select(double.Parse).ToArray();
                iResult = 0;
                for (int i = 0; i < countTask; i++)
                {
                    c_taskValueSum[i] += Convert.ToDouble(result_d[iResult]);
                    iResult += 2;
                }
            }
            exercises.ForEach(x =>
            {
                x.Result.Percent = Math.Round(c_taskValueSum[x.Number] / (_results_s.Count() * MaxValue[x.Number]), 3);
            });
            model.Exercises = exercises.Select(x=>(ExerciseExtend)x.Clone()).ToList();

            FormatExrecises();               
        }        
    }
}
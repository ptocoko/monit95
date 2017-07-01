using System;
using System.Linq;

namespace Monit95App.Domain.Work.Concrete
{
    //2_кл_РУ
    public class CreatorLearnerReport 
    {
        //LearnerReport FactoryMethod(Work201615_2_r result)
        //{
        //    LearnerReport lReport = new LearnerReport();

        //    lReport.SNS = (result.surname + " " + result.name).ToUpper();
        //    if(!String.IsNullOrEmpty(result.SecondName))
        //    {
        //        lReport.SNS += (" " + result.SecondName).ToUpper();
        //    }
        //    lReport.SchoolName = result.school.SchoolName;
        //    lReport.ClassName = result.ClassName;
        //    lReport.ValueArray = result.rValueArray;
        //    lReport.Level =  DefineLevel(Convert.ToInt32(result.rTestResult5));
        //    lReport.ElementList = result.rElements1.Split(';').ToList();
        //    return lReport;
        //}

        private string DefineLevel(int number)
        {
            string result = string.Empty;
            switch(number)
            {
                case 2:
                    result = "Ниже базового";
                    break;
                case 3:
                    result = "Базовый";
                    break;
                case 4:
                    result = "Повышенный";
                    break;
                default:
                    break;
            }
            return result;
        }
    }
}

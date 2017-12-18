using Monit95App.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MarksStringConverter
{
    class Program
    {
        static CokoContext context;

        static void Main(string[] args)
        {
            context = new CokoContext();

            var (grade5, egeQuestionValues) = Convert(11005); 
            Console.WriteLine(egeQuestionValues);
            Console.WriteLine(grade5);
            Console.ReadKey();
        }

        static (int grade5, string egeQuestionValues) Convert(int participTestId)
        {
            

            return (grade5, egeQuestionValues);
        }
    }

    
}

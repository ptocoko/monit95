using Monit95App.Infrastructure.Data;
using Monit95App.Services.Rsur.MarksConvert;
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
        static RsurMarksConverter service;

        static void Main(string[] args)
        {
            context = new CokoContext();
            service = new RsurMarksConverter(context);
            Go();
            Console.WriteLine("All done!");
            Console.ReadKey();
        }

        private static void Go()
        {
            Console.WriteLine("1. Сгенерировать EgeQuestionValues по RsurParticipTestId.\n2. Сгенерировать по RsurTestId.\n3. Сгенерировать для нескольких RsurTestId");
            Console.Write("\nВведите номер команды: ");

            switch (Console.ReadLine())
            {
                case "1":
                    break;
                case "2":
                    break;
                case "3":
                    break;
                default:
                    Console.WriteLine("Команда введена некорректно!\n");
                    break;
            }
            Go();
        }
    }
}

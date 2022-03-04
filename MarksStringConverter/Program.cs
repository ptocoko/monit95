using Monit95App.Infrastructure.Data;
using Monit95App.Services.Rsur.MarksConvert;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace MarksStringConverter
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.InputEncoding = Encoding.UTF8;
            Console.OutputEncoding = Encoding.UTF8;

            var context = new CokoContext();
            var service = new RsurMarksConverter(context);
            //Go(service);
            service.GenerateByRsurTestIds(new int[] { 5281 });
            //service.GenerateAndSaveByParticipTestId(64802);
            Console.WriteLine("All done!");
            Console.ReadKey();
        }

        private static void Go(RsurMarksConverter service)
        {
            Console.WriteLine("1. Сгенерировать EgeQuestionValues по RsurParticipTestId.\n2. Сгенерировать по RsurTestId.\n3. Сгенерировать для нескольких RsurTestId");
            Console.Write("\nВведите номер команды: ");

            switch (Console.ReadLine())
            {
                case "1":
                    service.GenerateAndSaveByParticipTestId(WriteMsgAndGetId("Введите ParticipTestId"));
                    break;
                case "2":
                    service.GenerateByRsurTestId(WriteMsgAndGetId("Введите RsurTestId"));
                    break;
                case "3":
                    Console.WriteLine("Введите первый RsurTestId");
                    var rsurTestIds = new List<int>();
                    do
                    {
                        rsurTestIds.Add(WriteMsgAndGetId("Введите RsurTestId"));
                        Console.WriteLine("Желаете добавить еще RsurTestId? (y - да; n - нет)");
                    }
                    while (Console.ReadKey().Key == ConsoleKey.Y);
                    service.GenerateByRsurTestIds(rsurTestIds.ToArray());
                    break;
                default:
                    Console.WriteLine("Команда введена некорректно!\n");
                    break;
            }
            //Go();
        }
        
        private static int WriteMsgAndGetId(string message)
        {
            Console.Write($"\n{message}: ");
            string participTestId = Console.ReadLine().Trim();
            if (int.TryParse(participTestId, out int result))
            {
                return result;
            }
            else
            {
                Console.WriteLine("Значение не валидно! Повторите ввод.");
                return WriteMsgAndGetId(message);
            }
        }
    }
}

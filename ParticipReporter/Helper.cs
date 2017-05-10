using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ParticipReporter
{
    public static class Helper
    {
        public static string GetHeader(string fullName)
        {
            return $"<html><head><title>{fullName}</title><meta charset=\"UTF-8\"><link rel=\"stylesheet\" type=\"text/css\" href=\"../bootstrap/css/bootstrap.css\"></head><body class=\"container\"><h2>{fullName}</h2>";
        }

        public static string GetFooter()
        {
            return $"</body></html>";
        }

        public static string GetTableHeader()
        {
            return "<table class=\"table table-bordered\"><tr><th>Дата тестирования</th><th>Первичный балл</th><th>Оценка</th><th>Баллы по заданиям</th></tr>";
        }

        public static string GetResultRow(DateTime testDate, double primaryMark, int grade5, string marks)
        {
            return $"<tr><td>{testDate.ToShortDateString()}</td><td>{primaryMark}</td><td>{grade5}</td><td>{marks.Split(new char[] { '|' })[0]}</td></tr>";
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ParticipReporter.Builders
{
    public class _9_11Builder : IHtmlBuilder
    {
        public string GetElementsSection(IEnumerable<QuestionsDto> questionsDto)
        {
            StringBuilder elementsHtml = new StringBuilder();

            elementsHtml.Append("<table class=\"result-table\">");

            elementsHtml.Append($"<tr><th colspan=\"3\" class=\"table-header\">Выполнение разделов элементов содержания</th></tr>");

            elementsHtml.Append($"<tr><th style=\"width: 120px\">код раздела элемента содержания</th><th>раздел элементов содержания</th><th>выполнение</th></tr>");

            foreach (var questionDto in questionsDto)
            {
                elementsHtml.Append($"<tr><td style=\"text-align: center\">{ questionDto.Name }</td><td>{ questionDto.ElementName }</td><td style=\"background-color: { GetGrade100Color(questionDto.Grade100) }; width: 120px; text-align: center\">{ questionDto.Grade100 }%</td></tr>");
            }

            elementsHtml.Append("</table>");

            return elementsHtml.ToString();
        }

        public string GetHeading(HeadingDto heading)
        {
            return $@"<p class='coko-text'>центр оценки качества образования</p>
                      <div style='text-align:center; font-size:20pt; margin-top:15px; margin-bottom:10px;'>
                        <div>КАРТА</div>
                        <div>диагностики учебных достижений</div>
                    </div>
                    <table class='heading-table'>
                        <tr><td>ФИО:</td><td>{ heading.Fio }</td></tr>
                        <tr><td>Образовательная организация:</td><td>{ heading.SchoolName }</td></tr>
                        <tr><td>Класс:</td><td>{ heading.ClassName }</td></tr>
                        <tr><td>Дата тестирования:</td><td>{ heading.TestDate }</td></tr>
                    </table>";
        }

        public string GetOverviewSection(OverviewDto overview)
        {
            var overviewHtml = new StringBuilder();

            overviewHtml.Append("<table class=\"result-table\">");

            overviewHtml.Append("<tr><th colspan=\"3\" class=\"table-header\">Выполнение работы</th></tr>");

            overviewHtml.Append("<tr><th>наименование предмета</th><th>первичный балл</th><th>статус выполнения</th></tr>");

            overviewHtml.Append($"<tr>" +
                $"<td style=\"text-align: center\">{ overview.TestName }</td>" +
                $"<td style=\"text-align: center\">{ overview.PrimaryMark }</td>" +
                $"<td style=\"background-color: { GetGrade5Color(overview.Grade5) }; text-align: center\"><b>{ overview.GradeStr }</b></td>" +
            $"</tr>");

            overviewHtml.Append("</table>");

            return overviewHtml.ToString();
        }

        private string GetGrade100Color(int grade100)
        {
            if (grade100 >= 65)
                return "green";
            else if (grade100 < 65 && grade100 >= 30)
                return "yellow";
            else if (grade100 < 30)
                return "red";
            else
                throw new ArgumentException();
        }

        private string GetGrade5Color(int grade5)
        {
            if (grade5 == 5)
                return "green";
            else if (grade5 == 4)
                return "lightgreen";
            else if (grade5 == 3)
                return "yellow";
            else if (grade5 == 2)
                return "red";
            else
                throw new ArgumentException();
        }
    }
}

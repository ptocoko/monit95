using Monit95App.Domain.Core;
using Monit95App.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ParticipReporter
{
    public class HtmlBuilder
    {
        private readonly HeadingDto heading;
        private readonly OverviewDto overview;
        private readonly IEnumerable<QuestionsDto> questionsDto;

        //static int _headerColSpan;
        //static int _currentMarksColSpan;

        public HtmlBuilder(ReportDto reportDto)
        {
            heading = reportDto.HeadingDto;
            overview = reportDto.OverviewDto;
            questionsDto = reportDto.QuestionsDto;
        }
        
        public string GetReport()
        {
            return $@"<html>
                        <head>
                            <title>Результаты</title>
                            <meta charset='UTF-8'>
                            { GetStyles() }
                        </head>
                        <body>
                            { GetHeading() }
                            { GetOverviewSection() }
                            { GetElementsSection() }
                        </body>
                    </html>";
        }
        
        #region oldCode
        //public static string GetFooter()
        //{
        //    return $"</body></html>";
        //}

        //private static string GetCurrentMarksSection(List<ParticipResultDto> results)
        //{
        //    string result;

        //    if(results.Count() > 1)
        //    {
        //        result = $@"<tr><th class='general-header' colspan='{_headerColSpan}'>Баллы</th></tr>
        //                    <tr><th colspan='{_currentMarksColSpan}'></th>";
        //        for(int i=0; i<results.Count; i++)
        //            result += $"<th align='center'>срез №{i+1}</th>";
        //        result += "</tr>\n";

        //        result += $"<tr><td align='right' colspan='{_currentMarksColSpan}'>Первичный балл:</td>";
        //        for (int i = 0; i < results.Count; i++)
        //            result += $"<td align='center'>{results[i].PrimaryMark}</td>";
        //        result += "</tr>\n";

        //        result += $"<tr><td align='right' colspan='{_currentMarksColSpan}'>Отметка:</td>";
        //        for (int i = 0; i < results.Count; i++)
        //            result += $"<td align='center'>{results[i].Grade5}</td>";
        //        result += "</tr>\n";
        //    }
        //    else
        //        result = $@"<tr><th class='general-header' colspan='{_headerColSpan}'>Баллы</th></tr>
        //                <tr><td colspan='2'>Баллы за задания:</td><td colspan='{_currentMarksColSpan}'>{results.First().Marks}</td></tr>
        //                <tr><td colspan='2'>Первичный балл:</td><td colspan='{_currentMarksColSpan}'>{results.First().PrimaryMark}</td></tr>
        //                <tr><td colspan='2'>Отметка:</td><td colspan='{_currentMarksColSpan}'>{results.First().Grade5}</td></tr>";

        //    return result;
        //}
        #endregion
        
        private string GetHeading()
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
                        <tr><td>Предмет:</td><td>{ heading.TestName }</td></tr>
                        <tr><td>Дата тестирования:</td><td>{ heading.TestDate }</td></tr>
                    </table>";
        }
        
        private string GetOverviewSection()
        {
            var overviewHtml = new StringBuilder();

            overviewHtml.Append("<table class=\"result-table\">");

            overviewHtml.Append("<tr><th colspan=\"2\" class=\"table-header\">Выполнение работы</th></tr>");

            overviewHtml.Append($"<tr><td>Выполнено <b>{ overview.DoneGeneralTasks }</b> из <b>{ overview.AllGeneralTasks }</b> основных заданий*</td><td rowspan=\"2\" style=\"background-color: { GetGrade5Color(overview.Grade5) }\">{ overview.GradeStr }</td></tr>");

            overviewHtml.Append($"<tr><td>Получено <b>{ overview.AdditionalTasksPoints }</b> из <b>{ overview.MaxAdditionalTasksPoints }</b> баллов за дополнительные задания</td></tr>");

            if (overview.FirstClassGrade5 != null && overview.FirstClassGradeStr != null)
            {
                overviewHtml.Append($"<tr><td>Результат диагностики в первом классе</td><td style=\"background-color: { GetGrade5Color(Convert.ToInt32(overview.FirstClassGrade5.Value)) }\">{ overview.FirstClassGradeStr }</td></tr>");
            }

            overviewHtml.Append("</table>");

            overviewHtml.Append("<p class=\"footnote\">* - выполненными считаются задания, за которые учащийся получил хотя бы 1 балл</p>");

            return overviewHtml.ToString();

            #region oldCode
            //string result = $"<tr><th class='general-header' colspan='{_headerColSpan}'>Освоение разделов, проверяемых заданиями КИМ</th></tr>";
            //if (results.Count() == 1)
            //{
            //    result += "<tr><th>код</th><th>номера заданий</th><th>раздел</th><th>% вып.</th></tr>";
            //    for (int i = 0; i < partsDesc.Count; i++)
            //        result += $@"<tr><td align='center'>{partsDesc[i].Code}</td><td>{partsDesc[i].ExerNames}</td><td>{partsDesc[i].Name}</td><td align='center' style='background-color:{GetGradeColor(results.First().PartsResults[i])}'>{results.First().PartsResults[i]}%</td></tr>";
            //}
            //else if (results.Count == 2)
            //{
            //    result += "<tr><th>код</th><th>номера заданий</th><th>раздел</th>";
            //    for (int i = 0; i < results.Count; i++)
            //        result += $"<th>срез №{i + 1}</th>";
            //    result += "</tr>\n";

            //    for(int i=0; i<partsDesc.Count; i++)
            //    {
            //        result += $"<tr><td align='center'>{partsDesc[i].Code}</td><td>{partsDesc[i].ExerNames}</td><td>{partsDesc[i].Name}</td>";
            //        for(int j = 0; j<results.Count; j++)
            //        {
            //            result += $"<td align='center' style='background-color:{GetGradeColor(results[j].PartsResults[i])}'>{results[j].PartsResults[i]}%</td>";
            //        }
            //        result += "</tr>\n";
            //    }
            //}
            //else
            //{
            //    result += "<tr><th>код</th><th>раздел</th>";
            //    for (int i = 0; i < results.Count; i++)
            //        result += $"<th>срез №{i + 1}</th>";
            //    result += "</tr>\n";

            //    for (int i = 0; i < partsDesc.Count; i++)
            //    {
            //        result += $"<tr><td align='center'>{partsDesc[i].Code}</td><td>{partsDesc[i].Name}</td>";
            //        for (int j = 0; j < results.Count; j++)
            //        {
            //            result += $"<td align='center' style='background-color:{GetGradeColor(results[j].PartsResults[i])}'>{results[j].PartsResults[i]}%</td>";
            //        }
            //        result += "</tr>\n";
            //    }
            //}

            //return result;
            #endregion
        }

        private string GetElementsSection()
        {
            StringBuilder elementsHtml = new StringBuilder();

            elementsHtml.Append("<table class=\"result-table\">");

            elementsHtml.Append($"<tr><th colspan=\"3\" class=\"table-header\">Задания</th></tr>");

            elementsHtml.Append($"<tr><th>Номер задания</th><th>Проверяемые умения</th><th>Выполнение</th></tr>");
            
            foreach (var questionDto in questionsDto)
            {
                elementsHtml.Append($"<tr><td style=\"text-align: center\">{ questionDto.Name }</td><td>{ questionDto.ElementName }</td><td style=\"background-color: { GetGrade100Color(questionDto.Grade100) }; width: 120px; text-align: center\">{ questionDto.Grade100 }%</td></tr>");
            }

            elementsHtml.Append("</table>");

            return elementsHtml.ToString();

            #region oldCode
            //string result = $"<tr><th class='general-header' colspan='{_headerColSpan}'>Освоение элементов содержаний (темы), проверяемых заданиями КИМ</th></tr>";
            //if (results.Count() == 1)
            //{
            //    result += "<tr><th>код</th><th>номера заданий</th><th>элемент содержания</th><th>% вып.</th></tr>";
            //    for (int i = 0; i < elementsDesc.Count; i++)
            //        result += $"<tr><td align='center'>{elementsDesc[i].Code}</td><td>{elementsDesc[i].ExerNames}</td><td>{elementsDesc[i].Name}</td><td align='center' style='background-color:{GetGradeColor(results.First().ElementsResults[i])}'>{results.First().ElementsResults[i]}%</td></tr>";
            //}
            //else if(results.Count == 2)
            //{
            //    result += "<tr><th>код</th><th>номера заданий</th><th>элемент содержания</th>";
            //    for (int i = 0; i < results.Count; i++)
            //        result += $"<th>срез №{i + 1}</th>";
            //    result += "</tr>\n";

            //    for(int i = 0; i<elementsDesc.Count; i++)
            //    {
            //        result += $"<tr><td align='center'>{elementsDesc[i].Code}</td><td>{elementsDesc[i].ExerNames}</td><td>{elementsDesc[i].Name}</td>";
            //        for (int j = 0; j < results.Count; j++)
            //            result += $"<td align='center' style='background-color:{GetGradeColor(results[j].ElementsResults[i])}'>{results[j].ElementsResults[i]}%";
            //        result += "</tr>\n";
            //    }
            //}
            //else
            //{
            //    result += "<tr><th>код</th><th>элемент содержания</th>";
            //    for (int i = 0; i < results.Count; i++)
            //        result += $"<th>срез №{i + 1}</th>";
            //    result += "</tr>\n";

            //    for (int i = 0; i < elementsDesc.Count; i++)
            //    {
            //        result += $"<tr><td align='center'>{elementsDesc[i].Code}</td><td>{elementsDesc[i].Name}</td>";
            //        for (int j = 0; j < results.Count; j++)
            //            result += $"<td align='center' style='background-color:{GetGradeColor(results[j].ElementsResults[i])}'>{results[j].ElementsResults[i]}%";
            //        result += "</tr>\n";
            //    }
            //}

            //return result;
            #endregion
        }

        private string GetStyles()
        {
            return @"<style>
             body {
                width: 700px;
                font-size: 10pt;
                font-family: 'Segoe UI', 'sans-serif';
                margin-right: auto;
                margin-left: auto;
            }
            .coko-text{
                background-color: #437fda;
                color: white;
                text-transform: uppercase;
                font-size: 10pt;
                font-weight: bold;
                text-align: center;
                padding: 3px;
            }
            .footnote{
                font-size: 8pt;
                font-style: italic;
            }
            table {
                width: 100%;
                border-collapse: collapse;
                margin-top: 25px;
            }
            table th {
                text-align: center;
                background: #c4e3f3;
                padding: 5px;
                border: 1px solid black;
            }
            table td {
                padding: 5px;
                border: 1px solid black;
            }
            .table-header{
                border: none;
                background-color: white;
                font-weight: normal;
            }
            .heading-table{
                border: none;
                width: 80%;
            }
            .heading-table td{
                border: none;
                padding: 15px;
                padding-left: 0px;
            }
        </style>";
        }

        #region oldCode
        //private static void SetColSpans(int resultsCount)
        //{
        //    if(resultsCount == 1)
        //    {
        //        _headerColSpan = resultsCount + 3;
        //        _currentMarksColSpan = resultsCount + 1;
        //    }
        //    else if (resultsCount == 2)
        //    {
        //        _headerColSpan = resultsCount + 3;
        //        _currentMarksColSpan = resultsCount + 1;
        //    }
        //    else if (resultsCount > 2)
        //    {
        //        _headerColSpan = resultsCount + 2;
        //        _currentMarksColSpan = 2; 
        //    }
        //    else
        //    {
        //        throw new ArgumentException("отсутствуют результаты для обработки");
        //    }
        //}
        #endregion

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

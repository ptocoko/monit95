using Monit95App.Domain.Core;
using Monit95App.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ParticipReporter
{
    public static class HtmlBuilder
    {
        static int _headerColSpan;
        static int _currentMarksColSpan;
        
        public static string GetReportHeader(string fio, string testName, string className, DateTime testDate)
        {
            return $"<html><head><title>Результаты</title><meta charset='UTF-8'>{ GetStyles() }</head><body>{ GetCaption(fio, testName, className, testDate) }";
        }

        public static string GetTable(List<ParticipResultDto> results, List<DescriptionDto> partsDesc, List<DescriptionDto> elementsDesc)
        {
            SetColSpans(results.Count);

            string res = GetTableStart() + GetTableHeader() + GetCurrentMarksSection(results) + GetPartsSection(results, partsDesc) + GetElementsSection(results, elementsDesc) + "</table>";

            return res;
        }

        public static string GetFooter()
        {
            return $"</body></html>";
        }

        private static string GetTableStart()
        {
            return "<table align='center' class='result-table'>";
        }

        private static string GetTableHeader()
        {
            return "<tr><th>Элемент содержания</th><th>Балл</th><th>Макс. балл</th></tr>";
        }

        private static string GetCurrentMarksSection(List<ParticipResultDto> results)
        {
            string result;

            if(results.Count() > 1)
            {
                result = $@"<tr><th class='general-header' colspan='{_headerColSpan}'>Баллы</th></tr>
                            <tr><th colspan='{_currentMarksColSpan}'></th>";
                for(int i=0; i<results.Count; i++)
                    result += $"<th align='center'>срез №{i+1}</th>";
                result += "</tr>\n";

                result += $"<tr><td align='right' colspan='{_currentMarksColSpan}'>Первичный балл:</td>";
                for (int i = 0; i < results.Count; i++)
                    result += $"<td align='center'>{results[i].PrimaryMark}</td>";
                result += "</tr>\n";

                result += $"<tr><td align='right' colspan='{_currentMarksColSpan}'>Отметка:</td>";
                for (int i = 0; i < results.Count; i++)
                    result += $"<td align='center'>{results[i].Grade5}</td>";
                result += "</tr>\n";
            }
            else
                result = $@"<tr><th class='general-header' colspan='{_headerColSpan}'>Баллы</th></tr>
                        <tr><td colspan='2'>Баллы за задания:</td><td colspan='{_currentMarksColSpan}'>{results.First().Marks}</td></tr>
                        <tr><td colspan='2'>Первичный балл:</td><td colspan='{_currentMarksColSpan}'>{results.First().PrimaryMark}</td></tr>
                        <tr><td colspan='2'>Отметка:</td><td colspan='{_currentMarksColSpan}'>{results.First().Grade5}</td></tr>";

            return result;
        }

        private static string GetPartsSection(List<ParticipResultDto> results, List<DescriptionDto> partsDesc)
        {
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

        private static string GetElementsSection(IEnumerable<IGrouping<string, ElementsDto>> groupingElementsDto)
        {
            StringBuilder elementsHtml = new StringBuilder();

            foreach (var elementsDto in groupingElementsDto)
            {
                elementsHtml.Append($"<tr><th colspan=\"2\">{ elementsDto.Key }</th></tr>");

                foreach (var elementDto in elementsDto)
                {
                    elementsHtml.Append($"<tr><td>{ elementDto.ElementName }</td><td style=\"background-color: { GetGradeColor(elementDto.Grade100) }\">{ elementDto.Grade100 }%</td></tr>");
                }
            }

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

        private static string GetStyles()
        {
            return @"<style>
            body {
                padding-right: 15px;
                padding-left: 15px;
                margin-right: auto;
                margin-left: auto;
            }
            .result-table {
                width: 80%;
                border-collapse: collapse;
            }
            .result-table .general-header {
                text-align: center;
                background: #005fff;
                color: white;
                padding: 5px;
                border: 1px solid black;
            }
            .result-table th {
                text-align: center;
                background: #c4e3f3;
                padding: 5px;
                border: 1px solid black;
            }
            .result-table td {
                padding: 5px;
                border: 1px solid black;
            }
            .header-table{
                width: 80%;
                margin-bottom: 10px;
            }
            .header-table td{
                padding: 15px;
                padding-left: 0px;
                border-width: 2px;
            }
        </style>";
        }

        private static string GetCaption(string fio, string testName, string className, DateTime testDate)
        {
            return $@"<div style='text-align:center; font-size:20pt; margin-top:50px; margin-bottom:20px;'>
                        <div>КАРТА</div>
                        <div>диагностики учебных достижений 1, 2 и 3 классов</div>
                    </div>
                    <table align='center' class='header-table'>
                        <tr><td>ФИО:</td><td>{ fio }</td></tr>
                        <tr><td>Образовательная организация:</td><td style = 'border-bottom-style:dashed'></td></tr>
                        <tr><td>Предмет:</td><td>{ testName }</td></tr>
                        <tr><td>Класс:</td><td>{ className }</td></tr>
                        <tr><td>Дата тестирования:</td><td>{ testDate.ToShortDateString() }</td></tr>
                    </table>";
        }

        private static void SetColSpans(int resultsCount)
        {
            if(resultsCount == 1)
            {
                _headerColSpan = resultsCount + 3;
                _currentMarksColSpan = resultsCount + 1;
            }
            else if (resultsCount == 2)
            {
                _headerColSpan = resultsCount + 3;
                _currentMarksColSpan = resultsCount + 1;
            }
            else if (resultsCount > 2)
            {
                _headerColSpan = resultsCount + 2;
                _currentMarksColSpan = 2; 
            }
            else
            {
                throw new ArgumentException("отсутствуют результаты для обработки");
            }
        }

        private static string GetGradeColor(int grade)
        {
            if (grade >= 65)
                return "green";
            else if (grade < 65 && grade >= 30)
                return "yellow";
            else if (grade < 30)
                return "red";
            else
                throw new ArgumentException();
        }
    }

    public class ElementsDto
    {
        public string ElementName { get; set; }
        public int Grade100 { get; set; }
    }
}

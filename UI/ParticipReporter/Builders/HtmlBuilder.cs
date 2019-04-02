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
        private readonly IHtmlBuilder htmlBuilder;

        //static int _headerColSpan;
        //static int _currentMarksColSpan;

        public HtmlBuilder(ReportDto reportDto, IHtmlBuilder htmlBuilder)
        {
            heading = reportDto.HeadingDto;
            overview = reportDto.OverviewDto;
            questionsDto = reportDto.QuestionsDto;
            this.htmlBuilder = htmlBuilder;
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
                            { htmlBuilder.GetHeading(heading) }
                            { htmlBuilder.GetOverviewSection(overview) }
                            { htmlBuilder.GetElementsSection(questionsDto) }
                        </body>
                    </html>";
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
                font-weight: bold;
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

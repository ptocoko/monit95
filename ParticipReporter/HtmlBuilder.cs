using Monit95App.Domain.Core;
using Monit95App.Services.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ParticipReporter
{
    public static class HtmlBuilder
    {
        public static string GetHeader(string participCode, string blockName, DateTime testDate)
        {
            return $"<html><head><title>Результаты</title><meta charset='UTF-8'>{getStyles()}</head><body>{getCaption(participCode, blockName, testDate)}";
        }

        public static string GetTable(List<ParticipResultDto> results)
        {
            string res = getTableHeader() + getCurrentMarksSection(results) + "</table>";

            return res;
        }

        public static string GetFooter()
        {
            return $"</body></html>";
        }

        private static string getTableHeader()
        {
            return "<table align='center' class='result-table'>";
        }

        private static string getCurrentMarksSection(List<ParticipResultDto> results)
        {
            if(results.Count() > 1)
            {
                throw new NotImplementedException();
            }
            else
                return $@"<tr><th colspan='4'>Баллы</th></tr>
                        <tr><td colspan='2'>Баллы за задания:</td><td colspan='2'>{results.First().Marks}</td></tr>
                        <tr><td colspan='2'>Первичный балл:</td><td colspan='2'>{results.First().PrimaryMark}</td></tr>
                        <tr><td colspan='2'>Отметка:</td><td colspan='2'>{results.First().Grade5}</td></tr>";
        }

        private static string getStyles()
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
            .result-table th {
                text-align: center;
                background: #ccc;
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

        private static string getCaption(string participCode, string blockName, DateTime testDate)
        {
            return $@"<div style='text-align:center; font-size:20pt; margin-top:50px; margin-bottom:20px;'>
                        <div>КАРТА</div>
                        <div>диагностики предметной компетенции учителя</div>
                    </div>
                    <table align='center' class='header-table'>
                        <tr><td style = 'width:30%'>Код участника:</td><td>{participCode}</td></tr>
                        <tr><td>ФИО:</td><td style = 'border-bottom-style:dashed'></td></tr>
                        <tr><td>Образовательная организация:</td><td style = 'border-bottom-style:dashed'></td></tr>
                        <tr><td>Блок:</td><td>{blockName}</td></tr>
                        <tr><td>Дата тестирования:</td><td>{testDate.ToShortDateString()}</td></tr>
                    </table>";
        }
    }
}

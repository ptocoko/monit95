using Monit95App.Services.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Services
{
    public class SchoolParticipReporter
    {
        public byte[] GetClassParticipReportBytes(ClassParticipReportDto particip, string[] maxMarks, string testDate)
        {
            string htmlText = GetReportHtml(particip, maxMarks, testDate);
            return GetPdfBytesOfHtml(htmlText);
        }

        public string GetReportHtml(ClassParticipReportDto particip, string[] maxMarks, string testDate)
        {
            return $@"
<!doctype html>
<html>
    <head>
        <meta charset='utf-8'>
        <link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css' integrity='sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u' crossorigin='anonymous'>
        <style type='text/css'>
            " + @".myhead {
                background-color: #4682b4;
            }

            .myhead p {
                color: white;
                font-weight: 600;
                text-align: center;
            }" + $@"
        </style>
    </head>
<body>
<div class='classParticip-reportContainer center-block' style='width:750px'>
    <div style='margin:20px'>
        <div class='myhead'>
            <p>ЦЕНТР ОЦЕНКИ КАЧЕСТВА ОБРАЗОВАНИЯ</p>
        </div>
        <div class='row sub-head'>
            <div class='col-sm-2 col-xs-2'>
                <img height='105' src='https://uyjeta-dm2306.files.1drv.com/y4mn6i6Plh3bVoG16vbnImQcyIoIB_3oGYpEg14hf1nYy-mjCAVxQO0Ni5K8cDg6L90ZoH1eZvF4-ZV8VeJvWlcpVZv70UjhO7ONznw8lPcPkTwSnheJEQAD-9TXh78kEiNPeks847xCtJgZGkZL6ud0W_m83rhwq0ngLf7bDveRtpYCcxRHwR7LmQBBvMTqeKIVUVWKxJ6lFbkrkzD2EIGbA' />
            </div>
            <div class='col-sm-10 col-xs-10'>
                <h3><b>КАРТА ГОТОВНОСТИ К ОБУЧЕНИЮ</b></h3>
            </div>
        </div>
        <br />
        <div class='row particip-about'>
            <p class='col-xs-4 col-sm-4'>ФИО:</p>
            <p class='col-xs-8 col-sm-8 text-uppercase'>{particip.Fio}</p>
            <br />
            <br />
            <p class='col-xs-4 col-sm-4'>Образовательная организация:</p>
            <p class='col-xs-8 col-sm-8 text-uppercase'>{particip.SchoolName}</p>
            <br />
            <br />
            <p class='col-xs-4 col-sm-4'>Класс:</p>
            <p class='col-xs-8 col-sm-8'>{particip.ClassName}</p>
            <br />
            <br />
            <p class='col-xs-4 col-sm-4'>Дата тестирования:</p>
            <p class='col-xs-8 col-sm-8'>{testDate}</p>
            <br />
        </div>
        <br />
        <br />

        <table style='width:710px' class='table table-bordered'>
            <caption class='text-center' style='color:black'>Выполнение работы</caption>
            <tr>
                <td>
                    <p class='col-xs-4 col-sm-4'>Первичный балл:</p>
                    <p class='col-xs-8 col-sm-8'>{particip.PrimaryMark}</p>
                </td>
            </tr>
            <tr>
                <td>
                    <p class='col-xs-4 col-sm-4'>Группа:</p>
                    <p class='col-xs-8 col-sm-8'>{particip.GradeGroup}</p>
                </td>
            </tr>
        </table>

        <br />
        <br />
        <table style='width:710px' class='table table-bordered'>
            <caption class='text-center' style='color:black'>Выполнение заданий</caption>
            <tr>
                <th width='60px'>№ п/п</th>
                <th>Наименование задания</th>
                <th class='text-center'>Диагностируемые качества</th>
                <th>Балл за задание</th>
                <th>Макс. балл за задание</th>
            </tr>
            <tr>
                <td>1</td>
                <td>""Графические ряды""</td>
                <td>
                    - перцептивно-двигательные навыки;
                    <br />- уровень внимания;
                    <br />- самоконтроль, планирование и организация произвольной деятельности.
                </td>
                <td>{particip.Marks[0]}</td>
                <td>{maxMarks[0]}</td>
            </tr>
            <tr>
                <td>2</td>
                <td>""Узор из точек""</td>
                <td>
                    - ориентация на плоскости;
                    <br />- восприятие зрительного образа.
                </td>
                <td>{particip.Marks[1]}</td>
                <td>{maxMarks[1]}</td>
            </tr>
            <tr>
                <td>3</td>
                <td>""Рисунок человека""</td>
                <td>
                    - сформированность первычных представлений о мире;
                    <br />- ориентация в пространстве.
                </td>
                <td>{particip.Marks[2]}</td>
                <td>{maxMarks[2]}</td>
            </tr>
            <tr>
                <td>4</td>
                <td>""Дорожка звуков""</td>
                <td>- уровень и особенности развития фонетического слуха.</td>
                <td>{particip.Marks[3]}</td>
                <td>{maxMarks[3]}</td>
            </tr>
            <tr>
                <td>5</td>
                <td>Моторика</td>
                <td>- способность выполнять мелкие и точные движения кистями и пальцами рук.</td>
                <td>{particip.Marks[3]}</td>
                <td>{maxMarks[3]}</td>
            </tr>
        </table>
    </div>
</div>
</body>
</html>";
        }

        public byte[] GetPdfBytesOfHtml(string htmlContent)
        {
            var generator = new NReco.PdfGenerator.HtmlToPdfConverter();
            generator.LowQuality = true;
            return generator.GeneratePdf(htmlContent);
        }

    }
}

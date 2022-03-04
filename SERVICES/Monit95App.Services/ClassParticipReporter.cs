using Monit95App.Services.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Services
{
    public class ClassParticipReporter
    {
        public byte[] GetClassParticipReportBytes(FirstClassReportDto particip, string[] maxMarks)
        {
            string htmlText = GetReportHtml(particip, maxMarks);
            return GetPdfBytesOfHtml(htmlText);
        }

        public string GetReportHtml(FirstClassReportDto particip, string[] maxMarks)
        {
            //string firstMarkColor = double.Parse(particip.Marks[0]) > 2 ? "" : "red-background";
            //string secondMarkColor = double.Parse(particip.Marks[1]) > 0.5 ? "" : "red-background";
            //string thirdMarkColor = double.Parse(particip.Marks[2]) > 2 ? "" : "red-background";
            //string fourthMarkColor = double.Parse(particip.Marks[3]) > 0 ? "" : "red-background";
            //string fifthMarkColor = double.Parse(particip.Marks[4]) > 0 ? "" : "red-background";

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
            }

            .green-bgrd{
                background-color:green;
                color:white;
            }

            .lightgreen-bgrd{
                background-color:lightgreen;
            }

            .yellow-bgrd{
                background-color:yellow;
            }

            .red-background {
                background-color: red;
                color: white;
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
            <p class='col-xs-8 col-sm-8 text-uppercase'>{particip.SchoolParticipInfo.Surname} {particip.SchoolParticipInfo.Name} {particip.SchoolParticipInfo.SecondName}</p>
            <br />
            <br />
            <p class='col-xs-4 col-sm-4'>Образовательная организация:</p>
            <p class='col-xs-8 col-sm-8 text-uppercase'>{particip.SchoolParticipInfo.SchoolName}</p>
            <br />
            <br />
            <p class='col-xs-4 col-sm-4'>Класс:</p>
            <p class='col-xs-8 col-sm-8'>{particip.ClassName}</p>
            <br />
            <br />
            <p class='col-xs-4 col-sm-4'>Дата обследования:</p>
            <p class='col-xs-8 col-sm-8'>{particip.TestDate}</p>
            <br />
        </div>
        <br />
        <br />

        <table style='width:710px' class='table table-bordered'>
            <caption class='text-center' style='color:black'>Результаты</caption>
            <tr>
                <td>
                    <p class='col-xs-4 col-sm-4'>Первичный балл:</p>
                    <p class='col-xs-8 col-sm-8'>{particip.PrimaryMark}</p>
                </td>
            </tr>
            <tr>
                <td>
                    <p class='col-xs-4 col-sm-4'>Уровень готовности:</p>
                    <p class='col-xs-8 col-sm-8'><span style='padding:10px 15px 20px' class='{GetGradeGroupBgrd(particip.Grade5)}'>{particip.GradeGroup}</span></p>
                </td>
            </tr>
        </table>

        <br />
        <br />
        <table style='width:710px' class='table table-bordered'>
            <caption class='text-center' style='color:black'>Выполнение заданий</caption>
            <tr>
                <th style='text-align:center; vertical-align:middle' width='60px'>№ п/п</th>
                <th style='text-align:center; vertical-align:middle'>Наименование задания</th>
                <th style='text-align:center; vertical-align:middle'>Диагностируемые качества</th>
                <th style='text-align:center; vertical-align:middle'>Количество баллов за задание</th>
                <th style='text-align:center; vertical-align:middle'>Уровень выполнения задания</th>
            </tr>
            <tr>
                <td style='text-align:center; vertical-align:middle'>1</td>
                <td style='vertical-align:middle'>«Графический диктант»</td>
                <td>
                    - внимание
                    <br />- самоконтроль
                    <br />- ориентация на плоскости листа
                </td>
                <td style='text-align:center; vertical-align:middle'>{particip.Marks[0]}</td>
                <td class='{GetGradeClass(particip.GradeStrings[0])}' style='text-align:center; vertical-align:middle'>{particip.GradeStrings[0]}</td>
            </tr>
            <tr>
                <td style='text-align:center; vertical-align:middle'>2</td>
                <td style='vertical-align:middle'>«Дорожки»</td>
                <td>
                    - перцептивно-двигательные навыки
                </td>
                <td style='text-align:center; vertical-align:middle'>{particip.Marks[1]}</td>
                <td class='{GetGradeClass(particip.GradeStrings[1])}' style='text-align:center; vertical-align:middle'>{particip.GradeStrings[1]}</td>
            </tr>
            <tr>
                <td style='text-align:center; vertical-align:middle'>3</td>
                <td style='vertical-align:middle'>«Образец и правило»</td>
                <td>
                    - ориентация на плоскости листа
                    <br />- самоконтроль, планирование и организация собственной деятельности
                </td>
                <td style='text-align:center; vertical-align:middle'>{particip.Marks[2]}</td>
                <td class='{GetGradeClass(particip.GradeStrings[2])}' style='text-align:center; vertical-align:middle'>{particip.GradeStrings[2]}</td>
            </tr>
            <tr>
                <td style='text-align:center; vertical-align:middle'>4</td>
                <td style='vertical-align:middle'>«Звуковые прятки»</td>
                <td>- фонематический слух</td>
                <td style='text-align:center; vertical-align:middle'>{particip.Marks[3]}</td>
                <td class='{GetGradeClass(particip.GradeStrings[3])}' style='text-align:center; vertical-align:middle'>{particip.GradeStrings[3]}</td>
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

        private string GetGradeGroupBgrd(int grade5)
        {
            switch (grade5)
            {
                case 2:
                    return "red-background";
                case 3:
                    return "yellow-bgrd";
                case 4:
                    return "lightgreen-bgrd";
                case 5:
                    return "green-bgrd";
                default:
                    throw new FormatException("Неверный формат Grade5");
            }  
        }

        private string GetGradeClass(string gradeStr)
        {
            if (gradeStr.StartsWith("высокий"))
            {
                return "green-bgrd";
            }
            else if (gradeStr.StartsWith("средний"))
            {
                return "yellow-bgrd";
            }
            else if (gradeStr.StartsWith("низкий"))
            {
                return "red-background";
            }
            else
            {
                throw new FormatException("Неверный формат gradeString");
            }
        }
    }
}

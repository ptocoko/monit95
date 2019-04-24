using ClosedXML.Excel;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BekhanStat
{
    class Program
    {
        static void Main(string[] args)
        {
            string connectionString = ConfigurationManager.ConnectionStrings["PtoContext"].ConnectionString;
            string[] schools = new string[] { "МБОУ СОШ № 2 с. Герменчук Шалинский МР", "МБОУ Балансуйская СОШ Ножай-Юртовский МР", "МБОУ СОШ с. Ялхой-Мохк Курчалоевский МР",
                "МБОУ СОШ с. п. Азамат-Юрт Гудермесский МР", "МБОУ «СОШ с. Сельментаузен» Веденский МР", "МБОУ «СОШ № 1 с. Дарго» Веденский МР", "МБОУ «СОШ № 10» г. Грозный",
                "МБОУ Чурч-Ирзуйская СОШ Ножай-Юртовский МР", "МБОУ Гой-Чунская СОШ Урус-Мартановский МР", "МБОУ СОШ № 1 г. Урус-Мартан Урус-Мартановский МР",
                "МБОУ СОШ с. Юбилейное Наурский МР", "МБОУ СОШ № 6 г. Шали Шалинский МР", "МБОУ «СОШ с. Эшилхатой» Веденский МР", "МБОУ «СОШ № 36» г. Грозный",
                "МБОУ «СОШ № 64 г. Грозный", "МБОУ СОШ № 6 с. Гойты Урус-Мартановский МР", "МБОУ «Бурунская СОШ» Шелковской МР", "МБОУ СОШ с. Танги-Чу Урус-Мартановский МР",
                "МБОУ СОШ с. Ульяновское Наурский МР", "МБОУ «СОШ № 1 с. Катар-Юрт» Ачхой-Мартановский МР", "МБОУ Беной-Веденская СОШ Ножай-Юртовский МР",
                "МБОУ «Гунинская СОШ» Веденский МР", "МБОУ «СОШ с. Тевзани» Веденский МР", "МБОУ Мескетинская СОШ Ножай-Юртовский МР", "МБОУ «СОШ № 2» г. Аргун",
                "МБОУ «СОШ № 6 г. Аргун» г. Аргун", "МБОУ СОШ № 2 с. Сержень-Юрт Шалинский МР", "МБОУ «СОШ с. Агишбатой» Веденский МР", "МБОУ «СОШ № 1 с. Ведено» Веденский МР",
                "МБОУ СОШ с. Мескер-Юрт Шалинский МР", "МБОУ «Аллероевская СОШ № 1» Курчалоевский МР", "МБОУ «СОШ с. Марзой-Мохк» Веденский МР",
                "МБОУ «Гордали-Юртовская СШ» Гудермесский МР", "МБОУ СОШ ст. Ищерская Наурский МР", "МБОУ СОШ № 2 с. Бачи-Юрт Курчалоевский МР",
                "МБОУ «СОШ с. Симсир им. Т.Д. Эрсенбиева» Ножай-Юртовский МР", "МБОУ СОШ № 2 с. п. Энгель-Юрт Гудермесский МР", "МБОУ Даевская СОШ Шатойский МР",
                "МБОУ СОШ № 11 г. Гудермес Гудермесский МР", "МБОУ «Курдюковская СОШ» Шелковской МР", "МБОУ СОШ № 2 с. Майртуп Курчалоевский МР",
                "СОШ № 3 с. Чечен-Аул Грозненский МР", "МБОУ «Гудермесская СШ № 4» Гудермесский МР", "МБОУ СОШ № 10 г. Шали Шалинский МР",
                "МБОУ СОШ № 9 г. Шали Шалинский МР", "МБОУ СОШ № 1 с. Автуры Шалинский МР", "МБОУ СОШ с. Ники-Хита Курчалоевский МР",
                "МБОУ СОШ № 1 с. п. Энгель-Юрт Гудермесский МР", "МБОУ СОШ с. Агишты Шалинский МР", "МБОУ Ахкинчу-Барзоевская СОШ Курчалоевский МР",
                "МБОУ «СОШ № 2 с. Дарго» Веденский МР", "МБОУ «СОШ с. Дуц-Хутор» Веденский МР", "МБОУ «СОШ № 2 с. Самашки» Ачхой-Мартановский МР",
                "МБОУ СОШ № 3 с. Гехи Урус-Мартановский МР", "МБОУ СОШ № 3 г. Урус-Мартан Урус-Мартановский МР", "МБОУ «СОШ с. Бамут» Ачхой-Мартановский МР",
                "МБОУ СОШ № 2 г. Гудермес Гудермесский МР", "МБОУ Согунтинская СОШ Ножай-Юртовский МР", "МБОУ СОШ № 4 с. Бачи-Юрт Курчалоевский МР",
                "МБОУ СОШ № 3 г. Шали Шалинский МР", "МБОУ Гансолчуйская СОШ Ножай-Юртовский МР", "МБОУ «Харьковская СОШ» Шелковской МР", "МБОУ СОШ № 3 с. Бачи-Юрт Курчалоевский МР",
                "СОШ № 1 с. Гикало Грозненский МР", "МБОУ «СОШ с. Терское» Грозненский МР", "МБОУ Гилянинская СОШ № 1 Ножай-Юртовский МР", "МБОУ «СОШ с. Янди» Ачхой-Мартановский МР",
                "МБОУ Энгенойская СОШ Ножай-Юртовский МР", "МБОУ СОШ с. Подгорное Надтеречный МР", "МБОУ «СОШ с. Первомайское» Веденский МР",
                "ГБОУ «Центр образования с. Курчалой» Курчалоевский МР", "МБОУ Аллеройская СОШ Ножай-Юртовский МР", "МБОУ «СОШ с. Лаха-Варанды» Грозненский МР",
                "МБОУ СОШ № 1 с. Герменчук Шалинский МР", "МБОУ СОШ № 1 с. п. Верхне-Нойбер Гудермесский МР", "СОШ № 2 с. Центора-Юрт Грозненский МР",
                "МБОУ СОШ № 1 с. Бачи-Юрт Курчалоевский МР", "МБОУ «СОШ № 65» г. Грозный", "МБОУ СОШ № 10 г. Гудермес Гудермесский МР", "МБОУ «СОШ с. Хаттуни» Веденский МР",
                "МБОУ «СОШ № 17» г. Грозный", "МБОУ Шовхал-Бердинская СОШ Ножай-Юртовский МР", "МБОУ Гордалинская СОШ Ножай-Юртовский МР", "МБОУ «СОШ с. Борзой» Шатойский МР",
                "МБОУ СОШ с. Калаус Надтеречный МР", "МБОУ «СОШ № 5 г. Шали» Шалинский МР", "МБОУ СОШ № 2 с. Цоци-Юрт Курчалоевский МР", "МБОУ «СОШ № 5 г. Аргун» г. Аргун",
                "МБОУ «СОШ № 9» г. Грозный", "МБОУ Байтаркинская СОШ Ножай-Юртовский МР", "МБОУ Саясановская СОШ Ножай-Юртовский МР", "МБОУ Зандак-Аринская СОШ Ножай-Юртовский МР",
                "МБОУ Хал-Келоевская СОШ Шатойский МР", "МБОУ Рагун-Кажинская СОШ Ножай-Юртовский МР", "МБОУ «Бороздиновская СОШ» Шелковской МР",
                "МБОУ Зандакская СОШ № 2 Ножай-Юртовский МР", "МБОУ Замай-Юртовская СОШ Ножай-Юртовский МР" };

            //List<StatDto> schoolStatDtos = new List<StatDto>();
            //List<StatDto> parentsStatDtos = new List<StatDto>();
            //List<StatDto> employeesStatDtos = new List<StatDto>();

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();
                foreach (var school in schools)
                {
                    StatDto schoolStatDto = GetSchoolStat(school, connection);
                    //schoolStatDtos.Add(schoolStatDto);

                    StatDto parentsStatDto = GetParentsStat(school, connection);
                    //parentsStatDtos.Add(parentsStatDto);

                    StatDto employeesStatDto = GetEmployeesStat(school, connection);
                    //employeesStatDtos.Add(employeesStatDto);

                    SaveToExcel(schoolStatDto, parentsStatDto, employeesStatDto);
                }
            }

            //foreach (var statDto in schoolStatDtos)
            //{
            //    SaveToExcel(statDto);
            //}

            //Console.ReadKey();
        }

        static StatDto GetSchoolStat(string school, SqlConnection connection)
        {
            StatDto schoolStatDto = new StatDto
            {
                SchoolName = school,
                ColumnNamesAndAnswers = GetSchoolColumnNameAndAnswers()
            };
            using (SqlCommand command = new SqlCommand("select count(*) from bekhan_schools_profile where SchoolName = '" + school + "'", connection))
            {
                schoolStatDto.SchoolCount = int.Parse(command.ExecuteScalar().ToString());
            }
            using (SqlCommand command = new SqlCommand("select * from bekhan_schools_profile where SchoolName = '" + school + "'", connection))
            {
                var executed = command.ExecuteReader();
                foreach (var question in GetAnswers(executed, GetSchoolColumnNames(), schoolStatDto.SchoolCount, GetSchoolDefaultAnswers()))
                {
                    foreach (var answer in question.Value)
                    {
                        schoolStatDto.ColumnNamesAndAnswers[question.Key][answer.Body] = answer.Value;
                    }
                }
            }

            return schoolStatDto;
        }

        static StatDto GetParentsStat(string school, SqlConnection connection)
        {
            StatDto ParentStatDto = new StatDto
            {
                SchoolName = school,
                ColumnNamesAndAnswers = GetParentsColumnNameAndAnswers()
            };
            using (SqlCommand command = new SqlCommand("select count(*) from bekhan_parents_profile where SchoolName = '" + school + "'", connection))
            {
                ParentStatDto.SchoolCount = int.Parse(command.ExecuteScalar().ToString());
            }
            using (SqlCommand command = new SqlCommand("select * from bekhan_parents_profile where SchoolName = '" + school + "'", connection))
            {
                var executed = command.ExecuteReader();
                foreach (var question in GetAnswers(executed, GetParentsColumnNames(), ParentStatDto.SchoolCount, GetParentsDefaultAnswers()))
                {
                    foreach (var answer in question.Value)
                    {
                        ParentStatDto.ColumnNamesAndAnswers[question.Key][answer.Body] = answer.Value;
                    }
                }
            }

            return ParentStatDto;
        }

        static StatDto GetEmployeesStat(string school, SqlConnection connection)
        {
            StatDto EmployeesStatDto = new StatDto
            {
                SchoolName = school,
                ColumnNamesAndAnswers = GetEmployeesColumnNameAndAnswers()
            };
            using (SqlCommand command = new SqlCommand("select count(*) from bekhan_employees_profile where SchoolName = '" + school + "'", connection))
            {
                EmployeesStatDto.SchoolCount = int.Parse(command.ExecuteScalar().ToString());
            }
            using (SqlCommand command = new SqlCommand("select * from bekhan_employees_profile where SchoolName = '" + school + "'", connection))
            {
                var executed = command.ExecuteReader();
                foreach (var question in GetAnswers(executed, GetEmployeesColumnNames(), EmployeesStatDto.SchoolCount, GetEmployeesDefaultAnswers()))
                {
                    foreach (var answer in question.Value)
                    {
                        EmployeesStatDto.ColumnNamesAndAnswers[question.Key][answer.Body] = answer.Value;
                    }
                }
            }

            return EmployeesStatDto;
        }

        static IDictionary<string, List<AnswerDto>> GetAnswers(
            SqlDataReader reader, 
            IEnumerable<string> columnNames, 
            int residentsCount, 
            IDictionary<string, string[]> defaultAnswers = null)
        {
            IDictionary<string, List<string>> tempAnswers = new Dictionary<string, List<string>>();
            while (reader.Read())
            {
                foreach (var columnName in columnNames)
                {
                    if (!tempAnswers.Keys.Contains(columnName))
                    {
                        tempAnswers.Add(columnName, new List<string>());
                    }

                    var answerBody = reader[columnName].ToString();
                    if (defaultAnswers[columnName] == null || (defaultAnswers[columnName] != null && defaultAnswers[columnName].Contains(answerBody)))
                    {
                        tempAnswers[columnName].Add(answerBody);
                    }
                    else
                    {
                        tempAnswers[columnName].Add("Другое");
                    }
                }
            }

            IDictionary<string, List<AnswerDto>> answers = new Dictionary<string, List<AnswerDto>>();
            foreach (var tempAnswer in tempAnswers)
            {
                answers.Add(tempAnswer.Key, GetAnswerDtos(tempAnswer.Value, residentsCount));
            }

            return answers;
        }

        static List<AnswerDto> GetAnswerDtos(List<string> answers, int residenstCount)
        {
            return answers
                .GroupBy(gb => gb)
                .Select(a => new AnswerDto { Body = a.Key, Value = (double)a.Count() / (double)residenstCount })
                // TODO sorting
                .ToList();
        }

        static IDictionary<string, string[]> GetSchoolDefaultAnswers()
        {
            Dictionary<string, string[]> columnNameDefaultAnswers = new Dictionary<string, string[]>();

            foreach (var columnName in GetSchoolColumnNames())
            {
                string[] defaultAnswers = null;
                if (columnName == "OneThree")
                {
                    defaultAnswers = new string[] { "из СМИ", "из Интернета (на официальном сайте учреждения)", "от знакомых",
                        "непосредственно в учебных заведениях (информационные стенды, дни открытых дверей и прочее)", "от администрации учебных заведений" };
                }
                else if (columnName == "OneFour")
                {
                    defaultAnswers = new string[] { "Здесь дают хорошее образование", "Из-за близкого расположения к дому", "Знакомые посоветовали",
                        "Учатся знакомые, родственники", "Слышал(а) много хорошего об учебном заведении" };
                }

                columnNameDefaultAnswers.Add(columnName, defaultAnswers);
            }

            return columnNameDefaultAnswers;
        }

        static IDictionary<string, string[]> GetParentsDefaultAnswers()
        {
            Dictionary<string, string[]> columnNameDefaultAnswers = new Dictionary<string, string[]>();

            foreach (var columnName in GetParentsColumnNames())
            {
                string[] defaultAnswers = null;
                if (columnName == "One")
                {
                    defaultAnswers = new string[] { "из СМИ", "из Интернета (на официальном сайте учреждения)", "от знакомых",
                        "непосредственно в учебных заведениях (информационные стенды, дни открытых дверей и прочее)", "от администрации учебных заведений" };
                }
                else if (columnName == "Two")
                {
                    defaultAnswers = new string[] { "Да, мне удается найти практически все", "Обычно я нахожу большую часть  нужной информации",
                        "У меня получается находить только некоторую информацию", "Нет, я не могу получить нужную информацию" };
                }
                else if (columnName == "Three")
                {
                    defaultAnswers = new string[] { "Соответствует практически во всем", "Соответствует частично", "Не соответствует", "Затрудняюсь ответить" };
                }

                columnNameDefaultAnswers.Add(columnName, defaultAnswers);
            }

            return columnNameDefaultAnswers;
        }

        static IDictionary<string, string[]> GetEmployeesDefaultAnswers()
        {
            Dictionary<string, string[]> columnNameDefaultAnswers = new Dictionary<string, string[]>();

            foreach (var columnName in GetEmployeesColumnNames())
            {
                string[] defaultAnswers = null;
                if (columnName == "Three")
                {
                    defaultAnswers = new string[] { "Отремонтировать помещение", "Повысить заработную плату работникам учреждения",
                        "Работникам учреждения качественно выполнять свои обязанности", "Приобрести новое оборудование", "Обеспечить доступ в Интернет" };
                }

                columnNameDefaultAnswers.Add(columnName, defaultAnswers);
            }

            return columnNameDefaultAnswers;
        }

        static string[] GetSchoolColumnNames()
        {
            return GetSchoolColumnNameAndAnswers().Select(s => s.Key).ToArray();
        }

        static string[] GetParentsColumnNames()
        {
            return GetParentsColumnNameAndAnswers().Select(s => s.Key).ToArray();
        }

        static string[] GetEmployeesColumnNames()
        {
            return GetEmployeesColumnNameAndAnswers().Select(s => s.Key).ToArray();
        }

        static IDictionary<string, IDictionary<string, double>> GetSchoolColumnNameAndAnswers()
        {
            return new Dictionary<string, IDictionary<string, double>>
            {
                ["OneOne"] = new Dictionary<string, double>
                {
                    ["6 класс"] = 0,
                    ["7 класс"] = 0,
                    ["8 класс"] = 0,
                    ["9 класс"] = 0,
                    ["10 класс"] = 0,
                    ["11 класс"] = 0
                },
                ["OneTwo"] = new Dictionary<string, double>
                {
                    ["Мужской"] = 0,
                    ["Женский"] = 0
                },
                ["OneThree"] = new Dictionary<string, double>
                {
                    ["из СМИ"] = 0,
                    ["из Интернета (на официальном сайте учреждения)"] = 0,
                    ["от знакомых"] = 0,
                    ["непосредственно в учебных заведениях (информационные стенды, дни открытых дверей и прочее)"] = 0,
                    ["от администрации учебных заведений"] = 0,
                    ["Другое"] = 0
                },
                ["OneFour"] = new Dictionary<string, double>
                {
                    ["Здесь дают хорошее образование"] = 0,
                    ["Из-за близкого расположения к дому"] = 0,
                    ["Знакомые посоветовали"] = 0,
                    ["Учатся знакомые, родственники"] = 0,
                    ["Слышал(а) много хорошего об учебном заведении"] = 0,
                    ["Другое"] = 0
                },
                ["OneFive"] = new Dictionary<string, double>
                {
                    ["учусь на отлично"] = 0,
                    ["учусь на хорошо и отлично"] = 0,
                    ["учусь хорошо"] = 0,
                    ["учусь средне"] = 0,
                    ["плохо учусь, еле-еле «тяну» (с трудом успеваю)"] = 0,
                    ["затрудняюсь ответить"] = 0
                },
                ["OneSix"] = new Dictionary<string, double>
                {
                    ["Да"] = 0,
                    ["Нет"] = 0,
                    ["Затрудняюсь ответить"] = 0
                },
                ["OneSevenOne"] = new Dictionary<string, double>
                {
                    ["устраивают полностью"] = 0,
                    ["устраивают частично"] = 0,
                    ["не устраивают"] = 0
                },
                ["OneSevenTwo"] = new Dictionary<string, double>
                {
                    ["устраивают полностью"] = 0,
                    ["устраивают частично"] = 0,
                    ["не устраивают"] = 0
                },
                ["OneSevenThree"] = new Dictionary<string, double>
                {
                    ["устраивают полностью"] = 0,
                    ["устраивают частично"] = 0,
                    ["не устраивают"] = 0
                },
                ["OneEightOne"] = new Dictionary<string, double>
                {
                    ["устраивают полностью"] = 0,
                    ["устраивают частично"] = 0,
                    ["не устраивают"] = 0
                },
                ["OneEightTwo"] = new Dictionary<string, double>
                {
                    ["устраивают полностью"] = 0,
                    ["устраивают частично"] = 0,
                    ["не устраивают"] = 0
                },
                ["OneEightThree"] = new Dictionary<string, double>
                {
                    ["устраивают полностью"] = 0,
                    ["устраивают частично"] = 0,
                    ["не устраивают"] = 0
                },
                ["OneNineOne"] = new Dictionary<string, double>
                {
                    ["устраивают полностью"] = 0,
                    ["устраивают частично"] = 0,
                    ["не устраивают"] = 0
                },
                ["OneNineTwo"] = new Dictionary<string, double>
                {
                    ["устраивают полностью"] = 0,
                    ["устраивают частично"] = 0,
                    ["не устраивают"] = 0
                },
                ["OneNineThree"] = new Dictionary<string, double>
                {
                    ["устраивают полностью"] = 0,
                    ["устраивают частично"] = 0,
                    ["не устраивают"] = 0
                },
                ["OneTenOne"] = new Dictionary<string, double>
                {
                    ["устраивают полностью"] = 0,
                    ["устраивают частично"] = 0,
                    ["не устраивают"] = 0
                },
                ["OneTenTwo"] = new Dictionary<string, double>
                {
                    ["устраивают полностью"] = 0,
                    ["устраивают частично"] = 0,
                    ["не устраивают"] = 0
                },
                ["OneTenThree"] = new Dictionary<string, double>
                {
                    ["устраивают полностью"] = 0,
                    ["устраивают частично"] = 0,
                    ["не устраивают"] = 0
                },
                ["OneTenFour"] = new Dictionary<string, double>
                {
                    ["устраивают полностью"] = 0,
                    ["устраивают частично"] = 0,
                    ["не устраивают"] = 0
                },
                ["OneTenFive"] = new Dictionary<string, double>
                {
                    ["устраивают полностью"] = 0,
                    ["устраивают частично"] = 0,
                    ["не устраивают"] = 0
                },
                ["OneElevenOne"] = new Dictionary<string, double>
                {
                    ["устраивает полностью"] = 0,
                    ["устраивает частично"] = 0,
                    ["не устраивает"] = 0
                },
                ["OneElevenTwo"] = new Dictionary<string, double>
                {
                    ["устраивает полностью"] = 0,
                    ["устраивает частично"] = 0,
                    ["не устраивает"] = 0
                },
                ["OneTwelveOne"] = new Dictionary<string, double>
                {
                    ["устраивает полностью"] = 0,
                    ["устраивает частично"] = 0,
                    ["не устраивает"] = 0
                },
                ["OneTwelveTwo"] = new Dictionary<string, double>
                {
                    ["устраивает полностью"] = 0,
                    ["устраивает частично"] = 0,
                    ["не устраивает"] = 0
                },
                ["OneTwelveThree"] = new Dictionary<string, double>
                {
                    ["устраивает полностью"] = 0,
                    ["устраивает частично"] = 0,
                    ["не устраивает"] = 0
                },
                ["OneTwelveFour"] = new Dictionary<string, double>
                {
                    ["устраивает полностью"] = 0,
                    ["устраивает частично"] = 0,
                    ["не устраивает"] = 0
                },
                ["OneTwelveFive"] = new Dictionary<string, double>
                {
                    ["устраивает полностью"] = 0,
                    ["устраивает частично"] = 0,
                    ["не устраивает"] = 0
                },
                ["OneTwelveSix"] = new Dictionary<string, double>
                {
                    ["устраивает полностью"] = 0,
                    ["устраивает частично"] = 0,
                    ["не устраивает"] = 0
                },
                ["OneThirteen"] = new Dictionary<string, double>
                {
                    ["Хорошее"] = 0,
                    ["Среднее"] = 0,
                    ["Плохое "] = 0,
                    ["Затрудняюсь ответить"] = 0
                },
                ["OneFourteen"] = new Dictionary<string, double>
                {
                    ["Очень доступны и очень комфортны"] = 0,
                    ["Доступны и комфортны"] = 0,
                    ["Сложно доступные и не комфортные"] = 0,
                    ["Совсем не доступные"] = 0,
                    ["Затрудняюсь ответить"] = 0
                },
                ["OneFifteenOne"] = new Dictionary<string, double>
                {
                    ["В полной мере"] = 0,
                    ["Частично"] = 0,
                    ["Отсутствуют"] = 0,
                    ["Затрудняюсь ответить"] = 0
                },
                ["OneFifteenTwo"] = new Dictionary<string, double>
                {
                    ["В полной мере"] = 0,
                    ["Частично"] = 0,
                    ["Отсутствуют"] = 0,
                    ["Затрудняюсь ответить"] = 0
                },
                ["OneFifteenThree"] = new Dictionary<string, double>
                {
                    ["В полной мере"] = 0,
                    ["Частично"] = 0,
                    ["Отсутствуют"] = 0,
                    ["Затрудняюсь ответить"] = 0
                },
                ["OneFifteenFour"] = new Dictionary<string, double>
                {
                    ["В полной мере"] = 0,
                    ["Частично"] = 0,
                    ["Отсутствуют"] = 0,
                    ["Затрудняюсь ответить"] = 0
                },
                ["OneFifteenFive"] = new Dictionary<string, double>
                {
                    ["В полной мере"] = 0,
                    ["Частично"] = 0,
                    ["Отсутствует"] = 0,
                    ["Затрудняюсь ответить"] = 0
                },
                ["OneFifteenSix"] = new Dictionary<string, double>
                {
                    ["В полной мере"] = 0,
                    ["Частично"] = 0,
                    ["Отсутствует"] = 0,
                    ["Затрудняюсь ответить"] = 0
                },
                ["OneSixteen"] = new Dictionary<string, double>
                {
                    ["да, готов(а)"] = 0,
                    ["нет, не готов(а)"] = 0,
                    ["затрудняюсь ответить"] = 0
                },
                ["TwoOneOne"] = new Dictionary<string, double>
                {
                    ["Доброжелательные"] = 0,
                    ["Скорее доброжелательные, чем недоброжелательные"] = 0,
                    ["Скорее недоброжелательные, чем доброжелательные"] = 0,
                    ["Недоброжелательные"] = 0,
                    ["Затрудняюсь ответить"] = 0
                },
                ["TwoOneTwo"] = new Dictionary<string, double>
                {
                    ["Доброжелательные"] = 0,
                    ["Скорее доброжелательные, чем недоброжелательные"] = 0,
                    ["Скорее недоброжелательные, чем доброжелательные"] = 0,
                    ["Недоброжелательные"] = 0,
                    ["Затрудняюсь ответить"] = 0
                },
                ["TwoOneThree"] = new Dictionary<string, double>
                {
                    ["Доброжелательные"] = 0,
                    ["Скорее доброжелательные, чем недоброжелательные"] = 0,
                    ["Скорее недоброжелательные, чем доброжелательные"] = 0,
                    ["Недоброжелательные"] = 0,
                    ["Затрудняюсь ответить"] = 0
                },
                ["TwoOneFour"] = new Dictionary<string, double>
                {
                    ["Доброжелательные"] = 0,
                    ["Скорее доброжелательные, чем недоброжелательные"] = 0,
                    ["Скорее недоброжелательные, чем доброжелательные"] = 0,
                    ["Недоброжелательные"] = 0,
                    ["Затрудняюсь ответить"] = 0
                },
                ["TwoOneFive"] = new Dictionary<string, double>
                {
                    ["Доброжелательные"] = 0,
                    ["Скорее доброжелательные, чем недоброжелательные"] = 0,
                    ["Скорее недоброжелательные, чем доброжелательные"] = 0,
                    ["Недоброжелательные"] = 0,
                    ["Затрудняюсь ответить"] = 0
                },
                ["TwoOneSix"] = new Dictionary<string, double>
                {
                    ["Доброжелательные"] = 0,
                    ["Скорее доброжелательные, чем недоброжелательные"] = 0,
                    ["Скорее недоброжелательные, чем доброжелательные"] = 0,
                    ["Недоброжелательные"] = 0,
                    ["Затрудняюсь ответить"] = 0
                },
                ["TwoTwo"] = new Dictionary<string, double>
                {
                    ["к родителям"] = 0,
                    ["к родственникам"] = 0,
                    ["к друзьям"] = 0,
                    ["к одноклассникам"] = 0,
                    ["к учителям"] = 0,
                    ["к администрации учреждения"] = 0
                },
                ["TwoThree"] = new Dictionary<string, double>
                {
                    ["Позитивная"] = 0,
                    ["Нейтральная"] = 0,
                    ["Негативная"] = 0
                },
                ["TwoFour"] = new Dictionary<string, double>
                {
                    ["Вполне благоприятный, стимулирующий к творчеству"] = 0,
                    ["Скорее благоприятный, чем неблагоприятный"] = 0,
                    ["Нейтральный, никто никому не помогает и не мешает"] = 0,
                    ["Скорее неблагоприятный, чем благоприятный"] = 0,
                    ["Неблагоприятный"] = 0,
                    ["Трудно сказать"] = 0
                },
                ["TwoFive"] = new Dictionary<string, double>
                {
                    ["Да, всегда и в любой ситуации"] = 0,
                    ["Не всегда"] = 0,
                    ["Скорее нет"] = 0,
                    ["Нет"] = 0,
                    ["Затрудняюсь ответить"] = 0
                }
            };
        }

        static IDictionary<string, IDictionary<string, double>> GetParentsColumnNameAndAnswers()
        {
            return new Dictionary<string, IDictionary<string, double>>
            {
                ["One"] = new Dictionary<string, double>
                {
                    ["из СМИ"] = 0,
                    ["из Интернета (на официальном сайте учреждения)"] = 0,
                    ["от знакомых"] = 0,
                    ["непосредственно в учебных заведениях (информационные стенды, дни открытых дверей и прочее)"] = 0,
                    ["от администрации учебных заведений"] = 0,
                    ["Другое"] = 0
                },
                ["Two"] = new Dictionary<string, double>
                {
                    ["Да, мне удается найти практически все"] = 0,
                    ["Обычно я нахожу большую часть  нужной информации"] = 0,
                    ["У меня получается находить только некоторую информацию"] = 0,
                    ["Нет, я не могу получить нужную информацию"] = 0,
                    ["Другое"] = 0
                },
                ["Three"] = new Dictionary<string, double>
                {
                    ["Соответствует практически во всем"] = 0,
                    ["Соответствует частично"] = 0,
                    ["Не соответствует"] = 0,
                    ["Затрудняюсь ответить"] = 0,
                    ["Другое"] = 0
                },
                ["Four"] = new Dictionary<string, double>
                {
                    ["Очень хорошо информирован(а)"] = 0,
                    ["Хорошо информирован(а)"] = 0,
                    ["Информирован(а)"] = 0,
                    ["Слабо информирован(а)"] = 0,
                    ["Очень слабо информирован(а)"] = 0,
                    ["Не информирован(а)"] = 0,
                    ["Затрудняюсь ответить"] = 0
                },
                ["Five"] = new Dictionary<string, double>
                {
                    ["Да, доступна по электронной почте и по телефону"] = 0,
                    ["Относительно доступна, по электронной почте, очень хорошо по телефону"] = 0,
                    ["Доступна только по телефону"] = 0,
                    ["Скорее доступна, чем не доступна"] = 0,
                    ["Скорее не доступна, чем доступна"] = 0,
                    ["Отсутствует возможность получения обратной связи с учреждением"] = 0,
                    ["Затрудняюсь ответить"] = 0
                },
                ["Six"] = new Dictionary<string, double>
                {
                    ["Хорошее"] = 0,
                    ["Среднее"] = 0,
                    ["Плохое"] = 0,
                    ["Затрудняюсь ответить"] = 0
                },
                ["Seven"] = new Dictionary<string, double>
                {
                    ["Хорошее"] = 0,
                    ["Среднее"] = 0,
                    ["Плохое "] = 0,
                    ["Затрудняюсь ответить"] = 0
                },
                ["Eight"] = new Dictionary<string, double>
                {
                    ["Очень доступны и очень комфортны"] = 0,
                    ["Доступны и комфортны"] = 0,
                    ["Сложно доступные и не комфортные"] = 0,
                    ["Совсем не доступные"] = 0,
                    ["Затрудняюсь ответить"] = 0
                },
                ["Nine"] = new Dictionary<string, double>
                {
                    ["Доступно"] = 0,
                    ["Частично доступно"] = 0,
                    ["Недоступно"] = 0,
                    ["Затрудняюсь ответить"] = 0
                },
                ["Ten"] = new Dictionary<string, double>
                {
                    ["Да, всегда и в любой ситуации"] = 0,
                    ["Не всегда"] = 0,
                    ["Скорее нет"] = 0,
                    ["Нет"] = 0,
                    ["Затрудняюсь ответить"] = 0
                },
                ["Eleven"] = new Dictionary<string, double>
                {
                    ["Высокий профессионализм и компетентность персонала"] = 0,
                    ["Персонал компетентен, достаточный уровень профессионализма"] = 0,
                    ["Скорее компетентен, чем не компетентен"] = 0,
                    ["Персонал абсолютно не компетентен"] = 0,
                    ["Затрудняюсь ответить"] = 0
                },
                ["Twelve"] = new Dictionary<string, double>
                {
                    ["Да, качество услуг очень высокое"] = 0,
                    ["Не совсем, моему ребенку необходимы дополнительные занятия"] = 0,
                    ["Не уверен, что всё, чему учат, пригодится моему ребёнку"] = 0,
                    ["Нет, качество услуг низкое"] = 0,
                    ["Затрудняюсь ответить"] = 0
                },
                ["Thirteen"] = new Dictionary<string, double>
                {
                    ["Очень доволен"] = 0,
                    ["Скорее доволен, чем нет"] = 0,
                    ["Скорее не доволен, чем доволен"] = 0,
                    ["Абсолютно не доволен"] = 0,
                    ["Затрудняюсь ответить"] = 0
                },
                ["Sixteen"] = new Dictionary<string, double>
                {
                    ["Определенно да"] = 0,
                    ["Скорее да, чем нет"] = 0,
                    ["Скорее нет, чем да"] = 0,
                    ["Определенно нет"] = 0,
                    ["Затрудняюсь ответить"] = 0
                }
            };
        }

        static IDictionary<string, IDictionary<string, double>> GetEmployeesColumnNameAndAnswers()
        {
            return new Dictionary<string, IDictionary<string, double>>
            {
                ["One"] = new Dictionary<string, double>
                {
                    ["Административно-управленческий персонал"] = 0,
                    ["Педагогический персонал"] = 0,
                    ["Вспомогательный персонал"] = 0
                },
                ["TwoOne"] = new Dictionary<string, double>
                {
                    ["1 балл"] = 0,
                    ["2 балла"] = 0,
                    ["3 балла"] = 0,
                    ["4 балла"] = 0,
                    ["5 баллов"] = 0
                },
                ["TwoTwo"] = new Dictionary<string, double>
                {
                    ["1 балл"] = 0,
                    ["2 балла"] = 0,
                    ["3 балла"] = 0,
                    ["4 балла"] = 0,
                    ["5 баллов"] = 0
                },
                ["TwoThree"] = new Dictionary<string, double>
                {
                    ["1 балл"] = 0,
                    ["2 балла"] = 0,
                    ["3 балла"] = 0,
                    ["4 балла"] = 0,
                    ["5 баллов"] = 0
                },
                ["TwoFour"] = new Dictionary<string, double>
                {
                    ["1 балл"] = 0,
                    ["2 балла"] = 0,
                    ["3 балла"] = 0,
                    ["4 балла"] = 0,
                    ["5 баллов"] = 0
                },
                ["TwoFive"] = new Dictionary<string, double>
                {
                    ["1 балл"] = 0,
                    ["2 балла"] = 0,
                    ["3 балла"] = 0,
                    ["4 балла"] = 0,
                    ["5 баллов"] = 0
                },
                ["TwoSix"] = new Dictionary<string, double>
                {
                    ["1 балл"] = 0,
                    ["2 балла"] = 0,
                    ["3 балла"] = 0,
                    ["4 балла"] = 0,
                    ["5 баллов"] = 0
                },
                ["TwoSeven"] = new Dictionary<string, double>
                {
                    ["1 балл"] = 0,
                    ["2 балла"] = 0,
                    ["3 балла"] = 0,
                    ["4 балла"] = 0,
                    ["5 баллов"] = 0
                },
                ["Three"] = new Dictionary<string, double>
                {
                    ["Отремонтировать помещение"] = 0,
                    ["Повысить заработную плату работникам учреждения"] = 0,
                    ["Работникам учреждения качественно выполнять свои обязанности"] = 0,
                    ["Приобрести новое оборудование"] = 0,
                    ["Обеспечить доступ в Интернет"] = 0,
                    ["Другое"] = 0
                },
                ["Four"] = new Dictionary<string, double>
                {
                    ["да, готов(а)"] = 0,
                    ["нет, не готов(а)"] = 0,
                    ["затрудняюсь ответить"] = 0
                },
            };
        }

        static void SaveToExcel(params StatDto[] statDtos)
        {
            using (XLWorkbook workbook = new XLWorkbook(@"D:\Work\Bekhan\template.xlsx"))
            {
                int sheetIndex = 0;
                foreach (var statDto in statDtos) 
                {
                    using (IXLWorksheet sheet = workbook.Worksheets.ToArray()[sheetIndex])
                    {
                        sheet.Cell(2, 2).Value = statDto.SchoolName;
                        sheet.Cell(2, 3).Value = statDto.SchoolCount;

                        int startingRow;
                        if (sheetIndex == 0)
                            startingRow = 6;
                        else
                            startingRow = 5;

                        int row = startingRow;
                        foreach (var question in statDto.ColumnNamesAndAnswers)
                        {
                            foreach (var answer in question.Value)
                            {
                                sheet.Cell(row, 3).Value = answer.Value;

                                row++;
                            }

                            if(sheet.Cell(row, 3).Value.ToString() == "-")
                            {
                                row++;
                            }
                            if(new string[] { "OneSixteen" }.Contains(question.Key) && sheetIndex == 0)
                            {
                                row++;
                            }
                            if (question.Key == "Thirteen" && sheetIndex == 1)
                            {
                                row += 4;
                            }
                        }
                    }

                    sheetIndex++;
                }
                workbook.SaveAs(@"D:\Work\Bekhan\" + statDtos.First().SchoolName + ".xlsx");
            }
        }
    }

    public class StatDto
    {
        public int SchoolCount { get; set; }
        public string SchoolName { get; set; }
        public IDictionary<string, IDictionary<string, double>> ColumnNamesAndAnswers { get; set; }
    }

    public class AnswerDto
    {
        public double Value { get; set; }
        public string Body { get; set; }
    }
}

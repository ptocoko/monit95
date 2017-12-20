using Monit95App.Services.Validation;
using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;
using System.Linq;

namespace Monit95App.Services.Rsur.EgeQuestion
{
    public class EgeQuestionService
    {
        /// <summary>
        /// Вычисляет средний процент выполнения задания ЕГЭ
        /// </summary>
        /// <param name="egeQuestionValues">
        /// <example>{"2(40%);5(0%);8(0%)", "2(70%);5(75%);8(57%)"}</example>
        /// </param>
        /// <param name="number">номер задания ЕГЭ, средний процент выполнения которого необходимо найти</param>
        /// <returns></returns>
        double ComputeAverageValue(IEnumerable<string> egeQuestionValues, int number)
        {
            if(!egeQuestionValues.IsAny())
                throw new ArgumentException($"{nameof(egeQuestionValues)} is null or empty");

            var egeQuestionIntValues = new List<int>();
            foreach (var value in egeQuestionValues)
            {
                var match = Regex.Match(value, $@"(?<={number}\()\d+(?=.*%\))");
                if (!match.Success)
                    throw new ArgumentException($"The record {value} is incorrect", nameof(egeQuestionValues));

                egeQuestionIntValues.Add(int.Parse(match.Value));                
            }
            
            return egeQuestionIntValues.Average();
        }
    }
}

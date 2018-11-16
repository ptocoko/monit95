using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Monit95App.Services.Extensions
{
    public static class StringExtensions
    {
        /// <summary>
        /// Приведение всех букв в имени, фамилии или в отчестве в правильный регистр и удаление всех пробелов
        /// </summary>
        /// <param name="name"></param>
        /// <returns></returns>
        public static string NormalizeName(this string name)
        {
            name = name.Replace(" ", "");
            if (name.Length < 1)
            {
                return name;
            }
            else
            {
                return name.Split(new char[] { '-' }, StringSplitOptions.RemoveEmptyEntries)
                           .Select(s => s.Substring(0, 1).ToUpper() + s.Remove(0, 1).ToLower())
                           .Aggregate((s1, s2) => $"{s1}-{s2}");
            }
        }

        public static string RemoveInvalidPathChars(this string stringToBePath)
        {
            if (!string.IsNullOrEmpty(stringToBePath))
            {
                var invalidChars = Path.GetInvalidPathChars();

                return new string(stringToBePath
                    .Where(p => !invalidChars.Contains(p))
                    .ToArray());
            }
            else
            {
                return "";
            }
        }
    }
}

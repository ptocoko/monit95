using System.Linq;

namespace ServiceResult
{
    public class StringValidate
    {
        /// <summary>
        /// Проверка есть ли какая-то из строк равная null или white space
        /// </summary>
        /// <param name="strings"></param>
        /// <returns></returns>
        public static bool AnyNullOrWhiteSpace(params string[] strings)
        {
            return strings.Any(string.IsNullOrWhiteSpace);
        }
    }
}

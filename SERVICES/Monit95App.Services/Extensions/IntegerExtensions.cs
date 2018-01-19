using System;

namespace Monit95App.Services.Extensions
{
    /// <summary>
    /// Класс методов расширений для типа int
    /// </summary>
    public static class IntegerExtensions
    {
        /// <summary>
        /// Проверка значения в диапозоне
        /// </summary>
        /// <param name="source"></param>
        /// <param name="min"></param>
        /// <param name="max"></param>
        /// <returns></returns>
        public static bool IsBetween(this int source, int min, int max)
        {
            if (min > max)
                throw new ArgumentException($"{nameof(min)} must be less than {nameof(max)}");

            return source >= min && source <= max;            
        }
    }
}

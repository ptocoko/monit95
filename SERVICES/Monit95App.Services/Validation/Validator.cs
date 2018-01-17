using System;
using Monit95App.Services.Extensions;

namespace Monit95App.Services.Validation
{
    public static class Validator
    {
        /// <summary>
        /// Минимальный возвраст ученика первого класса
        /// </summary>
        private const int MIN_STUDENT_AGE = 5;

        /// <summary>
        /// Максимальный возвраст учителя
        /// </summary>
        private const int MAX_TEACHER_AGE = 90;

        /// <summary>
        /// Метод валидирует фамилию, имя или отчество
        /// </summary>
        /// <param name="surnameNameOrSecondName"></param>
        /// <returns></returns>
        public static string ValidateName (string surnameNameOrSecondName)
        {
            if (string.IsNullOrWhiteSpace(surnameNameOrSecondName))
                return "Null or empty";
            if (surnameNameOrSecondName.Length < 3 || surnameNameOrSecondName.Length > 25)
                return $"Name length of name is short or long";

            return null;
        }

        /// <summary>
        /// Метод валидирует возвраст
        /// </summary>
        /// <param name="validatedAge">Валидируемое значение</param>
        /// <param name="minAge">минимальное количество лет</param>
        /// <param name="maxAge">максимальное количество лет</param>
        /// <returns>Возвращает null в случаи успеха, сообщение об ошибке в случаи не удачи</returns>
        public static string AgeIsBetween(DateTime dateParam, int minAge, int maxAge)
        {
            if (minAge < MIN_STUDENT_AGE) minAge = MIN_STUDENT_AGE;
            if (maxAge > MAX_TEACHER_AGE) maxAge = MAX_TEACHER_AGE;
            
            var age = DateTime.Today.Year - dateParam.Year;
            if (!age.IsBetween(minAge, maxAge))
                return $"Age is not between {minAge} and {maxAge}";            

            return null;
        }
    }
}

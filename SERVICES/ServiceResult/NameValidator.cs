using ServiceResult.Exceptions;
using System;

namespace ServiceResult
{
    public static class NameValidator
    {
        private const int MIN_NAME_LENGTH = 3;
        private const int MAX_NAME_LENGTH = 20;

        /// <summary>
        /// Валидирует фамилия, имя или отчество
        /// </summary>
        /// <param name="name"></param>
        public static void Validate(string name)
        {
            if (string.IsNullOrWhiteSpace(name))
                throw new StringIsNullOrEmpty();

            if (name.Length < 3 || name.Length > 20)
                throw new NameIsShortOrLong();
        }

        public class NameIsShortOrLong : Exception { }
    }
}

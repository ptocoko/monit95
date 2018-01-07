using System;
using System.Collections.Generic;
using System.Linq;

namespace ServiceResult
{
    public class ServiceResult<T>
    {
        /// <summary>
        /// Gets or sets result which the method return
        /// </summary>
        public T Result { get; set; }
        
        public List<ServiceError> Errors { get; set; } = new List<ServiceError>();

        /// <summary>
        /// Добавление информации об ошибке
        /// </summary>
        /// <param name="key"></param>
        /// <param name="description"></param>
        /// <param name="httpStatusCode">Соответствующий статусный код http</param>
        /// TODO: подумать над тем чтобы создать вот такое "if (StringValidate.AnyNullOrWhiteSpace(key, description, out errorMessage)), т.е. errorMessage уже содержал бы "{nameof(key)} or {nameof(description)} is null or empty"        
        public void AddModelError(string key, string description, int? httpStatusCode)
        {
            if (StringValidate.AnyNullOrWhiteSpace(key, description))
                throw new ArgumentException($"{nameof(key)} or {nameof(description)} is null or empty");

            var error = new ServiceError
            {
                Key = key,
                Description = description
            };
            if (httpStatusCode != null && Enumerable.Range(100, 526).Contains((int) httpStatusCode))
                error.HttpCode = httpStatusCode;  
            Errors.Add(error);
        }
    }
}
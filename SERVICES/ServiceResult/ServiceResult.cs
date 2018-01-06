using System.Collections.Generic;

namespace ServiceResult
{
    public class ServiceResult<T>
    {
        /// <summary>
        /// Gets or sets result which the method return
        /// </summary>
        public T Result { get; set; }

        public List<ServiceError> Errors { get; set; } = new List<ServiceError>();           
    }
}
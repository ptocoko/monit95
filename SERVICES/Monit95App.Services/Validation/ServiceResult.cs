namespace Monit95App.Services.Validation
{
    using System.Collections.Generic;

    public class ServiceResult
    {
        /// <summary>
        /// Gets or sets method's result
        /// </summary>
        public object Result { get; set; }

        public List<ServiceError> Errors { get; set; } = new List<ServiceError>();           
    }
}
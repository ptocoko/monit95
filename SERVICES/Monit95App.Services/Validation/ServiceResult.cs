namespace Monit95App.Services.Validation
{
    using System.Collections.Generic;

    public class ServiceResult
    {
        /// <summary>
        /// Gets or sets method result
        /// </summary>
        public object Result { get; set; }

        public List<string> Errors { get; set; } = new List<string>();           
    }
}

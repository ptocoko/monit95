namespace Monit95App.Services.Validation
{
    /// <summary>
    /// Encapsulates an error from the service layer.
    /// </summary>
    public class ServiceError
    {
        /// <summary>
        /// Gets or sets the http response 4xx code for this error.
        /// </summary>
        /// <value>
        /// The http response 4xx code for this error.
        /// </value>
        public int? HttpCode { get; set; }

        public string Key { get; set; }

        /// <summary>
        /// Gets or sets the description for this error.
        /// </summary>
        /// <value>
        /// The description for this error.
        /// </value>
        public string Description { get; set; }
    }
}

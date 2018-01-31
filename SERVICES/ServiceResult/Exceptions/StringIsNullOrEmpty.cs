using System;

namespace ServiceResult.Exceptions
{
    public class StringIsNullOrEmpty : ArgumentException
    {
        #region Constructors

        public StringIsNullOrEmpty(string paramName): base("Param value is null or empty", paramName) { }
        public StringIsNullOrEmpty() { }

        #endregion
    }
}

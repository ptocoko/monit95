using System;
using System.Collections.Generic;
using System.Text;

namespace ServiceResult.Exceptions
{
    public class MarksParseException : Exception
    {
        public MarksParseException() { }
        public MarksParseException(string Message) : base(Message) { }
    }
}

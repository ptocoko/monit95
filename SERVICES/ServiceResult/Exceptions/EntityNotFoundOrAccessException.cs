using System;

namespace ServiceResult.Exceptions
{
    public class EntityNotFoundOrAccessException : Exception
    {
        public EntityNotFoundOrAccessException() { }
        public EntityNotFoundOrAccessException(string Message): base(Message) { }
    }
}

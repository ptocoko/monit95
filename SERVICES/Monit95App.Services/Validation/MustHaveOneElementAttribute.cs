namespace Monit95App.Domain.Core.DataAnnotations
{
    using System.Collections;
    using System.ComponentModel.DataAnnotations;

    public class MustHaveOneElementAttribute : ValidationAttribute
    {
        public override bool IsValid(object value)
        {
            if (value is IList list)
            {
                return list.Count > 0;
            }
            return false;
        }
    }
}

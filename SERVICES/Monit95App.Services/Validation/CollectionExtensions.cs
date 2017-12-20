using System.Collections.Generic;
using System.Linq;

namespace Monit95App.Services.Validation
{
    public static class CollectionExtensions
    {
        public static bool IsAny<T>(this IEnumerable<T> data)
        {
            return data != null && data.Any();
        }
    }
}

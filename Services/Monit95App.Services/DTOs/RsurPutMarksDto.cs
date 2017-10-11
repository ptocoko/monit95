using System.ComponentModel.DataAnnotations;

namespace Monit95App.Services.DTOs
{
    public class RsurPutMarksDto
    {
        [RegularExpression(@"^([0-1X];)([0-1X];)*([0-1X])$")]
        public string Marks { get; set; }
    }
}
using System.ComponentModel.DataAnnotations;

namespace Monit95App.Services.DTOs
{
    public class RsurPutMarksDto
    {
        [RegularExpression(@"^([0-1];)([0-1];)*([0-1])$")]
        public string Marks { get; set; }
    }
}
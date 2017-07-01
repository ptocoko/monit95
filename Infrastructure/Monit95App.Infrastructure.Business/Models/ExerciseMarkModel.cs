using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Infrastructure.Business.Models
{
    public class ExerciseMarkModel
    {
        public int Id { get; set; }
        public int ProjectParticipId { get; set; }
        public string TestId { get; set; }
        public string Marks { get; set; }        
    }
}

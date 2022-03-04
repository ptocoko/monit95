using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Services.FirstClass.Dtos
{
    public class QuestionResultDto
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public int MaxMark { get; set; }

        [Required]
        public double Step { get; set; }

        private double? _currentMark;
        public double? CurrentMark
        {
            get { return _currentMark; }
            set
            {
                if (value.HasValue)
                {
                    var _val = value.Value;
                    var possibleMarks = GetPossibleMarks(MaxMark, Step);
                    if (possibleMarks.Contains(_val))
                    {
                        _currentMark = _val;
                    }
                    else
                    {
                        _currentMark = 0;
                    }
                }
                else
                {
                    _currentMark = value;
                }
            }
        }

        private IList<double> GetPossibleMarks(int maxMark, double step)
        {
            var possibleMarksList = new List<double>();
            for(double i = 0; i <= maxMark; i += step)
            {
                possibleMarksList.Add(i);
            }
            return possibleMarksList;
        }
    }
}

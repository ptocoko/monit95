using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ParticipReporter
{
    public interface IHtmlBuilder
    {
        string GetHeading(HeadingDto heading);
        string GetOverviewSection(OverviewDto overview);
        string GetElementsSection(IEnumerable<QuestionsDto> questionsDto);
    }
}

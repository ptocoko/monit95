using System.Collections.Generic;

namespace ParticipReporter
{
    public class ReportDto
    {
        public HeadingDto HeadingDto { get; set; }
        public OverviewDto OverviewDto { get; set; }
        public IEnumerable<QuestionsDto> QuestionsDto { get; set; }
    }

    public class HeadingDto
    {
        public string Fio { get; set; }
        public string SchoolName { get; set; }
        public string AreaName { get; set; }
        public string ClassName { get; set; }
        public string TestName { get; set; }
        public string TestDate { get; set; }
    }

    public class OverviewDto
    {
        public int DoneGeneralTasks { get; set; }
        public int AllGeneralTasks { get; set; }
        public int AdditionalTasksPoints { get; set; }
        public int MaxAdditionalTasksPoints { get; set; }
        public string GradeStr { get; set; }
        public int Grade5 { get; set; }
        public short? FirstClassGrade5 { get; set; }
        public string FirstClassGradeStr { get; set; }
        public string TestName { get; set; }
        public int PrimaryMark { get; set; }
    }

    public class QuestionsDto
    {
        public string Name { get; set; }
        public string ElementName { get; set; }
        public int Grade100 { get; set; }
    }
}

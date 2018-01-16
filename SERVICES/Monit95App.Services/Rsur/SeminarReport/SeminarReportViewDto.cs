namespace Monit95App.Services.Rsur.SeminarReport
{
    /// <summary>
    /// Объект для отображения в таблице
    /// </summary>
    public class SeminarReportViewDto
    {
        public int RsurReportId { get; set; }

        public string SchoolName { get; set; }

        public string DateText { get; set; }                        
    }
}

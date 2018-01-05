namespace Monit95App.Domain.Core.Entities
{
    public class RsurReportFile
    {
        public int Id { get; set; }

        public int RsurReportId { get; set; }

        public int FileId { get; set; }

        // Файл протокола проведения заседания ШМО
        public bool IsProtocol { get; set; }

        public virtual File File { get; set; }

        public virtual RsurReport RsurReport { get; set; }
    }
}

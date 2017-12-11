namespace Monit95App.Domain.Core.Entities
{
    public class FilePermisson
    {
        public int Id { get; set; }

        public int FileId { get; set; }

        public string UserName { get; set; }

        public int PermissionId { get; set; }

        public virtual File File { get; set; }

        public virtual Permission Permission { get; set; }
    }
}

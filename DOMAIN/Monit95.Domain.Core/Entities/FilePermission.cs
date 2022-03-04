namespace Monit95App.Domain.Core.Entities
{
    //TODO: Why should I override GetHashCode
    public class FilePermission
    {
        #region Properties

        public int Id { get; set; }

        public int FileId { get; set; }

        public string UserName { get; set; }

        public int PermissionId { get; set; }

        public virtual File File { get; set; }

        public virtual Permission Permission { get; set; }

        #endregion

        #region Methods

        /// <summary>
        /// 
        /// </summary>
        /// <param name="obj"></param>
        /// <returns></returns>
        /// TODO: Refactoring
        public override bool Equals(object obj)
        {
            var filePermission = obj as FilePermission;

            if (UserName.Equals(filePermission.UserName) && PermissionId == filePermission.PermissionId)
                return true;

            return false;
        }

        #endregion
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Services.Document
{
    using System.IO;

    using Monit95App.Infrastructure.Data;
    using Monit95App.Services.Interfaces;

    public class DocumentService : IDocumentService
    {
        #region Dependencies

        private readonly CokoContext context;

        #endregion

        public DocumentService(CokoContext context)
        {
            this.context = context;
        }

        public IEnumerable<DocumentDto> GetAllBySchoolId(string schoolId)
        {
            _ = schoolId ?? throw new ArgumentNullException();

            var schoolPrivateDocumentIds = Directory.GetFiles($@"\\192.168.88.254\Reports\{schoolId}")
                                             .Select(Path.GetFileNameWithoutExtension)
                                             .Select(fileNameWithoutExtension => fileNameWithoutExtension.Substring(5));

            var schoolLimitedDocumentIds = context.Where(x => x.TypeCode == 2 && x.Available.Split(',').Contains(schoolId));



            return new List<DocumentDto>();
        }
    }
}

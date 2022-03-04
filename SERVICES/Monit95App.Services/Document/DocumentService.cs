using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Services.Document
{
    using System.IO;

    using AutoMapper;

    using Monit95App.Domain.Core.Entities;
    using Monit95App.Infrastructure.Data;
    using Monit95App.Services.Interfaces;

    public class DocumentService : IDocumentService
    {        
        private const string PUBLIC_AND_LIMITED_DOCUMENTS_LINK = @"https://cloud.mail.ru/public/2TP2/UAdxpfhuB/2000";

        #region Dependencies

        private readonly CokoContext context;
        private readonly IPrivateFileService privateFileService;

        #endregion

        public DocumentService(CokoContext context, IPrivateFileService privateFileService)
        {
            this.context = context;
            this.privateFileService = privateFileService;
        }

        public IEnumerable<DocumentDto> GetAllBySchoolId(string schoolId)
        {
            _ = schoolId ?? throw new ArgumentNullException();

            // Get private documents
            var school = this.context.Schools.Find(schoolId);
            if (school == null)
            {
                throw new ArgumentException(nameof(schoolId));
            }

            var privateFileFolderLink = school.ReportLink;
            //var privateFileNames = Directory.GetFiles($@"{DOCUMENTS_ROOT_FOLDER_LINK}\{schoolId}").Select(Path.GetFileName);
            var privateFileNames = privateFileService.GetFileNames(schoolId);

            int currentPrivateDocumentId; // TODO: ask SO why?
            Document currentDocument;
            Mapper.Initialize(cfg => cfg.CreateMap<Document, DocumentDto>());
            var resultDto = new List<DocumentDto>();

            foreach (var fileName in privateFileNames)
            {
                // TODO: refactoring check on null
                currentPrivateDocumentId = Convert.ToInt32(Path.GetFileNameWithoutExtension(fileName)?.Substring(5)); // parse documentId from file's name TODO: //check folder

                currentDocument = this.context.Documents.Find(currentPrivateDocumentId);
                var dto = Mapper.Map<Document, DocumentDto>(currentDocument);
                dto.DocumentLink = $@"{privateFileFolderLink}/{fileName}";
                resultDto.Add(dto);               
            }

            // Get limited and public documents
            var schoolLimitedAndPublicDocumentIds = context.Documents.Where(x => x.Available.IndexOf(schoolId, StringComparison.Ordinal) != -1
                                                                         || x.Available == null).Select(x => x.Id);
            foreach (var currentDocumentId in schoolLimitedAndPublicDocumentIds)
            {
                currentDocument = this.context.Documents.Find(currentDocumentId);

                var dto = Mapper.Map<Document, DocumentDto>(currentDocument);
                dto.DocumentLink = $@"{PUBLIC_AND_LIMITED_DOCUMENTS_LINK}_{currentDocumentId}.rar"; // all public/limited documents have .rar extension    
                resultDto.Add(dto);
            }

            return resultDto;
        }
    }
}

//Link = $@"https://cloud.mail.ru/public/2TP2/UAdxpfhuB/2000_{protectReport.Id}.rar"

//var reportFileNames = iFileNames.GetFileNames(school); //e.g: 0001_201664.zip
//Report report = null;
//List<ReportMeta> reportMetas = new List<ReportMeta>();
//int currentReportCode = 0;
//foreach (var reportFileName in reportFileNames)
//{
//currentReportCode = Convert.ToInt32(reportFileName.Substring(5, 6));
//report = context.Reports.Where(x => x.Id == currentReportCode
//&& x.TypeCode == 1).Single();

//var newReportMeta = Mapper.Map<Report, ReportMeta>(report);
//newReportMeta.Link = $@"{school.ReportLink}/{reportFileName}";
//reportMetas.Add(newReportMeta);

//var schoolPrivateDocumentIds = Directory.GetFiles($@"\\192.168.88.254\Reports\{schoolId}")
//                                        .Select(Path.GetFileNameWithoutExtension)
//                                        .Select(fileNameWithoutExtension => fileNameWithoutExtension.Substring(5));
  
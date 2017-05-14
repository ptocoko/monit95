using SelectPdf;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace ParticipReporter
{
    public class HtmlProcessor
    {
        private readonly string _htmlFolder;
        private readonly string _pdfFolder;

        public HtmlProcessor(string htmlFolder)
        {
            _htmlFolder = htmlFolder;

            //Create folder to store pdf-files
            _pdfFolder = Path.Combine(_htmlFolder, "pdfs"); 
            if (!Directory.Exists(_pdfFolder))
            {
                Directory.CreateDirectory(_pdfFolder);
            }                
        }

        public void Process()
        {    
            var htmlFileNames = Directory.GetFiles(_htmlFolder);
            foreach (var htmlFileName in htmlFileNames)
            {
                var htmlFileContent = File.ReadAllText(htmlFileName);
                
                Task.Run(() =>
                {
                    var htmlToPdf = new HtmlToPdf();
                    var pdfDocument = htmlToPdf.ConvertHtmlString(htmlFileContent);

                    pdfDocument.Save($@"{_pdfFolder}\{Path.GetFileNameWithoutExtension(htmlFileName)}.pdf");
                });
            }            
        }
    }
}

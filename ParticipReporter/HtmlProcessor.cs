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
            Parallel.ForEach(htmlFileNames, htmlName => ConvertToPdf(htmlName));           
        }

        private void ConvertToPdf(string htmlFileName)
        {
            var htmlFileContent = File.ReadAllText(htmlFileName);
            var pdfBytes = (new NReco.PdfGenerator.HtmlToPdfConverter()).GeneratePdf(htmlFileContent);
            using (FileStream fs = new FileStream($@"{_pdfFolder}\{Path.GetFileNameWithoutExtension(htmlFileName)}.pdf", FileMode.Create))
            {
                fs.Write(pdfBytes, 0, pdfBytes.Length);
            }
        }
    }
}

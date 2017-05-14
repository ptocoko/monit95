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

        public void Start()
        {                        
            var htmlFiles = Directory.GetFiles(_htmlFolder);
            foreach (var item in htmlFiles)
            {
                var task = new Task(() => ConvertHtmlToPdf(item));                
                task.Start();
            }          
        }

        private void ConvertHtmlToPdf(string fullFileName)
        {            
            var converter = new HtmlToPdf();

            var pdfDocument = converter.ConvertHtmlString(File.ReadAllText(fullFileName));

            pdfDocument.Save($@"{_pdfFolder}\{Path.GetFileNameWithoutExtension(fullFileName)}.pdf");            
        }
    }
}

//var myThread = new Thread(ConvertHtmlToPdf)
//{
//    Name = "Поток " + i.ToString()
//};

//myThread.Start(report);
//i++;

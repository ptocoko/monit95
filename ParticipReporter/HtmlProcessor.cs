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

        public async void Start()
        {    
            var htmlFiles = Directory.GetFiles(_htmlFolder);

            var processTasks = htmlFiles.Select(htmlFile => Task.Run(() => ConvertHtmlToPdf(htmlFile)));
            await Task.WhenAll(processTasks);
        }

        private void ConvertHtmlToPdf(string htmlFile)
        {
            var converter = new HtmlToPdf();

            var pdfDocument = converter.ConvertHtmlString(File.ReadAllText(htmlFile));

            pdfDocument.Save($@"{_pdfFolder}\{Path.GetFileNameWithoutExtension(htmlFile)}.pdf");
            Console.WriteLine(Thread.CurrentThread.ManagedThreadId);
        }
    }
}

//var myThread = new Thread(ConvertHtmlToPdf)
//{
//    Name = "Поток " + i.ToString()
//};

//myThread.Start(report);
//i++;

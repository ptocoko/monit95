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
            int nWorkerThreads;
            int nCompletionThreads;
            ThreadPool.GetMaxThreads(out nWorkerThreads, out nCompletionThreads);
            Console.WriteLine("Максимальное количество потоков: " + nWorkerThreads
                              + "\nПотоков ввода-вывода доступно: " + nCompletionThreads);

            var htmlFiles = Directory.GetFiles(_htmlFolder);
            //ThreadPool.SetMinThreads(10, 10);
            foreach (var item in htmlFiles)
            {
                ThreadPool.QueueUserWorkItem(ConvertHtmlToPdf, item);
            }          
        }

        private void ConvertHtmlToPdf(object fullFileNameOb)
        {
            var fullFileNameStr = (string)fullFileNameOb;
            var converter = new HtmlToPdf();

            var pdfDocument = converter.ConvertHtmlString(File.ReadAllText(fullFileNameStr));

            pdfDocument.Save($@"{_pdfFolder}\{Path.GetFileNameWithoutExtension(fullFileNameStr)}.pdf");
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

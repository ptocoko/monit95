using Microsoft.Office.Interop.Word;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;
using АИС_МОР.NineClass.Abstract;
using АИС_МОР.NineClass.Entities;
using Word = Microsoft.Office.Interop.Word;

namespace АИС_МОР.NineClass.Concrete
{
    public class CreatorSchoolResult : Creator
    {
        public override Result CreateSchoolResultFromWordTable_(string wordFullFileName)
        {
            return new SchoolResult();
        }
        public SchoolResult CreateSchoolResultFromWordTable(string wordFullFileName)
        {
            SchoolResult result = new SchoolResult();
            Word.Application wordApp = new Word.Application();
            Word.Document doc = wordApp.Documents.Open(wordFullFileName);
            Word.Table table = doc.Tables[1];
            
            result.SchoolID = Path.GetFileName(wordFullFileName).Substring(0, 4);
            result.B = table.Cell(2, 5).Range.Text;
            result.C = table.Cell(3, 5).Range.Text;
            result.D = table.Cell(4, 5).Range.Text;
            result.E = table.Cell(5, 5).Range.Text;
            result.F = table.Cell(6, 5).Range.Text;
            result.G = table.Cell(7, 5).Range.Text;
            result.H = table.Cell(8, 5).Range.Text;
            result.I = table.Cell(9, 5).Range.Text;
            result.J = table.Cell(10, 5).Range.Text;

            string attFullFileName = Path.GetDirectoryName(wordFullFileName) + @"\" + result.SchoolID + @".att";
            result.CountPart = File.ReadLines(attFullFileName).Count() - 2;                        
            
            doc.Close(Type.Missing, Type.Missing, Type.Missing);
            doc = null;
        //    Marshal.ReleaseComObject(wordApp);
            wordApp.Quit(false);
            wordApp = null;
            return result;
        }
    }
}

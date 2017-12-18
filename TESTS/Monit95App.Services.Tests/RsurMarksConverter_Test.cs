using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Monit95App.Infrastructure.Data;
using Monit95App.Services.Rsur.MarksConvert;

namespace Monit95App.Services.Tests
{
    [TestClass]
    public class RsurMarksConverter_Test
    {
        [TestMethod]
        public void TestMethod1()
        {
            var service = new RsurMarksConverter(new CokoContext());

            service.GenerateByParticipTestId(10807);
        }
    }
}

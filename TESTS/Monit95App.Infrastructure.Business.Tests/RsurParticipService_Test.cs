using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Monit95App.Services.Tests
{
    using Monit95App.Infrastructure.Data;
    using Monit95App.Services.DTOs;
    using Monit95App.Services.Rsur;

    [TestClass]
    public class RsurParticipService_Test
    {
        [TestMethod]
        public void Add_Test()
        {
            var context = new CokoContext();
            var service = new RsurParticipService(context);
            var dto = new RsurParticipPostDto
                          {
                              Surname = "test",
                              Name = "...",
                              RsurSubjectCode = 1,
                              CategId = 1,
                              Experience = 0,
                              Phone = "89280168396",
                              Email = "theadamo86@gamil.com",
                              Birthday = new DateTime(1986, 04, 22),
                              ClassNumbers = "1;2",
                              SchoolId = "0001"
                          };
            var code = service.Add(dto);            
        }

        [TestCleanup]
        public void Cleanup()
        {
            
        }
    }
}

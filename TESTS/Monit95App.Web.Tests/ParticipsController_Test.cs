using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Web.Http.Results;
using System.Web.Http.Routing;

using Microsoft.VisualStudio.TestTools.UnitTesting;
using Monit95.WebApp.RESTful_API.iTakeEge;
using Monit95App.Services.ItakeEge.Participant;

namespace Monit95App.Web.Tests
{
    using Monit95App.Domain.Core.Entities;
    using Monit95App.Domain.Interfaces;
    using Monit95App.Infrastructure.Data;

    using NSubstitute;

    [TestClass]
    public class ParticipsController_Test
    {
        static CokoContext context = new CokoContext();
        GenericRepository<Particip> repo = new GenericRepository<Particip>(context);
        IGenericRepository<Particip> mockRepo = Substitute.For<IGenericRepository<Particip>>();

        [TestCleanup]
        public void CleanUp()
        {
            var testEntities = repo.GetAll().Where(x => x.Surname == "Test").ToList();
            foreach (var testEntity in testEntities)
            {
                repo.Delete(testEntity.Id);
            }
        }                                  
    }
}
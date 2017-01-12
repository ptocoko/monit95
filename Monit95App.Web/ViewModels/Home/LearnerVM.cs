using Monit95App.Domain.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Monit95App.ViewModels.Home
{
    public class LearnerVM
    {
        public string Id { get; set; }
        public string SchoolId {get; set;}
        public Learner Learner { get; set; }
        public string AreaIdWithName { get; set; }
        public string SchoolIdWithName { get; set; }

        public LearnerVM()
        {
            Learner = new Learner();
        }

    }
}
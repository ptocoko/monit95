﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Services.OneTwoThree.QuestionProtocol
{
    public class QuestionProtocolDto : QuestionMarkDto
    {
        public string Name { get; set; }
        public int MaxMark { get; set; }
        public string ParticipFIO { get; set; }
        public string TestName { get; set; }
    }
}

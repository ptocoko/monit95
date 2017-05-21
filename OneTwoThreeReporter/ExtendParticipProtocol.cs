﻿using System.Collections.Generic;
using ProtocolGenerator.Interfaces;
using Monit95App.Domain.Core;

namespace ProtocolGenerator
{
    public class ExtendParticipProtocol : ParticipProtocol
    {        
          public Dictionary<Element, double> ElementValues { get; set; } = new Dictionary<Element, double>();
    }
}

﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Services.DTOs
{
    public class PostMarksDto : PutMarksDto
    {        
        [Required]
        public int ParticipTestId { get; set; }    
    }
}

//------------------------------------------------------------------------------
// <auto-generated>
//     Этот код создан по шаблону.
//
//     Изменения, вносимые в этот файл вручную, могут привести к непредвиденной работе приложения.
//     Изменения, вносимые в этот файл вручную, будут перезаписаны при повторном создании кода.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Monit95App.Domain.Core
{
    using System;
    using System.Collections.Generic;
    
    public partial class TestResult
    {
        public int Id { get; set; }
        public int ParticipTestId { get; set; }
        public double PrimaryMark { get; set; }
        public int Grade5 { get; set; }
        public string Marks { get; set; }
        public string Parts { get; set; }
        public string Elements { get; set; }
    
        public virtual ParticipTest ParticipTest { get; set; }
    }
}
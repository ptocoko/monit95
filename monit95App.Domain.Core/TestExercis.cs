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
    
    public partial class TestExercis
    {
        public int Id { get; set; }
        public System.Guid TestId { get; set; }
        public int Number { get; set; }
        public string Name { get; set; }
        public int MaxMark { get; set; }
    
        public virtual Test Test { get; set; }
    }
}

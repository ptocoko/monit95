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
    
    public partial class TestResultsV2
    {
        public int Id { get; set; }
        public int ExerciseMarkId { get; set; }
        public int Grade5 { get; set; }
        public string Skills { get; set; }
    
        public virtual ExerciseMark ExerciseMark { get; set; }
    }
}

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
    
    public partial class AspNetUserLogin
    {
        public string UserId { get; set; }
        public string LoginProvider { get; set; }
        public string ProviderKey { get; set; }
    
        public virtual AspNetUser AspNetUser { get; set; }
    }
}
using Monit95App.Domain.Core;
using Monit95App.Domain.Core.Entities;
using Monit95App.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Monit95App.Models
{
    public static class WishModelCreator
    {
        private static readonly CokoContext _db = new CokoContext();
        public static WishModel Create(Wish wish)
        {
            bool isAreaCode = wish.UserId.Trim().Length == 3;

            return new WishModel
            {
                Id = wish.Id,
                UserId = wish.UserId,
                UserName = isAreaCode ? _db.Areas.First(s => s.Code == int.Parse(wish.UserId)).Name : _db.Schools.First(s => s.Id == wish.UserId).Name,
                Date = wish.Date,
                Message = wish.Message
            };
        }
    }
}
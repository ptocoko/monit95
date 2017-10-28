using Monit95App.Domain.Core.Entities;
using Monit95App.Infrastructure.Data;
using System.Linq;

namespace Monit95App.Models
{
    public static class WishModelCreator
    {
        private static CokoContext _db;
        public static WishModel Create(Wish wish, CokoContext cokoContext)
        {
            _db = cokoContext;
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
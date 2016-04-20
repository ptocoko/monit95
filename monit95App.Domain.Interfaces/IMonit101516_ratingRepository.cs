using monit95App.Domain.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace monit95App.Domain.Interfaces
{
    public interface IMonit101516_ratingRepository
    {
        IQueryable<monit10_1516_rating> All { get; }

        IQueryable<monit10_1516_rating> GetRatingsBySchoolIDandElcode(string schoolID, string elCode);
        void Save();
        void InsertRating(monit10_1516_rating rating);

        void DeleteLearnerRatings(int learnerID);
    }
}

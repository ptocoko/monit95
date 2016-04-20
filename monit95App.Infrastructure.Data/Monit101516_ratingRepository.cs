using monit95App.Domain.Core;
using monit95App.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace monit95App.Infrastructure.Data
{
    public class Monit101516_ratingRepository : IMonit101516_ratingRepository
    {
        private cokoContext context;
        public IQueryable<monit10_1516_rating> All
        {
            get
            {
                return context.monit10_1516_rating;
            }
            
        }
        public void DeleteLearnerRatings(int learnerID)
        {
            var ratings = context.monit10_1516_rating.Where(x=>x.LearnerID == learnerID);
            context.monit10_1516_rating.RemoveRange(ratings);
        }

        public Monit101516_ratingRepository(cokoContext context)
        {
            this.context = context;
        }
        public void InsertRating(monit10_1516_rating rating)
        {
            context.monit10_1516_rating.Add(rating);
        }
        public void Save()
        {
            context.SaveChanges();
        }
        public IQueryable<monit10_1516_rating> GetRatingsBySchoolIDandElcode(string schoolID, string elCode)
        {
            return context.monit10_1516_rating.Where(x => x.monit10_1516_learner.SchoolID == schoolID && x.ElCode == elCode);
        }
    }
}

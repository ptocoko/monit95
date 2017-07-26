using System;
using System.Collections.Generic;
using System.Linq;
using Monit95App.Domain.Core;
using Monit95App.Domain.Interfaces;

namespace Monit95App.Services.Rsur
{   
    public class ProjectParticipRepository : IRepository<ProjectParticip>
    {
        //TODO: посмотреть где тут необходим try...catch
        private cokoContext db;        

        public ProjectParticipRepository(cokoContext db)
        {
            this.db = db;
        }
        public IEnumerable<ProjectParticip> GetAll()
        {            
            return db.ProjectParticips.ToList();
        }
        private RsurParticipPrimaryKey PPrimaryKeyParse(string primaryKey)
        {            
            var primaryKeySplit = primaryKey.Split(';');
            var pk = new RsurParticipPrimaryKey();
            pk.ProjectCode = Int32.Parse(primaryKeySplit[0]);
            pk.ParticipCode = primaryKeySplit[1].ToString();

            return pk;            
        }
        
        public ProjectParticip Get(string primaryKey) //primaryKey = "201661;2016-206-002"
        {
            var pk = PPrimaryKeyParse(primaryKey);

            return db.ProjectParticips.Single(x => x.ProjectCode == pk.ProjectCode && x.ParticipCode == pk.ParticipCode);
        }

        public void Add(ProjectParticip item)
        {
            if (item == null)
            {
                throw new ArgumentNullException("item");
            }
            db.ProjectParticips.Add(item);                      
        }     
        public void Update(ProjectParticip item)
        {
            //TODO : use automapper
            var particip = db.ProjectParticips.Single(x => x.ParticipCode == item.ParticipCode && x.ProjectCode == item.ProjectCode);
            particip.SchoolId = item.SchoolId;
            particip.Surname = item.Surname;
            particip.Name = item.SecondName;
            particip.SecondName = item.SecondName;
            particip.CategId = item.CategId;
            particip.Experience = item.Experience;
            particip.Phone = item.Phone;
            particip.Email = item.Email;            
        }

        public bool Delete(string primaryKey)
        {
            var particip = Get(primaryKey);            
            var deletedEntity = db.ProjectParticips.Remove(particip);                                
            if (deletedEntity != null)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    }
}

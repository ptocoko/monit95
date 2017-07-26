using Monit95App.Services.School;

namespace Monit95App.Services.Interfaces
{
    public interface ISchoolService
    {
        SchoolModel GetModel(string id);
        void Update(string schoolId, SchoolModel model, bool isAdmin);
    }
}

namespace Monit95App.Services.Rsur.MarksConvert
{
    public interface IRsurMarksConverter
    {
        void GenerateByParticipTestId(int participTestId);
        void GenerateByRsurTestId(int rsurTestId);
    }
}
namespace Monit95App.Services.Rsur.MarksConvert
{
    public interface IRsurMarksConverter
    {
        (int grade5, string egeQuestionValues) GenerateByParticipTestId(int participTestId);
        void GenerateByRsurTestId(int rsurTestId);
        void GenerateByRsurTestIds(int[] rsurTestIds);
    }
}
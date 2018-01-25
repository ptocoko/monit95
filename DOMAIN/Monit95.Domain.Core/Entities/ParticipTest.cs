namespace Monit95App.Domain.Core.Entities
{
    /// <summary>
    /// ������� ��������� �������
    /// </summary>
    /// <remarks>������� �� ������� ����������� �������� �������</remarks>
    public partial class ParticipTest
    {
        public int Id { get; set; }
        
        /// <summary>
        /// �������� �������
        /// </summary>
        public virtual Particip Particip { get; set; }
        public int ParticipId { get; set; }

        /// <summary>
        /// ������� �������
        /// </summary>
        public virtual ProjectTest ProjectTest { get; set; }
        public int ProjectTestId { get; set; }               

        #region Computed indicators
        
        /// <summary>
        /// ��������� ����
        /// </summary>
        /// <example>��������� ���� - ����� ������</example>
        /// <remarks>
        /// ���� �� ������� ����� ���� �������� �����, � �������, 1.5,
        /// ������� ��������������� ��� double
        /// </remarks>
        public double PrimaryMark { get; set; }

        /// <summary>
        /// �������� �������
        /// </summary>        
        public int Grade5 { get; set; }

        #endregion
    }
}

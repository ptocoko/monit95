using System.Collections.Generic;

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

        /// <summary>
        /// ����� �� ��������
        /// </summary>
        public virtual ICollection<QuestionMark> QuestionMarks { get; set; } = new HashSet<QuestionMark>();

        public virtual ICollection<OneTwoThreeQuestionMark> OneTwoThreeQuestionMarks { get; set; } = new HashSet<OneTwoThreeQuestionMark>();

        public virtual Result Result { get; set; }

        #region Computed indicators

        /// <summary>
        /// ��������� ����
        /// </summary>
        /// <example>��������� ���� - ����� ������</example>
        /// <remarks>
        /// ���� �� ������� ����� ���� �������� �����, � �������, 1.5,
        /// ������� ��������������� ��� double
        /// </remarks>
        public double? PrimaryMark { get; set; }

        /// <summary>
        /// �������� �������
        /// </summary>        
        /// <remarks>-1 - ������������</remarks>
        public int? Grade5 { get; set; }

        public string GradeString { get; set; }

        #endregion
    }
}

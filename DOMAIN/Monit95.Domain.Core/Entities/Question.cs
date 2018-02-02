﻿using System;

namespace Monit95App.Domain.Core.Entities
{
    /// <summary>
    /// Спецификация задания КИМ
    /// </summary>
    public class Question
    {
        public int Id { get; set; }

        /// <summary>
        /// Работа в которой содержится данное задание
        /// </summary>
        public Test Test { get; set; }
        public Guid TestId { get; set; }

        /// <summary>
        /// Порядковый номер задания в работе Test
        /// </summary>
        public int Order { get; set; }

        /// <summary>
        /// Задание КИМ ЕГЭ к которому относиться данное задание
        /// </summary>
        public virtual EgeQuestion EgeQuestion { get; set; }
        public int EgeQuestionId { get; set; }

        /// <summary>
        /// Максимальный балл, который можно получить по заданию
        /// </summary>
        public int MaxMark { get; set; }     
    }
}
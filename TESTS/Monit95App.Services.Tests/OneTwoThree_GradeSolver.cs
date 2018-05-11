using System;
using System.Collections.Generic;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Monit95App.Domain.Core.Entities;
using Monit95App.Services.OneTwoThree.QuestionProtocol;

namespace Monit95App.Services.Tests
{
    [TestClass]
    public class OneTwoThree_GradeSolver
    {
        ParticipTest pt;
        GradeSolver solver;

        [TestInitialize]
        public void Init()
        {
            solver = new GradeSolver();

            pt = new ParticipTest
            {
                ProjectTestId = 2033,
                OneTwoThreeQuestionMarks = new List<OneTwoThreeQuestionMark>
                {
                    new OneTwoThreeQuestionMark
                    {
                        AwardedMark = 1,
                        OneTwoThreeQuestion = new OneTwoThreeQuestion
                        {
                            Number = 1,
                            IsGeneralPart = true,
                        }
                    },
                    new OneTwoThreeQuestionMark
                    {
                        AwardedMark = 2,
                        OneTwoThreeQuestion = new OneTwoThreeQuestion
                        {
                            Number = 2,
                            IsGeneralPart = true,
                        }
                    },
                    new OneTwoThreeQuestionMark
                    {
                        AwardedMark = 0,
                        OneTwoThreeQuestion = new OneTwoThreeQuestion
                        {
                            Number = 3,
                            IsGeneralPart = true,
                        }
                    },
                    new OneTwoThreeQuestionMark
                    {
                        AwardedMark = 1,
                        OneTwoThreeQuestion = new OneTwoThreeQuestion
                        {
                            Number = 11,
                            IsGeneralPart = true,
                        }
                    },
                    new OneTwoThreeQuestionMark
                    {
                        AwardedMark = 1,
                        OneTwoThreeQuestion = new OneTwoThreeQuestion
                        {
                            Number = 4,
                            IsGeneralPart = true,
                        }
                    },
                    new OneTwoThreeQuestionMark
                    {
                        AwardedMark = 2,
                        OneTwoThreeQuestion = new OneTwoThreeQuestion
                        {
                            Number = 5,
                            IsGeneralPart = true,
                        }
                    },
                    new OneTwoThreeQuestionMark
                    {
                        AwardedMark = 1,
                        OneTwoThreeQuestion = new OneTwoThreeQuestion
                        {
                            Number = 6,
                            IsGeneralPart = true,
                        }
                    },
                    new OneTwoThreeQuestionMark
                    {
                        AwardedMark = 1,
                        OneTwoThreeQuestion = new OneTwoThreeQuestion
                        {
                            Number = 7,
                            IsGeneralPart = true,
                        }
                    },
                    new OneTwoThreeQuestionMark
                    {
                        AwardedMark = 1,
                        OneTwoThreeQuestion = new OneTwoThreeQuestion
                        {
                            Number = 8,
                            IsGeneralPart = true,
                        }
                    },
                    new OneTwoThreeQuestionMark
                    {
                        AwardedMark = 1,
                        OneTwoThreeQuestion = new OneTwoThreeQuestion
                        {
                            Number = 9,
                            IsGeneralPart = true,
                        }
                    },
                }
            };
        }

        [TestMethod]
        public void SolveForRussian()
        {
            solver.SolveForRussian(pt);
            Assert.Fail();
        }
    }
}

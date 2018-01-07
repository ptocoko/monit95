using NSubstitute;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;

namespace Monit95App.Services.Tests.Util
{
    /// <summary>
    /// Класс для мокиннга DbSet
    /// </summary>
    public static class MockDbSet
    {
        /// <summary>
        /// Mocking a collection for DbContext
        /// </summary>
        /// <typeparam name="T">Должен быть ссылочным типом. Это требует DbSet</typeparam>
        /// <param name="fakeCollection"></param>
        /// <returns></returns>
        public static DbSet<T> GetMock<T>(IEnumerable<T> fakeCollection) where T : class
        {
            var queryable = fakeCollection.AsQueryable();
            var mockTset = Substitute.For<DbSet<T>, IQueryable<T>>();

            ((IQueryable<T>)mockTset).Expression.Returns(queryable.Expression);
            ((IQueryable<T>)mockTset).Provider.Returns(queryable.Provider);

            return mockTset;
        }

    }
}

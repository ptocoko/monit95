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
            ((IQueryable<T>)mockTset).ElementType.Returns(queryable.ElementType);
            ((IQueryable<T>)mockTset).GetEnumerator().Returns(queryable.GetEnumerator());

            // mocking Find()
            
            //mockDbSet.Setup(x => x.Find(It.IsAny<object[]>())).Returns<object[]>(x => (sourceList as List<MyFirstSet>)
                                                                //.FirstOrDefault(y => y.MyFirstSetKey == (Guid)x[0]) as T);

            return mockTset;
        }

    }
}

using Moq;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Infrastructure.Data.Tests
{
    public class MockTSetCreator<T> where T : class
    {
        public Mock<DbSet<T>> FactoryMethod(IEnumerable<T> TEntityCollection)
        {
            var mockTSet = new Mock<DbSet<T>>();
            var TList = new List<T>(TEntityCollection);

            //configure mockTSet
            mockTSet.As<IQueryable<T>>().Setup(m => m.Provider).Returns(TList.AsQueryable().Provider);
            mockTSet.As<IQueryable<T>>().Setup(m => m.Expression).Returns(TList.AsQueryable().Expression);
            mockTSet.As<IQueryable<T>>().Setup(m => m.ElementType).Returns(TList.AsQueryable().ElementType);
            mockTSet.As<IQueryable<T>>().Setup(m => m.GetEnumerator()).Returns(TList.GetEnumerator());            

            return mockTSet;
        }
    }
}

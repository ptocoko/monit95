﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Domain.Interfaces
{
    public interface IRepositoryV2<T> where T : class
    {
        IQueryable<T> GetAll();
        T GetById(int id);

        void Insert(T entity);

        void Update(T entity);

        void Delete(int id);
    }
}

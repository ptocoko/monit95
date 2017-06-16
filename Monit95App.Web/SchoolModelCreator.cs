using Monit95App.Domain.Core;
using Monit95App.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Monit95App.Web
{
	public static class SchoolModelCreator
	{       
        public static SchoolModel CreateFullVersion(School _school)
        {
            var model = new SchoolModel
            {
                Id = _school.Id,
                Name = _school.Name,
                AreaName = $"{_school.AreaCode} - {_school.Area.Name }",
                TownTypeName = _school.TownType.Name,
                VPRcode = _school.VprCode,
                Phone = string.IsNullOrEmpty(_school.Phone) ? "Не указан" : _school.Phone,
                Email = _school.Email ?? "Не указан",
                GIAcode = _school.GiaCode ?? 0
            };
            return model;
        }
        
    }
}
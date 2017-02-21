using Monit95App.Domain.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Monit95App.Domain.Core
{
	public static class CreatorSchoolInfo
	{
        public static SchoolBaseInfo CreateBaseVersion(School _school)
        {
            var schoolBaseInfo = new SchoolBaseInfo
            {
                Id = _school.Id,
                Name = _school.Name,
                AreaName = $"{_school.AreaCode} - {_school.Area.Name }",
            };
            return schoolBaseInfo;
        }
        public static SchoolFullInfo CreateFullVersion(School _school)
        {
            var schoolFullInfo = new SchoolFullInfo
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
            return schoolFullInfo;
        }
        
    }
}
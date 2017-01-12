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
                AreaName = $"{_school.AreaId} - {_school.area.AreaName }",
            };
            return schoolBaseInfo;
        }
        public static SchoolFullInfo CreateFullVersion(School _school)
        {
            var schoolFullInfo = new SchoolFullInfo
            {
                Id = _school.Id,
                Name = _school.Name,
                AreaName = $"{_school.AreaId} - {_school.area.AreaName }",

                TownTypeName = _school.towntype.TownTypeName,
                VPRcode = _school.VPRcode,
                Phone = string.IsNullOrEmpty(_school.Phone) ? "Не указан" : _school.Phone,
                Email = _school.Email ?? "Не указан",
                GIAcode = _school.GIAcode ?? 0
            };
            return schoolFullInfo;
        }
        
    }
}
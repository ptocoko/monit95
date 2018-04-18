﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Monit95App.Services.OneTwoThree.Particips;

namespace Monit95.WebApp.RESTful_API.OneTwoThree
{
    [RoutePrefix("api/onetwothree/particips")]//, Authorize(Roles = "school")]
    public class OneTwoThreeParticipsController : ApiController
    {
        private readonly IParticipService participService;

        public OneTwoThreeParticipsController(IParticipService participService)
        {
            this.participService = participService;
        }
        
        [HttpGet, Route("")]
        public IHttpActionResult Get()
        {
            string schoolId = "0005";
            IEnumerable<Particip> dto;

            try
            { 
                dto = participService.GetParticips(schoolId);
            }
            catch(ArgumentNullException)
            {
                return BadRequest();
            }

            return Ok(dto);
        }

        [HttpGet, Route("{id:int}")]
        public IHttpActionResult Get(int id)
        {
            Particip dto;
            try
            {
                dto = participService.GetParticip(id);
            }
            catch (ArgumentException)
            {
                return NotFound();
            }

            return Ok(dto);
        }
    }
}
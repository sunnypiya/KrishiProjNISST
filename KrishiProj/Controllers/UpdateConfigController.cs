using KrishiProj.DataContexts;
using KrishiProj.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Collections.Generic;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace KrishiProj.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UpdateConfigController : ControllerBase
    {
        private readonly DataContext _context;

        public UpdateConfigController(DataContext context)
        {
            _context = context;
        }

        // GET: api/<UpdateConfigController>
        [HttpGet]
        public Response<List<CommonConfigs>> Get()
        {
            var ServiceResponse = new Response<List<CommonConfigs>>();
            ServiceResponse.Data = _context.CommonConfigurations.ToList();
            ServiceResponse.Message = "List of configs";
            ServiceResponse.Success = true;
            return ServiceResponse;
        }

        // GET api/<UpdateConfigController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<UpdateConfigController>
        [HttpPost]
        public Response<CommonConfigs> Post([FromBody] CommonConfigs value)
        {
            var ServiceResponse = new Response<CommonConfigs>();

            if (value is not null)
            {
                _context.CommonConfigurations.Add(value);
                if (_context.SaveChanges() > 0)
                {
                    ServiceResponse.Data = value;
                    ServiceResponse.Message = "Data Added";
                    ServiceResponse.Success = true;
                    return ServiceResponse;
                }
            }

            ServiceResponse.Data = null;
            ServiceResponse.Message = "Data not Added";
            ServiceResponse.Success = false;

            return ServiceResponse;
        }


        // PUT api/<UpdateConfigController>/5
        [HttpPut("{id}")]
        public Response<CommonConfigs> Put(int id, [FromBody] CommonConfigs value)
        {
            var ServiceResponse = new Response<CommonConfigs>();

            if (value is not null)
            {
                CommonConfigs? config = _context.CommonConfigurations.FirstOrDefault(e => (e.Key == value.Key));
                if (config is not null)
                {
                    config.Value = value.Value;
                    _context.Update(config);
                    if (_context.SaveChanges() > 0)
                    {
                        ServiceResponse.Data = config;
                        ServiceResponse.Message = "Data updated";
                        ServiceResponse.Success = true;
                        return ServiceResponse;
                    }
                }

            }

            ServiceResponse.Data = null;
            ServiceResponse.Message = "Data not updated";
            ServiceResponse.Success = false;

            return ServiceResponse;
        }

        // DELETE api/<UpdateConfigController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}

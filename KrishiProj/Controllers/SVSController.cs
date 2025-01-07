using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace KrishiProj.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class SVSController : ControllerBase
    {
        // GET: api/<SVSController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<SVSController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<SVSController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<SVSController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<SVSController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}

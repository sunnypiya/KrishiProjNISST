using KrishiProj.DataContexts;
using KrishiProj.Models;
using Microsoft.AspNetCore.Mvc;

namespace KrishiProj.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    };

        private readonly ILogger<WeatherForecastController> _logger;
        private readonly DataContext _context;

        public WeatherForecastController(ILogger<WeatherForecastController> logger, DataContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpGet]
        public IEnumerable<WeatherForecast> Get()
        {
            _context.Registerations.Add(new Models.Registeration
            {
                Name = "Shyam Kumar",
                FatherName = "Babban Chauhan",
                UniqeCode = Guid.NewGuid(),
                AdharNumber = "1234543543",
                MobileNumber = "70473738",
                Gender = "Male",
                Category = "GEN",
                Village = "Badarpur",
                Block = "D",
                District = "South East",
                CropName = "Rice",
                Year = "2022-23",
                Created = DateTime.Now,
                AdharFilePath = ""
            });
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateTime.Now.AddDays(index),
                TemperatureC = Random.Shared.Next(-20, 55),
                Summary = Summaries[Random.Shared.Next(Summaries.Length)]
            })
            .ToArray();
        }

        [HttpGet]
        [Route("RegisterData")]
        public IEnumerable<Registeration> GetRegisterData()
        {
            _context.Registerations.Add(new Models.Registeration
            {
                Name = "Shyam Kumar",
                FatherName = "Babban Chauhan",
                UniqeCode = Guid.NewGuid(),
                AdharNumber = "1234543543",
                MobileNumber = "70473738",
                Gender = "Male",
                Category = "GEN",
                Village = "Badarpur",
                Block = "D",
                District = "South East",
                CropName = "Rice",
                Year = "2022-23",
                Created = DateTime.Now,
                AdharFilePath = ""
            });
            _context.SaveChanges();

            return Enumerable.Range(1, 5).Select(index => new Registeration
            {
                Name = "Shyam Kumar",
                FatherName = "Babban Chauhan",
                UniqeCode = Guid.NewGuid(),
                AdharNumber = "1234543543",
                MobileNumber = "70473738",
                Gender = "Male",
                Category = "GEN",
                Village = "Badarpur",
                Block = "D",
                District = "South East",
                CropName = "Rice",
                Year = "2022-23",
                Created = DateTime.Now,
                AdharFilePath = ""
            })
            .ToArray();
        }
        [HttpPost]
        public IEnumerable<WeatherForecast> Post(IFormCollection data)
        {

            var Name = data["Name"].ToString();
            var fatherName = data["fatherName"].ToString();
            var adharNumber = data["adharNumber"].ToString();
            var category = data["category"].ToString();
            var gender = data["gender"].ToString();
            var village = data["village"].ToString();
            var block = data["block"].ToString();
            var district = data["district"].ToString();
            var cropName = data["cropName"].ToString();
            var file = data.Files["FileAdhar"];
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateTime.Now.AddDays(index),
                TemperatureC = Random.Shared.Next(-20, 55),
                Summary = Summaries[Random.Shared.Next(Summaries.Length)]
            })
            .ToArray();
        }
    }
}
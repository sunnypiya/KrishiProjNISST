using Microsoft.AspNetCore.Mvc;
using System.IO;
using System.Net;
using System.Text;
// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace KrishiProj.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PushNotifyController : ControllerBase
    {
        private void SendNotification()
        {
            var request = WebRequest.Create("https://onesignal.com/api/v1/notifications") as HttpWebRequest;

            request.KeepAlive = true;
            request.Method = "POST";
            request.ContentType = "application/json; charset=utf-8";

            byte[] byteArray = Encoding.UTF8.GetBytes("{"
                                                    + "\"app_id\": \"74fe74e1-0ae6-4e9a-be04-82e152533c4f\","
                                                    + "\"contents\": {\"en\": \"English Message by application 🚨 🤑\"},"
                                                    + "\"template_id\": \"8c9ca41f-924f-4acc-abc3-1c5097686d8f\","
                                                    + "\"subtitle\": {\"en\": \"Sub-titile Message by application\"},"
                                                    + "\"include_player_ids\": [\"d7374c4a-f993-4b16-ae4b-c305a4d4a077\",\"3b79bc35-c8d4-4893-99c7-ed3eb21d06d2\"]}");

            string responseContent = null;

            try
            {
                using (var writer = request.GetRequestStream())
                {
                    writer.Write(byteArray, 0, byteArray.Length);
                }

                using (var response = request.GetResponse() as HttpWebResponse)
                {
                    using (var reader = new StreamReader(response.GetResponseStream()))
                    {
                        responseContent = reader.ReadToEnd();
                    }
                }
            }
            catch (WebException ex)
            {
                System.Diagnostics.Debug.WriteLine(ex.Message);
                System.Diagnostics.Debug.WriteLine(new StreamReader(ex.Response.GetResponseStream()).ReadToEnd());
            }

            System.Diagnostics.Debug.WriteLine(responseContent);
        }

        // GET: api/<PushNotifyController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            SendNotification();
            return new string[] { "value1", "value2" };
        }

        // GET api/<PushNotifyController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<PushNotifyController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<PushNotifyController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<PushNotifyController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}

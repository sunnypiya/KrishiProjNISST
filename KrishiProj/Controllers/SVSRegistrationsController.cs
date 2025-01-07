using KrishiProj.DataContexts;
using KrishiProj.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace KrishiProj.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class SVSRegistrationsController : ControllerBase
    {
        private readonly DataContext _context;

        public SVSRegistrationsController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<Response<List<Registeration>>> Get()
        {
            var ServiceResponse = new Response<List<Registeration>>();
            ServiceResponse.Data = await _context.Registerations.AsNoTracking().ToListAsync();
            foreach (var item in ServiceResponse.Data)
            {
                item.AppointmentDateFormated = item.AppointmentDateTime.ToString("dd-MM-yyy dddd");
            }
            ServiceResponse.Message = $"{ServiceResponse.Data.Count} record(s).";
            ServiceResponse.Success = true;

            return ServiceResponse;
        }
        [HttpGet("AppointmentList/{Id}")]
        public async Task<Response<List<Registeration>>> Get(string Id)
        {
            var ServiceResponse = new Response<List<Registeration>>();
            string[] ParsedData = Id.Split(':');
            var registerationDetails = new List<Registeration>();
            if (ParsedData.Length == 2)
            {
                var keyName = ParsedData[0];
                var keyValue = ParsedData[1];
                if (keyName == "FirstLoad")
                {
                    registerationDetails = await _context.Registerations.Where(e => e.AppointmentDateTime == DateTime.Now.Date).ToListAsync();
                }
                else
                {
                    if (keyName == "AppointmentDate")
                    {
                        if (ParsedData[1] == "")
                        {
                            registerationDetails = await _context.Registerations.ToListAsync();
                        }
                        else
                        {
                            DateTime appointmentDate = DateTime.Parse(keyValue);
                            registerationDetails = await _context.Registerations.Where(e => e.AppointmentDateTime == appointmentDate).ToListAsync();
                        }
                    }
                    if (keyName == "cropName")
                    {
                        if (ParsedData[1] == "all")
                        {
                            registerationDetails = await _context.Registerations.ToListAsync();
                        }
                        else
                        {
                            registerationDetails = await _context.Registerations.Where(e => e.CropName == ParsedData[1]).ToListAsync();
                        }
                    }
                }
            }

            if (registerationDetails is not null)
            {
                foreach (Registeration registeration in registerationDetails)
                {
                    registeration.TotalRegistration = await _context.Registerations.CountAsync();
                    registeration.AppointmentDateFormated = registeration.AppointmentDateTime.ToString("dd-MM-yyy ddd");
                }
            }

            ServiceResponse.Data = registerationDetails;
            ServiceResponse.Message = $"{registerationDetails.Count} record.";
            ServiceResponse.Success = true;
            return ServiceResponse;
        }

        [HttpGet("{id}")]

        public async Task<Response<Registeration>> Get(Guid id)
        {
            var ServiceResponse = new Response<Registeration>();
            Registeration? registerationDetails = await _context.Registerations.FirstOrDefaultAsync(e => e.UniqeCode == id);
            if (registerationDetails is not null)
            {
                registerationDetails.TotalRegistration = await _context.Registerations.CountAsync();
                //if (registerationDetails.CropName.Trim() == "wheat")
                //{
                //    registerationDetails.CropName = "गेहूँ";
                //}
                //else if (registerationDetails.CropName.Trim() == "rice")
                //{
                //    registerationDetails.CropName = "चावल";
                //}
                registerationDetails.AppointmentDateFormated = registerationDetails.AppointmentDateTime.ToString("dd-MM-yyy dddd");
            }

            ServiceResponse.Data = registerationDetails; // await _context.Registerations.FirstOrDefaultAsync(e => e.UniqeCode.ToString() == id);
            ServiceResponse.Message = "1 record.";
            ServiceResponse.Success = true;
            return ServiceResponse;
        }

        //[HttpGet("{Data}")]
        //[Route("[controller]/FilteredData")]
        //public async Task<Response<List<Registeration>>> FilteredData(string Data)
        //{
        //    var ServiceResponse = new Response<List<Registeration>>();
        //    var ParsedData = Data.Split(':');
        //    List<Registeration>? registerationDetails = new List<Registeration>();
        //    if (ParsedData.Length == 2)
        //    {
        //         registerationDetails = await _context.Registerations.Where(e => e.CropName == ParsedData[0]).ToListAsync();//.Select(e => e.CropName.ToString() == ParsedData[1].ToString()).ToListAsync();
        //    }
        //    else
        //    {

        //    }

        //    if (registerationDetails is not null)
        //    {
        //        foreach (Registeration registeration in registerationDetails)
        //        {
        //            registeration.TotalRegistration = await _context.Registerations.CountAsync();
        //            registeration.AppointmentDateFormated = registeration.AppointmentDateTime.ToString("dd-MM-yyy dddd");
        //        }


        //    }

        //    ServiceResponse.Data = registerationDetails; //await _context.Registerations.FirstOrDefaultAsync(e => e.UniqeCode.ToString() == Data);
        //    ServiceResponse.Message = "1 record.";
        //    ServiceResponse.Success = true;
        //    return ServiceResponse;
        //}



        [HttpPost]
        public async Task<Response<Registeration>> Post(IFormCollection data)
        {

            var ServiceResponse = new Response<Registeration>();
            var UniqeCode = Guid.NewGuid();
            var config_Is_SVS_Form_On = _context.CommonConfigurations.FirstOrDefaultAsync(e => e.Key == "Is_SVS_Form_On").Result;
            if (config_Is_SVS_Form_On?.Value == "1")
            {
                try
                {
                    var Name = data["Name"].ToString();
                    var fatherName = data["fatherName"].ToString();
                    var adharNumber = data["adharNumber"].ToString();
                    var category = data["category"].ToString();
                    var mobile = data["mobile"].ToString();
                    var gender = data["gender"].ToString();
                    var village = data["village"].ToString();
                    var block = data["block"].ToString();
                    var district = data["district"].ToString();
                    var cropName = data["cropName"].ToString();
                    var file = data.Files["FileAdhar"];

                    string path = "";
                    string FileName = "";
                    bool isFileUploaded = false;
                    string year = $"{DateTime.Now.Year}-{DateTime.Now.Year + 1}";
                    bool isWheat = cropName.Contains("गेहूँ");
                    Registeration? registerationDetails;

                    if (isWheat)
                    {
                        registerationDetails =
                        await _context.Registerations.FirstOrDefaultAsync(e => ((e.CropName.Trim().Contains("गेहूँ")) && e.AdharNumber.Trim() == adharNumber.Trim() && e.Year == year));
                    }
                    else
                    {
                        registerationDetails =
                        await _context.Registerations.FirstOrDefaultAsync(e => ((e.CropName.ToLower().Trim() == cropName.ToLower().Trim()) && e.AdharNumber.Trim() == adharNumber.Trim() && e.Year == year));
                    }

                    if (registerationDetails is not null)
                    {
                        ServiceResponse.Success = false;
                        ServiceResponse.Message = $"You have already registered for [{cropName}] with this Adhar Number [{adharNumber}] in this year [{DateTime.Now.Year}-{DateTime.Now.Year + 1}].";
                        return ServiceResponse;
                    }


                    try
                    {
                        if (file != null)
                        {
                            if (file.Length > 0)
                            {
                                path = Path.GetFullPath(Path.Combine(Environment.CurrentDirectory, "wwwroot/UploadedFiles"));
                                if (!Directory.Exists(path))
                                {
                                    Directory.CreateDirectory(path);
                                }
                                FileName = $"{UniqeCode.ToString().Substring(0, 7)}_{file.FileName}";
                                using (var fileStream = new FileStream(Path.Combine(path, FileName), FileMode.Create))
                                {
                                    await file.CopyToAsync(fileStream);
                                }

                                isFileUploaded = true;
                            }
                            else
                            {
                                isFileUploaded = false;
                            }
                        }
                    }
                    catch (Exception ex)
                    {
                        isFileUploaded = false;
                        ServiceResponse.Message = $"File Copy Failed :- {ex.Message}";
                    }

                    if (isFileUploaded)
                    {
                        DateTime dt = DateTime.Now;
                        DateTime? CalculatedAppointmentDate = null;
                        int MaxSlotValue = int.Parse(_context.CommonConfigurations.FirstOrDefault(e => e.Key == "PerDayLimit").Value);
                        int MAXSLOT = MaxSlotValue;
                        int Days = 1;
                        bool firstTime = false;
                        string AppointmentShift = "";
                        while (Days != -1)
                        {
                            while (CalculatedAppointmentDate == null)
                            {
                                var newDate = dt.AddDays(Days).Date.ToShortDateString();
                                var lastAppointmentDate = DateTime.Now;

                                if (_context.Registerations.OrderByDescending(e => e).ToList().Count > 0)
                                {
                                    lastAppointmentDate = _context.Registerations.OrderByDescending(e => e).ToList()[0].AppointmentDateTime;
                                    if (lastAppointmentDate.Date <= DateTime.Now.Date)
                                    {
                                        lastAppointmentDate = DateTime.Now.Date;
                                        Days = Days + 1;
                                    }
                                    firstTime = false;
                                }
                                else
                                {
                                    lastAppointmentDate = lastAppointmentDate.AddDays(1);
                                    firstTime = true;
                                }

                                var count = await _context.Registerations.CountAsync(e => e.AppointmentDateTime.Date == lastAppointmentDate.Date);
                                //var count = _context.Registerations.Count(e => dt.AddDays(Days).Date == (e.AppointmentDateTime.Date.AddDays(Days-1)));
                                if (count < MaxSlotValue)
                                {
                                    //CalculatedAppointmentDate = dt.AddDays(Days);
                                    int HalfSlot = MAXSLOT / 2;
                                    if (firstTime)
                                    {
                                        CalculatedAppointmentDate = lastAppointmentDate;

                                        //Incrementing appointment day by 1 if there are some kind of holiday.
                                        if (CalculatedAppointmentDate.Value.DayOfWeek.ToString().ToLower() == "sunday")
                                        {
                                            CalculatedAppointmentDate = CalculatedAppointmentDate.Value.AddDays(1);
                                        }
                                        //if (lastAppointmentDate.Date == DateTime.Now.Date)
                                        //{
                                        //    CalculatedAppointmentDate = lastAppointmentDate.AddDays(Days - 1);
                                        //}
                                        //else
                                        //{
                                        //    CalculatedAppointmentDate = lastAppointmentDate;
                                        //}
                                        if (count <= HalfSlot)
                                        {
                                            AppointmentShift = AppointmentShiftConstant.MorningShiftTiming;
                                        }
                                        else
                                        {
                                            AppointmentShift = AppointmentShiftConstant.AfterNoonShiftTiming;
                                        }
                                    }
                                    else
                                    {
                                        //_context.Registerations.OrderByDescending(e => e).ToList().Count;
                                        CalculatedAppointmentDate = lastAppointmentDate.AddDays(Days - 1);

                                        //Incrementing appointment day by 1 if there are some kind of holiday.
                                        if (CalculatedAppointmentDate.Value.DayOfWeek.ToString().ToLower() == "sunday")
                                        {
                                            CalculatedAppointmentDate = CalculatedAppointmentDate.Value.AddDays(1);
                                        }

                                        if (count <= HalfSlot)
                                        {
                                            AppointmentShift = AppointmentShiftConstant.MorningShiftTiming;
                                        }
                                        else
                                        {
                                            if (_context.Registerations.Count(e => e.AppointmentDateTime.Date == CalculatedAppointmentDate.Value.Date) == 0)
                                            {
                                                AppointmentShift = AppointmentShiftConstant.MorningShiftTiming;
                                            }
                                            else
                                            {
                                                AppointmentShift = AppointmentShiftConstant.AfterNoonShiftTiming;
                                            }
                                        }
                                    }
                                }

                                MaxSlotValue += 2;
                                Days += 1;
                            }
                            if (CalculatedAppointmentDate == null)
                            {
                                Days += 1;
                            }
                            else
                            {
                                Days = -1;
                            }
                        }


                        _context.Registerations.Add(new Registeration
                        {
                            Name = Name,
                            FatherName = fatherName,
                            UniqeCode = UniqeCode,
                            AdharNumber = adharNumber,
                            MobileNumber = mobile,
                            Gender = gender,
                            Category = category,
                            Village = village,
                            Block = block,
                            District = district,
                            CropName = cropName,
                            Year = $"{DateTime.Now.Year}-{DateTime.Now.Year + 1}",
                            Created = DateTime.Now,
                            AdharFilePath = FileName,
                            AppointmentDateTime = CalculatedAppointmentDate == null ? DateTime.Now : CalculatedAppointmentDate.Value,
                            IsAppointmentAssigned = true,
                            AppointmentShift = AppointmentShift
                        });
                        _context.SaveChanges();
                        ServiceResponse.Data = await _context.Registerations.FirstOrDefaultAsync(r => r.UniqeCode == UniqeCode);
                        ServiceResponse.Success = true;
                        ServiceResponse.Message = "Data Saved";
                    }
                    else
                    {
                        ServiceResponse.Success = false;
                    }

                }
                catch (Exception exOuter)
                {
                    ServiceResponse.Success = false;
                    ServiceResponse.Message = $"Registration Failed :- {exOuter.Message}";
                }
            }
            else
            {
                ServiceResponse.Success = false;
                ServiceResponse.Message = $"Registration Failed:- Registration are closed now.";
            }


            return ServiceResponse;
        }


        [HttpPost("{Id}")]
        public async Task<Response<Registeration>> Delete(int Id)
        {
            var ServiceResponse = new Response<Registeration>();
            var registeration = await _context.Registerations.FirstOrDefaultAsync(e => e.Id.Equals(Id));
            if (registeration is not null)
            {
                ServiceResponse.Success = true;
                ServiceResponse.Data = registeration;
                ServiceResponse.Message = $"This {Id} is deleted successfully";
                _context.Registerations.Remove(registeration);
                await _context.SaveChangesAsync();
            }
            else
            {
                ServiceResponse.Success = false;
                ServiceResponse.Data = null;
                ServiceResponse.Message = $"This {Id} is not deleted successfully";
            }
            return ServiceResponse;
        }
    }
}

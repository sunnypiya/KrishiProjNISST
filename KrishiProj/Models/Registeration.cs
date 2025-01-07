using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace KrishiProj.Models
{
    public class Registeration
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        public Guid UniqeCode { get; set; }

        [Required]
        public string Name { get; set; } = "";
        [Required]
        public string FatherName { get; set; } = "";
        [Required]
        public string AdharNumber { get; set; } = "";
        [Required]
        //[MaxLength(12)]
        public string MobileNumber { get; set; } = "";
        [Required]
        public string Category { get; set; } = "";
        [Required]
        public string Gender { get; set; } = "";
        [Required]
        public string Village { get; set; } = "";
        [Required]
        public string Block { get; set; } = "";
        [Required]
        public string District { get; set; } = "";
        [Required]
        public string CropName { get; set; } = "";
        [Required]
        public string AdharFilePath { get; set; } = "";
        public string Year { get; set; } = "";

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public DateTime Created { get; set; } = DateTime.Now;

        public DateTime AppointmentDateTime { get; set; }
        public bool IsAppointmentAssigned { get; set; } = false;

        [NotMapped]
        public int TotalRegistration { get; set; } = 0;
        public string AppointmentShift { get; set; } = "";
        [NotMapped]
        public string AppointmentDateFormated { get; set; } = "";
    }
}


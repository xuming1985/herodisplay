using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GameDisplay.Domain
{
    [Table("BUser")]
    public class BUser
    {
        [Key]
        public int Id { get; set; }

        public string Account { get; set; }

        public string Password { get; set; }

        public string RealName { get; set; }

        public string Email { get; set; }

        public string Telephone { get; set; }

        public BRole Role { get; set; }

        public int? CreateUser { get; set; }

        public DateTime CreateTime { get; set; }
    }
}

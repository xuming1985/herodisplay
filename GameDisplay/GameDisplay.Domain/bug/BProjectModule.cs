using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GameDisplay.Domain
{
    [Table("BProjectModule")]
    public class BProjectModule
    {
        [Key]
        public int Id { get; set; }

        public int ProjectId { get; set; }

        public string Name { get; set; }

        public string Desc { get; set; }

        public string CreateUser { get; set; }

        public DateTime CreateTime { get; set; }
    }
}

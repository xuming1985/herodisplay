using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GameDisplay.Domain
{
    [Table("BProject")]
    public class BProject
    {
        [Key]
        public int Id { get; set; }

        public string Name { get; set; }

        public string Desc { get; set; }

        public int CreateUser { get; set; }

        public DateTime CreateTime { get; set; }
    }
}

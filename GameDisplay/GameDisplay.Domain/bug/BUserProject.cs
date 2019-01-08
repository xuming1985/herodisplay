using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GameDisplay.Domain
{
    [Table("BUserProject")]
    public  class BUserProject
    {
        [Key]
        public int Id { get; set; }

        public int UserId { get; set; }

        public int ProjectId { get; set; }

        public string CreateUser { get; set; }

        public DateTime CreateTime { get; set; }
    }
}

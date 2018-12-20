using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GameDisplay.Domain
{
    [Table("BProject")]
    public class BugItem
    {
        [Key]
        public int Id { get; set; }

        public string Title { get; set; }

        public string Desc { get; set; }




        public int CreateUser { get; set; }

        public DateTime CreateTime { get; set; }
    }
}

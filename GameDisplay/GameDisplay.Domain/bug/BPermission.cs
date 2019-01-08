using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GameDisplay.Domain
{
    [Table("BPermission")]
    public class BPermission
    {
        [Key]
        public int Id { get; set; }

        public string Name { get; set; }
    }
}

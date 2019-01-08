using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GameDisplay.Domain
{
    [Table("BugItemMemo")]
    public class BugItemMemo
    {
        [Key]
        public int Id { get; set; }

        public int BugItemId { get; set; }

        public string Color { get; set; }

        public string Content { get; set; }
    }
}

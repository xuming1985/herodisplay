using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GameDisplay.Domain
{
    [Table("BugAttachment")]
    public class BugAttachment
    {
        [Key]
        public int Id { get; set; }

        public int BugItemId { get; set; }

        public string Name { get; set; }

        public string Path { get; set; }

        //创建人
        public int CreateUser { get; set; }

        //问题创建时间
        public DateTime CreateTime { get; set; }
    }
}

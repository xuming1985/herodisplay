using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GameDisplay.Domain
{
    [Table("BugItemTimeLine")]
    public class BugItemTimeLine
    {
        [Key]
        public int Id { get; set; }

        public int BugItemId { get; set; }

        public string StatusFrom { get; set; }

        public string StatusTo { get; set; }

        public string Content { get; set; }

        public int OperateUser { get; set; }

        public DateTime CreateTime { get; set; }
    }
}

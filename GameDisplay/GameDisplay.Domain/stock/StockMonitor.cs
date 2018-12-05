using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GameDisplay.Domain
{
    [Table("StockMonitor")]
    public class StockMonitor
    {
        [Key]
        public long Id { get; set; }

        public string Name { get; set; }

        public string Code { get; set; }

        public string Category { get; set; }

        //顺序
        public int Index { get; set; }
    }
}

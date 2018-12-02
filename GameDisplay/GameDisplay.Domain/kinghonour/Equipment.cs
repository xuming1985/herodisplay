using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GameDisplay.Domain
{
    /// <summary>
    /// 装备
    /// </summary>
    [Table("Equipment")]
    public class Equipment
    {
        [Key]
        public int Id { get; set; }

        //类别 红绿蓝
        public InscriptionCategory Category { get; set; }

        //技能名称
        public string Name { get; set; }

        //技能图标
        public string Thumbnail { get; set; }

        public int BuyPrice { get; set; }

        public int SellPrice { get; set; }

        //描述
        public string Desc1 { get; set; }

        public string Desc2 { get; set; }

        public int Index { get; set; }
    }
}

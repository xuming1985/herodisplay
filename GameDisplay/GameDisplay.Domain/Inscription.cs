using GameDisplay.Domain.Enum;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GameDisplay.Domain
{
    /// <summary>
    /// 铭文
    /// </summary>
    [Table("Inscription")]
    public class Inscription
    {
        [Key]
        public int Id { get; set; }

        //类别 红绿蓝
        public InscriptionCategory Category { get; set; }

        //技能名称
        public string Name { get; set; }

        //技能图标
        public string Thumbnail { get; set; }

        //描述
        public string Description { get; set; }

        public int Index { get; set; }
    }
}

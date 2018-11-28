using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GameDisplay.Domain
{
    [Table("HeroSkill")]
    public class HeroSkill
    {
        [Key]
        public int Id { get; set; }
        //英雄
        public long HeroId { get; set; }
        //技能名称
        public string SkillName { get; set; }
        //技能图标
        public string Thumbnail { get; set; }
        //冷却时间
        public string CoolingTime { get; set; }
        //消耗
        public string Consume { get; set; }
        //描述
        public string Description { get; set; }
        //备注
        public string Remark { get; set; }

        public int Index { get; set; }
    }
}

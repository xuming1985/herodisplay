using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GameDisplay.Domain
{
    [Table("HeroSkillAdvised")]
    public class HeroSkillAdvised
    {
        [Key]
        public int Id { get; set; }
        //英雄
        public long HeroId { get; set; }
        //主升级 技能名称
        public int MajorSkill { get; set; }
        //次升级 技能名称
        public int MinorSkill { get; set; }
        //召唤师技能1
        public int CommonSkill { get; set; }
        //召唤师技能2
        public int CommonSkill2 { get; set; }
    }
}

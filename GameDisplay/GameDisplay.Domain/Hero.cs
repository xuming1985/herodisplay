using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GameDisplay.Domain
{
    [Table("Hero")]
    public class Hero
    {
        [Key]
        public long Id { get; set; }

        public string Name { get; set; }

        public string Category { get; set; }

        public string Category2 { get; set; }

        //生存能力
        public int Viability { get; set; }

        //攻击能力
        public int AttackAbility { get; set; }

        //技能效果
        public int SkillEffect { get; set; }

        //使用难度
        public int Difficulty { get; set; }


    }
}

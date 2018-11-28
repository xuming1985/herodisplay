using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GameDisplay.Domain
{
    /// <summary>
    /// 召唤师技能
    /// </summary>
    [Table("SummonerSkill")]
    public class SummonerSkill
    {
        [Key]
        public int Id { get; set; }
        //技能名称
        public string SkillName { get; set; }
        //技能图标
        public string Thumbnail { get; set; }
        //展示图片
        public string DisplayImage { get; set; }
        //条件
        public string Condition { get; set; }
        //描述
        public string Description { get; set; }


        public int Index { get; set; }
    }
}

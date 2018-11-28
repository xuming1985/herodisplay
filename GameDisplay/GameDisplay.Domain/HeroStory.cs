using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GameDisplay.Domain
{
    [Table("HeroStory")]
    public class HeroStory
    {
        [Key]
        public int Id { get; set; }

        public long HeroId { get; set; }
        //故事类别
        public string Category { get; set; }
        //故事内容
        public string Content { get; set; }

        public int Index { get; set; }
    }
}

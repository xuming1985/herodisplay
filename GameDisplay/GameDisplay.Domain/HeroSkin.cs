using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GameDisplay.Domain
{
    [Table("HeroSkin")]
    public class HeroSkin
    {
        [Key]
        public int Id { get; set; }

        public long HeroId { get; set; }

        public string SkinName { get; set; }

        public string Thumbnail { get; set; }

        public string BackgroundImage { get; set; }

        public int Index { get; set; }
    }
}

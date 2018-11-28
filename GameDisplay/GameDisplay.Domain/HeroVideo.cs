using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GameDisplay.Domain
{
    [Table("HeroVideo")]
    public class HeroVideo
    {
        [Key]
        public int Id { get; set; }

        public long HeroId { get; set; }

        public string Path { get; set; }

        public int Index { get; set; }
    }
}

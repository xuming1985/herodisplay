using System.Collections.Generic;

namespace GameDisplay.Dto
{
    public class TreeItem
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public List<TreeItem> Children { get; set; }
    }
}

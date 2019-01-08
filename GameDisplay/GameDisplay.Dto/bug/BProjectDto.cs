using System;
using System.Collections.Generic;

namespace GameDisplay.Dto
{
    public class BProjectDto
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Desc { get; set; }

        public bool IsActive { get; set; }

        public int CreateUser { get; set; }

        public string CreateUserName { get; set; }

        public DateTime CreateTime { get; set; }

        public List<BItem> Modules { get; set; }

        public List<BItem> Members { get; set; }
    }
}

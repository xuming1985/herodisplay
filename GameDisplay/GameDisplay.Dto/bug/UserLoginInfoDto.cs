using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GameDisplay.Dto
{
    public class UserLoginInfoDto
    {
        public BUserDto User { get; set; }

        public string[] Roles { get; set; } 

        public bool IsAdmin { get; set; }
    }
}

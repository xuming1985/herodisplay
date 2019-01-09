using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GameDisplay.Dto
{
   public  class PasswordResetDto
    {
        public int UserId { get; set; }

        public string Old { get; set; }

        public string New { get; set; }

        public string NewConfirm { get; set; }
    }
}

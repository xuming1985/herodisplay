using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GameDisplay.Dto
{
    public class OperateResult
    {
        public bool Success { get; set; }
        public string Message { get; set; }

        public OperateResult()
        {

        }

        public OperateResult(bool success)
        {
            Success = success;
        }
    }
}

using System;
using System.Collections.Generic;

namespace GameDisplay.Dto
{
    public class TimeDiagramDto
    {
        public decimal MinValue { get; set; }
        public decimal MaxValue { get; set; }
        public List<decimal> Values { get; set; }

        public TimeDiagramDto()
        {
            Values = new List<decimal>();
        }
    }
}

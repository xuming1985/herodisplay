using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GameDisplay.Dto
{
    public class StockMonitorDto
    {

        public string Name { get; set; }

        public string Code { get; set; }

        public string Category { get; set; }

        //当前价格
        public decimal CurrentPrice { get; set; }
        //涨跌额
        public decimal FloatingPrice { get; set; }
        //涨跌幅度
        public decimal FloatingRate { get; set; }

        //顺序
        public int Index { get; set; }
    }
}

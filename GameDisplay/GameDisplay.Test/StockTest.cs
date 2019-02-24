using GameDisplay.Dto;
using GameDisplay.Service;
using System;
using System.Collections.Generic;

namespace GameDisplay.Test
{
    public class StockTest
    {
        StockMonitorService service = new StockMonitorService();

        public void TestMonitor()
        {
            var list = new List<string>() { "sh000001", "sz000952", "sz600535" };
            
            foreach (var l in list)
            {
                StockMonitorDto dto = service.GetDetail(l);
                if (dto.FloatingPrice > 0)
                {
                    Console.ForegroundColor = ConsoleColor.Red;
                }
                else if (dto.FloatingPrice < 0)
                {
                    Console.ForegroundColor = ConsoleColor.Green;
                }
                else
                {
                    Console.ForegroundColor = ConsoleColor.White;
                }

                Console.WriteLine(string.Format("code: {0}  price:{1},  float:{2}%", dto.Code, dto.CurrentPrice, dto.FloatingRate));
            }
        }
    }
}

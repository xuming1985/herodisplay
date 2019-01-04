using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace GameDisplay.Test
{
    class Program
    {
        static void Main(string[] args)
        {
            StockTest test = new StockTest();
            while (true)
            {
                Console.WriteLine(string.Format("{0}", DateTime.Now.ToLongTimeString()));
                test.TestMonitor();
                Console.WriteLine("----------------------------------------------------------------------");
                Thread.Sleep(1000*10);
            }
        }
    }
}

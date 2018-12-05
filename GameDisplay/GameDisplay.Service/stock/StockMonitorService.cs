using GameDisplay.Domain;
using System.Collections.Generic;
using System.Linq;

namespace GameDisplay.Service
{
    public class StockMonitorService
    {
        public List<StockMonitor> GetAll()
        {
            using (var db = new GameDataContext())
            {
                return db.StockMonitors.ToList();
            }
        }
    }
}

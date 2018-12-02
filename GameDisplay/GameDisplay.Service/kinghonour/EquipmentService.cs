using GameDisplay.Domain;
using System.Collections.Generic;
using System.Linq;

namespace GameDisplay.Service
{
    public class EquipmentService
    {
        public List<Equipment> GetAll()
        {
            using (var db = new GameDataContext())
            {
                return db.Equipments.OrderBy(o=>o.Index).ToList();
            }
        }
    }
}

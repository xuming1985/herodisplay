using GameDisplay.Domain;
using System.Collections.Generic;
using System.Linq;

namespace GameDisplay.Service
{
    public class HeroService
    {
        public List<Hero> GetAllHeros()
        {
            using (var db = new GameDataContext())
            {
                return db.Heroes.ToList();
            }
        }
    }
}

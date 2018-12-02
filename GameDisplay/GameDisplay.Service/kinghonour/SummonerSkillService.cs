using GameDisplay.Domain;
using System.Collections.Generic;
using System.Linq;

namespace GameDisplay.Service
{
    public class SummonerSkillService
    {
        public List<SummonerSkill> GetAll()
        {
            using (var db = new GameDataContext())
            {
                return db.SummonerSkills.ToList();
            }
        }
    }
}

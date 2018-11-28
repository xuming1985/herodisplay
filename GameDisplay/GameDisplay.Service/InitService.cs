using GameDisplay.Domain;
using System.Collections.Generic;
using System.Linq;

namespace GameDisplay.Service
{
    public class InitService
    {
        public void InitData()
        {
            using (var db = new GameDataContext())
            {
                InitSummonerSkill(db);
            }
        }

        /// <summary>
        /// 初始化召唤师技能
        /// </summary>
        /// <param name="context"></param>
        private void InitSummonerSkill(GameDataContext context)
        {
            var ids = new List<int>()
            {
                80104, 80108, 80110, 80109,80102, 80105, 80103, 80107, 80121, 80115
            };
            var names = new List<string>()
            {
                "惩击", "终结", "狂暴", "疾跑", "治疗术", "干扰", "晕眩", "净化", "弱化", "闪现"
            };
            var conditions = new List<string>()
            {
                "LV.1解锁", "LV.3解锁", "LV.5解锁", "LV.7解锁", "LV.9解锁", "LV.11解锁", "LV.13解锁", "LV.15解锁", "LV.17解锁", "LV.19解锁"
            };
            var descriptions = new List<string>()
            {
                "30秒CD：对身边的野怪和小兵造成真实伤害并眩晕1秒",
                "90秒CD：立即对身边敌军英雄造成其已损失生命值14%的真实伤害",
                "60秒CD：增加攻击速度60%，并增加物理攻击力10%持续5秒",
                "100秒CD：增加30%移动速度持续10秒",
                "120秒CD：回复自己与附近队友15%生命值，提高附近友军移动速度15%持续2秒",
                "60秒CD：沉默机关持续5秒",
                "90秒CD：晕眩身边所有敌人0.75秒，并附带持续1秒的减速效果",
                "120秒CD：解除自身所有负面和控制效果并免疫控制持续1.5秒",
                "90秒CD：减少身边敌人伤害输出50%持续3秒。",
                "120秒CD：向指定方向位移一段距离"
            };

            for (var i=0; i< ids.Count();i++)
            {
                var entity = new SummonerSkill();
                entity.Id = ids[i];
                entity.SkillName = names[i];
                entity.Thumbnail = @"Images\summoner\" + ids[i] + ".jpg";
                entity.DisplayImage = @"Images\summoner\" + ids[i] + "-big.jpg";
                entity.Condition = conditions[i];
                entity.Description = descriptions[i];
                entity.Index = i + 1;

                context.SummonerSkills.Add(entity);
                context.SaveChanges();
            }

        }
    }
}

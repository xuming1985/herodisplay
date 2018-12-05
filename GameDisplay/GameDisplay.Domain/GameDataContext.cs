using SQLite.CodeFirst;
using System.Data.Entity;

namespace GameDisplay.Domain
{
    public  class GameDataContext: DbContext
    {
        #region 王者荣耀

        public DbSet<Hero> Heroes { get; set; }
        public DbSet<HeroSkin> HeroSkins { get; set; }
        public DbSet<HeroSkill> HeroSkills { get; set; }
        public DbSet<HeroSkillAdvised> HeroSkillAdviseds { get; set; }
        public DbSet<HeroVideo> HeroVideos { get; set; }
        public DbSet<HeroStory> HeroStories { get; set; }

        public DbSet<SummonerSkill> SummonerSkills { get; set; }
        public DbSet<Inscription> Inscriptions { get; set; }
        public DbSet<Equipment> Equipments { get; set; }

        #endregion

        #region 股票
        //我得自选
        public DbSet<StockMonitor> StockMonitors { get; set; }

        #endregion

        public GameDataContext()
            : base("SqliteConnection")
        {

        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            var initializer = new SqliteDropCreateDatabaseWhenModelChanges<GameDataContext>(modelBuilder);
            Database.SetInitializer(initializer);
        }
    }
}

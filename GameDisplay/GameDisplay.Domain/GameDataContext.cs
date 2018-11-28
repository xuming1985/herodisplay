using SQLite.CodeFirst;
using System.Data.Entity;

namespace GameDisplay.Domain
{
    public  class GameDataContext: DbContext
    {
        public DbSet<Hero> Heroes { get; set; }
        public DbSet<HeroSkin> HeroSkins { get; set; }
        public DbSet<HeroSkill> HeroSkills { get; set; }
        public DbSet<HeroSkillAdvised> HeroSkillAdviseds { get; set; }
        public DbSet<HeroVideo> HeroVideos { get; set; }
        public DbSet<HeroStory> HeroStories { get; set; }

        public DbSet<SummonerSkill> SummonerSkills { get; set; }
        public DbSet<Inscription> Inscriptions { get; set; }
        public DbSet<Equipment> Equipments { get; set; }

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

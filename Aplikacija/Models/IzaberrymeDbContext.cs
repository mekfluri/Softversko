namespace Models;

public class IzaberryMeDbContext : DbContext {
    public DbSet<Student> Studenti { get; set; }
    public DbSet<Kalendar> Kalendari { get; set; }
    public DbSet<Komentar> Komentari { get; set; }
    public DbSet<Ocena> Ocene { get; set; }
    public DbSet<Preference> Preference { get; set; }
    public DbSet<Tag> Tagovi { get; set; }
    public IzaberryMeDbContext(DbContextOptions<IzaberryMeDbContext> opts) : base(opts){}

    protected override void OnModelCreating(ModelBuilder modelBuilder){
        modelBuilder.Entity<Student>()
        .HasOne<Kalendar>((s) => s.Kalendar)
        .WithOne(ad => ad.Student)
        .HasForeignKey<Kalendar>(k => k.Id);
    }
}
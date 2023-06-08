namespace Models;

public class IzaberryMeDbContext : DbContext
{
    public DbSet<Student> Studenti { get; set; }
    public DbSet<Kalendar> Kalendari { get; set; }
    public DbSet<Komentar> Komentari { get; set; }
    public DbSet<Ocena> Ocene { get; set; }
    public DbSet<Preference> Preference { get; set; }
    public DbSet<Tag> Tagovi { get; set; }
    public DbSet<Predmet> Predmeti { get; set; }
    public DbSet<Datum> Datumi { get; set; }
    public DbSet<Modul> Moduli { get; set; }
    public DbSet<Literatura> Literature { get; set; }
    public DbSet<Mentor> Mentori { get; set; }
    public DbSet<MentorRequest> MentorZahtevi { get; set; }
    public DbSet<Note> Notes { get; set; }
    public DbSet<Zahtev> Zahtevi { get; set; }

    public DbSet<Admin> Administratori { get; set; }
    public IzaberryMeDbContext(DbContextOptions<IzaberryMeDbContext> opts) : base(opts) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Student>()
        .HasOne<Kalendar>((s) => s.Kalendar)
        .WithOne(ad => ad.Student)
        .HasForeignKey<Kalendar>(k => k.Id);
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Literatura>()
     .HasOne<Zahtev>(l => l.Zahtev)
     .WithOne(z => z.Literatura)
     .HasForeignKey<Zahtev>(z => z.Id);
        base.OnModelCreating(modelBuilder);
    }

}
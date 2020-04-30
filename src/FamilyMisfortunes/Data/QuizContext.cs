using Microsoft.EntityFrameworkCore;
using FamilyMisfortunes.Models;

namespace FamilyMisfortunes.Data
{
    public class QuizContext : DbContext
    {
        public QuizContext (DbContextOptions<QuizContext> options)
            : base(options)
        {
        }

        public DbSet<Answer> Answers { get; set; }
        public DbSet<Question> Question { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Question>().ToTable("Questions");

            modelBuilder.Entity<Answer>().ToTable("Answers")
                .HasOne<Question>(b => b.Question)
                .WithMany(a => a.Answers)
                .HasForeignKey(b => b.QuestionId);
        }
    }
}
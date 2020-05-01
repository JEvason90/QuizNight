
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FamilyMisfortunes.Data;
using FamilyMisfortunes.Models;
using Microsoft.EntityFrameworkCore;

namespace FamilyMisfortunes.Services
{
    public class QuizService : IQuizService
    {
        private QuizContext _quizContext;
        public QuizService(QuizContext quizContext)
        {
            _quizContext = quizContext;
        }
        public async Task<Question> GetQuestionWithAnswersByIdAsync(int questionId)
        {
            return await _quizContext.Question
                .Include(q => q.Answers)
                .Where(q => q.QuestionId == questionId)
            .SingleOrDefaultAsync();
        }

        public async Task<IEnumerable<Answer>> GetAnswerByQuestionIdAsync(int questionId)
        {
            return await _quizContext.Answers.Where(a => a.QuestionId == questionId).ToListAsync();
        }

        public async Task<IEnumerable<Answer>> GetTop10ByQuestionIdAsync(int questionId)
        {
            return await _quizContext.Answers
                .Where(a => a.QuestionId == questionId)
                .OrderBy(a => a.Score)
                .Take(10)
                .ToListAsync();
        }

        public async Task<IEnumerable<Question>> GetQuestionsAsync()
        {
            return await _quizContext.Question.ToListAsync();
        }
    }
}
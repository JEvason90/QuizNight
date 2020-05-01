using System.Collections.Generic;
using System.Threading.Tasks;
using FamilyMisfortunes.Models;

namespace FamilyMisfortunes.Services
{
    public interface IQuizService
    {
        Task<IEnumerable<Question>> GetQuestionsAsync();
        Task<Question> GetQuestionWithAnswersByIdAsync(int questionId);
        Task<IEnumerable<Answer>> GetAnswerByQuestionIdAsync(int questionId);

        Task<IEnumerable<Answer>> GetTop10ByQuestionIdAsync(int questionId);

    }
}
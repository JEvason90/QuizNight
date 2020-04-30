using System.Collections.Generic;
using System.Threading.Tasks;
using FamilyMisfortunes.Models;

namespace FamilyMisfortunes.Services
{
    public interface IQuizService
    {
        Task<Question> GetQuestionWithAnswersById(int questionId);
        Task<IEnumerable<Answer>> GetAnswerByQuestionIdAsync(int questionId);
    }
}
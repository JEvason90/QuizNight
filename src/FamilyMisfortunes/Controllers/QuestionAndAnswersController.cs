using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using FamilyMisfortunes.Models;
using FamilyMisfortunes.Services;

namespace FamilyMisfortunes.Controllers
{
    [ApiController]
    [Route("api/")]
    public class QuestionAndAnswersController : ControllerBase
    {

        private readonly ILogger<QuestionAndAnswersController> _logger;
        private IQuizService _quizService;



        public QuestionAndAnswersController(ILogger<QuestionAndAnswersController> logger, IQuizService quizService)
        {
            _logger = logger;
            _quizService = quizService;
        }

        [HttpGet("questions/")]
        public async Task<IActionResult> Get()
        {
            var questions = await _quizService.GetQuestionsAsync();
            
            return Ok(questions);
        }

        [HttpGet("questions/{questionId}")]
        public async Task<IActionResult> Get(int questionId)
        {
            var questionsWithAnswers = await _quizService.GetQuestionWithAnswersByIdAsync(questionId);

            return Ok(questionsWithAnswers);
        }

        [HttpGet("questions/{questionId}/answers")]
        public async Task<IActionResult> GetAnswers(int questionId)
        {
            var answers = await _quizService.GetAnswerByQuestionIdAsync(questionId);

            return Ok(answers);
        }

        [HttpGet("questions/{questionId}/top10answers")]
        public async Task<IActionResult> GetTop10Answers(int questionId)
        {
            var answers = await _quizService.GetTop10ByQuestionIdAsync(questionId);

            if(answers == null)
            {
                return NotFound();
            }

            return Ok(answers);
        }
    }
}

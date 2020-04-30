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
    [Route("[controller]")]
    public class QuestionAndAnswersController : ControllerBase
    {

        private readonly ILogger<QuestionAndAnswersController> _logger;
        private IQuizService _quizService;



        public QuestionAndAnswersController(ILogger<QuestionAndAnswersController> logger, IQuizService quizService)
        {
            _logger = logger;
            _quizService = quizService;
        }

        [HttpGet("{questionId}")]
        public async Task<IActionResult> Get(int questionId)
        {
            var questionsWithAnswers = await _quizService.GetQuestionWithAnswersById(questionId);

            return Ok(questionsWithAnswers);
        }

        [HttpGet("{questionId}/answers")]
        public async Task<IActionResult> GetAnswers(int questionId)
        {
            var answers = await _quizService.GetAnswerByQuestionIdAsync(questionId);

            return Ok(answers);
        }
    }
}

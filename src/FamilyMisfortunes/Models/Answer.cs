using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace FamilyMisfortunes.Models
{
    public class Answer
    {
        public int AnswerId {get;set;}
        public double Score { get; set; }
        public string AnswerText {get;set;}
        [ForeignKey("Question")]
        public int QuestionId {get;set;}
        public Question Question {get;set;}

    }
}

using System;
using System.IO;
using System.Linq;
using FamilyMisfortunes.Models;

namespace FamilyMisfortunes.Data
{
    public static class DbInitializer
    {
        private static readonly string rootPath = @"C:\Users\Sammi Mctigue\Documents\Code\FamilyMisfortunes\src\FamilyMisfortunes\Data\RawDataSources";
        public static void Initialize(QuizContext context)
        {
            context.Database.EnsureCreated();

            // Look for any questions.
            if (!context.Question.Any())
            {
                var questions = new Question[]
                {
                    new Question{QuestionId = 1, QuestionText="Name a country with a HDI between 0.7 and 0.8"},
                    new Question{QuestionId = 2, QuestionText="Name a country with the highest CO2 per capita"},
                    new Question{QuestionId = 3, QuestionText="Name a country with the highest number of Individual Car owenership per 1000 individuals"},
                    new Question{QuestionId = 4, QuestionText="Name a country with the highest percentage of the population that has access to the internet"},
                    new Question{QuestionId = 5, QuestionText="Name a country where the Transparency International percieved corruption Index is between 50 - 60"}
                };
                foreach (Question q in questions)
                {
                    context.Question.Add(q);
                }
                context.SaveChanges();
            }

            if(!context.Answers.Any())
            {
                //question 1 answers
                var lastAnswerId = AddAnswersToDatabaseFromCsvFile(context, "Q1.csv", 1,1);

                //question 2 answers
                lastAnswerId = AddAnswersToDatabaseFromCsvFile(context, "Q2.csv", 2, lastAnswerId+1);

                //question 3 answers
                lastAnswerId = AddAnswersToDatabaseFromCsvFile(context, "Q3.csv", 3, lastAnswerId+1);

                //question 4 answers
                lastAnswerId = AddAnswersToDatabaseFromCsvFile(context, "Q4.csv", 4, lastAnswerId+1);

                //question 5 answers
                lastAnswerId = AddAnswersToDatabaseFromCsvFile(context, "Q5.csv", 5, lastAnswerId+1);
            }
        }

        private static int AddAnswersToDatabaseFromCsvFile(QuizContext context, string csvFile, int questionId, int answerId)
        {
            var lines = File.ReadAllLines($"{rootPath}\\{csvFile}").ToList();

            var answers = new Answer[] { };
            int i = answerId;
            foreach (var line in lines)
            {
                var answer = GetAnswerFromCSV(line, questionId, i);
                context.Answers.Add(answer);
                i++;
            }
            
            context.SaveChanges();

            return i;
        }
        private static Answer GetAnswerFromCSV(string csvLine, int questionNumber, int answerNumber)
        {
            string[] values = csvLine.Split(',');

            var answer = new Answer()
            {
                AnswerId = answerNumber,
                AnswerText = values[0],
                Score = Convert.ToDouble(values[3]),
                QuestionId = questionNumber
            };

            return answer;
        }
    }
}
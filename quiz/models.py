from django.db import models
from OnlineExamination.models import Student, Exams, Question


class Set(models.Model):
    set_no = models.PositiveIntegerField(default=0)
    ques = models.ManyToManyField(Question)
    no_of_question = models.Count(Question.question)
    exam_name = models.ForeignKey(Exams, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.set_no)


class Result(models.Model):
    user_name = models.ForeignKey(Student, on_delete=models.CASCADE)
    exam_name = models.ForeignKey(Exams, on_delete=models.CASCADE)
    no_ques_attempt = models.Count
    no_ques_unattempt = models.Count
    no_ques_right = models.Count
    no_ques_wrong = models.Count
    total_mark = models.Count


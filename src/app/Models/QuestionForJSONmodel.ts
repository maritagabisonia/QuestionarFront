export class QuestionJSONmodel{
    question: string;
    important:boolean;
    numberOfAnswers:number;
    answers: AnswerForJSONmodel[];
    subjectid:number;

    constructor(    question: string = "" , numberOfAnswers: number = 0, important: boolean = true, answers: AnswerForJSONmodel[] = [] ,subjectid:number = 0 )
    {
        this.question =question;
        this.numberOfAnswers =numberOfAnswers;
        this.important = important;
        this.answers =answers;  
        this.subjectid=subjectid;    
    }
}
export class AnswerForJSONmodel{
    answer: string;
    correct:boolean;
    constructor(  answer: string = "", correct: boolean = true  )
    {
        this.answer =answer;
        this.correct = correct;
    }
}
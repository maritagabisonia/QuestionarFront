export class QuestionDTO{
    id:number;
    question: string;
    important:boolean;
    numberOfAnswers:number;
    answers: AnswerDTO[];

    constructor(   id:number = 0,  question: string = "" , numberOfAnswers: number = 0, important: boolean = true, answers: AnswerDTO[] = []  )
    {
        this.id = id;
        this.question =question;
        this.numberOfAnswers =numberOfAnswers;
        this.important = important;
        this.answers =answers;      
    }
}
export class AnswerDTO{
    id:number;
    answer: string;
    correct:boolean;
    constructor( id:number = 0,   answer: string = "", correct: boolean = true  )
    {
        this.id = id;
        this.answer =answer;
        this.correct = correct;
    }
}
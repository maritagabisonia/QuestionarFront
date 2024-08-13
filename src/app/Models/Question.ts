export class Question{
    question: string;
    answer: string;
    important:boolean;
    constructor(    question: string = "" , answer: string = "", important: boolean = true  )
    {
        this.question =question;
        this.answer =answer;
        this.important = important;
      
    }
}
export class GetQuestion{
    id:number;
    question: string;
    answer: string;
    important:boolean;
    constructor(  id:number ,  question: string = "" , answer: string = "", important: boolean = true  )
    {
        this.id = id;
        this.question =question;
        this.answer =answer;
        this.important = important;
      
    }
}
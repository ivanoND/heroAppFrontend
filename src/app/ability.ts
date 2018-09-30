export class Ability {
    
    id: number;
    description: String;

    toString():String{
      return "{id:" + this.id + "description:" + this.description + "}"
    }
  }
  
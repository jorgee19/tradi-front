class Util{
    constructor(){

    }

    capitalize(...strs){
        let aux = [];
        for(let str of strs){
          aux.push(...str.split(" "))
        }
        for(let str in aux){
          aux[str] = aux[str].charAt(0).toUpperCase() + aux[str].slice(1).toLowerCase();
        }
        
        return aux.join(" ");
        
      }
}
const util = new Util()

export default util
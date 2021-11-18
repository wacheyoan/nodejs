const len: number = 10000000;
const numbers:number[] = Array(len);

for(let i = 0;i < len;i++){
    numbers[i] = (Math.round(Math.random() * 10));
}

const logiqueDeTri = (a:number,b:number) => {
    if(a > b){return 1;}
    if(a < b){return -1;}
    return 0;
};

const logiqueDeTri2 = (a:number,b:number) => {
    return b - a;
};

function triCustom() {
    const nbBuckects: number = 256
    const prefixSums: Array<number> = Array(nbBuckects)
    const output: Array<number> = Array(len)

    for (let j = 0; j < nbBuckects; j++) prefixSums[j] = 0
    for (let j = 0; j < len; j++) prefixSums[numbers[j]]++
    for (let j = 1; j < nbBuckects; j++) prefixSums[j] += prefixSums[j - 1]
    for (let j = len; j >= 0; j--) {
        const v = numbers[j]
        const outputIdx = --prefixSums[v]
        output[outputIdx] = v
    }
}

function bench(){
    const debut: number = Date.now();
    // const ret:number[] = numbers.sort(logiqueDeTri2);
    // const ret:number[] = quickSort(numbers,0,numbers.length - 1);
    // triCustom();
    console.log(constructionPossible('skateboard',['skzeaze','zezeezate','rzrezrb','ezezerd','zaeazeo','azezaezaa']));
    return Date.now() - debut;
}

function swap(items:number[], leftIndex: number, rightIndex:number){
    var temp = items[leftIndex];
    items[leftIndex] = items[rightIndex];
    items[rightIndex] = temp;
}

function partition(items:number[], left:number, right:number) {
    var pivot   = items[Math.floor((right + left) / 2)], //middle element
        i       = left, //left pointer
        j       = right; //right pointer
    while (i <= j) {
        while (items[i] < pivot) {
            i++;
        }
        while (items[j] > pivot) {
            j--;
        }
        if (i <= j) {
            swap(items, i, j); //sawpping two elements
            i++;
            j--;
        }
    }
    return i;
}

function quickSort(items:number[], left:number, right:number) {
    var index;
    if (items.length > 1) {
        index = partition(items, left, right); //index returned from partition
        if (left < index - 1) { //more elements on the left side of the pivot
            quickSort(items, left, index - 1);
        }
        if (index < right) { //more elements on the right side of the pivot
            quickSort(items, index, right);
        }
    }
    return items;
}



//J'avais compris qu'on pouvait construire avec n'importe quelle lettre du tableau 
//Et non pas n'importe quel élément :/
function constructionPossible(objectif:string,arr:string[]): boolean{

    if(arr.length > 1 && objectif !== ""){
        let str:string = arr.join('');

        for(let i = 0;i< objectif.length;i++){
            if(!str.includes(objectif.charAt(i))){
                return false;
            }else{
                let index = str.indexOf(objectif.charAt(i));
                str = str.slice(0,index) + str.slice(index+1);
            }
        }

        return true;
    }

    return true;

}

const problemesFaciles:{ [objectifs: string]: Array<string> } = {
    "": ["bal", "bl", "a"],//true
    "abcdef": ["ab", "abc", "cd", "def", "abcd"], //true
    "skateboard": ["bo", "rd", "ate", "t", "ska", "sk", "boar"], //false
    "enterapotentpot": ["a", "p", "ent", "enter", "ot", "o", "t"] //true
}

const problemeDifficiles: { [objectifs: string]: Array<string> } = {
    "eeeeeeeeeeeeeeeeeeeef": ["e", "ee", "eee", "eeee", "eeeee", "eeeeee"] //false
}

type ConstructionPossible = (objectif: string, alphabet: Array<string>) => boolean


function constructionPossible2(
    objectif: string, // Mon objectif courant
    alphabet: Array<string>, // Mon alphabet
    memo: { [objectif: string]: boolean } = {} // Mon cache mémoire
): boolean /* Le résultat final */ {
    /**
    * Si j'ai déjà un résultat pour <objectif> dans mon cache,
    * Je renvoie ce résultat
    */
    if (objectif in memo) return memo[objectif]
    /**
    * Si mon objectif est une chaine de caractères vide,
    * Alors la fonction renvoie toujours vrai
    */
    if (objectif === "") return true
    /**
    * Pour les objectifs "normaux", qui ne sont pas déjà dans le cache,
    * pour chaque element de l'alphabet ...
    */
    for (let element of alphabet) {
        /**
        * ... est ce que mon objectif commence par cet element ?
        */
        if (objectif.indexOf(element) === 0) {
            /**
            * Je reconstruit un sous-objectifs "reste" qui est l'objectif initial
            * moins l'élément
            */
            const reste = objectif.slice(element.length)
            /**
            * Et j'appelle récursivement la fonction avec le sous-objectif
            */
            if (constructionPossible2(reste, alphabet, memo)) {
                /**
                * Si le sous-objectif est constructible, alors je mémorise VRAI
                * dans le cache et je renvoie le résultat
                */
                memo[objectif] = true
                return true
            }
        }
    }
    memo[objectif] = false
    return false;
}

function benche(problemes: { [p: string]: Array<string> }) {
    const debut: number = Date.now();

    for (const objectif in problemes) {
        const alphabet = problemes[objectif]
        console.log(`"${objectif}"-> ${constructionPossible2(objectif, alphabet)}`)
    }
    return Date.now() - debut;

}

benche(problemesFaciles);
console.log(benche(problemeDifficiles));
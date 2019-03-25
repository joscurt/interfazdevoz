// ArtyomCommands.js
 import CustomLayout from '../containers/Layout';
 import ArticleList from '../containers/ArticleListView';

export default class ArtyomCommandsManager {

    // The ArtyomCommandsManager class expects as argument in the constructor
    // an already declared instance of Artyom.js
    constructor (ArtyomInstance){
        this._artyom = ArtyomInstance;
    }

    // Execute the loadCommands method to inject the methods to the instance of Artyom
    loadCommands(){
        let Artyom = this._artyom;

        // Here you can load all the commands that you want to Artyom
        return Artyom.addCommands([
            {
                indexes: ["Hola", "Hola"],
                action: () => {
                    Artyom.say("Hello, how are you?");
                }
            },
            {
                indexes: [/How are you/, /Regular expressions supported/],
                smart: true,
                action: () => {
                    Artyom.say("I'm fine, thanks for asking !");
                }
            },
            {
                indexes: ["Generar Reporte de * de este año"],
                smart: true,
                action: (i, month) => {
                    let year = new Date().getFullYear();

                    Artyom.say(`Generating reports of ${month} ${year} `);

                    Artyom.say("Ready ! What were you expecting? write some code you lazy bear !");
                }
              },
              {
                indexes: ["Seleccionar Pieza * "],
                smart: true,
                action: (i, num) => {
                  let rNumbers = {
                    num: num,
                    nombre: 'Jose'
                  }
                console.log(rNumbers);
                  if(num == 1){
                    Artyom.say(`Estas en la pieza Dental numero ${num}`);
                  }else{
                    Artyom.say(`Pieza Incorrecta`);
                  }


                }
              },

        ]);
    }
}
// export {rNumbers};

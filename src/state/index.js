

export function useState(value){
    let handleListSet = [];

    function addHandelSet(fn){
        handleListSet.push(fn);
    }

    let handleListGet = [];

        function addHandelGet(fn){
            handleListGet.push(fn);
        }


    function handleGet(){
        for(let i =0 ; i<handleListGet.length; i++){
            handleListGet[i]();
        }
    }

    function handleSet(o, prop, value){
        for(let i =0 ; i<handleListSet.length; i++){
            handleListSet[i](o,prop, value);
        }       
    }

    let state;
    if(typeof value == "object"){
        state = new Proxy(value, {
            set: (o, prop, value)=> {
 
                    o[prop] = value;
                    handleSet(o,prop, value);
                    return true
            },
            get: (o, prop) =>{ handleGet(); return o[prop];}
        })
    } else {
        const obj = {value};
        state = new Proxy(obj, {
            set: (o, prop, value)=> {
                    o[prop] = value;
                    handleSet(o,prop, value);
                    return true
                
            },
            get: (o, prop) =>{ handleGet(); return o[prop];}
        })
    }

     

    return [
        state,
        addHandelSet,
        addHandelGet
    ]
}
//* Medición *//

const btnok = document.getElementById('btnok');

function mvalor(){
    var medicion = document.getElementById('medicion').value;

    if((medicion >= 1) && (medicion <= 120)){
        alert("NO APLICAR UNIDADES");
    }
    
    else if((medicion >= 121) && (medicion <= 150)){
        alert("APLICAR 1 UNIDADES");
    }

    else if((medicion >= 151) && (medicion <= 200)){
        alert("APLICAR 2 UNIDADES");
    }
    
    else if((medicion >= 201) && (medicion <= 250)){
        alert("APLICAR 3 UNIDADES");
    }
    
    else if((medicion >= 251) && (medicion <= 300)){
        alert("APLICAR 3 UNIDADES");
    }
    
    else if(medicion >= 301){
        alert("APLICAR 4 UNIDADES");
    }
    
    else{
        alert("INGRESAR VALOR CORRECTAMENTE");
    }
}

btnok.addEventListener('click',mvalor,true);

//* Calculadora de carbohidratos *//

function alumno(carbs) {
    var obj = {
        carbs : carbs,
    }
    return obj;
}

function incluir_alumno() {
    var nombre = document.getElementById("carbs").value;

    // Crea el nuevo alumno
    var nuevo_alumno = alumno(carbs);

    // Escribe el nuevo alumno
    document.getElementById("resultado").innerHTML = alumno.carbs;
}

//* Historial de mediciones *//

class Entry{
    constructor(horario,medicion){
        this.horario = horario;
        this.medicion = medicion;
    }
}

class UI{
    static displayEntries(){
   
        const entries = Store.getEntries();
        entries.forEach((entry) => UI.addEntryToTable(entry));
    }
    static addEntryToTable(entry){
        const tableBody=document.querySelector('#tableBody');
        const row = document.createElement('tr');
        row.innerHTML = `   <td>${entry.horario}</td>
                            <td>${entry.medicion}</td>
                        `;
        tableBody.appendChild(row);
    }
    static clearInput(){
        const inputs = document.querySelectorAll('.form-control');
        inputs.forEach((input)=>input.value="");
    }
    static deleteEntry(target){
        if(target.classList.contains('delete')){
            target.parentElement.parentElement.remove();
        }
    }
}

class Store{
    static getEntries(){
        let entries;
        if(localStorage.getItem('entries') === null){
            entries = [];
        }
        else{
            entries = JSON.parse(localStorage.getItem('entries'));
        }
        return entries;
    }
    static addEntries(entry){
        const entries = Store.getEntries();
        entries.push(entry);
        localStorage.setItem('entries', JSON.stringify(entries));
    }
}

    document.addEventListener('DOMContentLoaded',UI.displayEntries);

    document.querySelector('#entryForm').addEventListener('submit',(e)=>{
        e.preventDefault();
        
        const horario = document.querySelector('#horario').value;
        const medicion = document.querySelector('#medicion').value;
        if(!UI.validateInputs()){
            return;
        }

        const entry = new Entry(horario, medicion);

        UI.addEntryToTable(entry);
        Store.addEntries(entry);

        UI.clearInput();

    });

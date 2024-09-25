document.addEventListener('DOMContentLoaded', () => {
    const grid_display = document.querySelector('.grid');
    const score_display = document.querySelector('#score');
    const result_display = document.querySelector('#result');
    let prev = [];
    let score = 0;
    const b = 4;
    let squares = [];
    
    function createBoard() {
        for (i = 0; i < b * b; i++) {
            const square = document.createElement('div');
            //square.innerHTML= 0;
            grid_display.appendChild(square);
            squares.push(square);
            //buffer.push(square);
        }
        generate();
    }
    createBoard();
    function store(buffer){
        prev = [...buffer];
        redo_function(prev);
    }
    function generate(){
        
        const random_number = Math.floor(Math.random()*squares.length);
        let buffer = [...squares];
        store(buffer);
        //console.log(random_number);
        if (squares[random_number].innerHTML == 0){
            squares[random_number].innerHTML = 2;
        }
        else{
            generate();
        }
    }

    function move_right(){
        for(i = 0; i < b*b; i++){
            if(i%4===0){
                let t1 = squares[i].innerHTML;
                let t2 = squares[i+1].innerHTML;
                let t3 = squares[i+2].innerHTML;
                let t4 = squares[i+3].innerHTML;
                let row = [parseInt(t1),parseInt(t2),parseInt(t3),parseInt(t4)];
                //console.log(row);
                let filtered_row = row.filter(num=>num);
                let missing = 4-filtered_row.length;
                let zeros = Array(missing).fill(null);
                new_row = zeros.concat(filtered_row);
                //console.log(new_row);
                squares[i].innerHTML = new_row[0];
                squares[i+1].innerHTML = new_row[1];
                squares[i+2].innerHTML = new_row[2];
                squares[i+3].innerHTML = new_row[3];
            }
        } 
    }


    function move_left(){
        for(i = 0; i < b*b; i++){
            if(i%4===0){
                let t1 = squares[i].innerHTML;
                let t2 = squares[i+1].innerHTML;
                let t3 = squares[i+2].innerHTML;
                let t4 = squares[i+3].innerHTML;
                let row = [parseInt(t1),parseInt(t2),parseInt(t3),parseInt(t4)];
                //console.log(row);
                let filtered_row = row.filter(num=>num);
                let missing = 4- filtered_row.length;
                let zeros = Array(missing).fill(null);
                new_row = filtered_row.concat(zeros);
                //console.log(new_row);
                squares[i].innerHTML = new_row[0];
                squares[i+1].innerHTML = new_row[1];
                squares[i+2].innerHTML = new_row[2];
                squares[i+3].innerHTML = new_row[3];
            }
        } 
    }

    
    function move_up(){
        for(i = 0; i < b; i++){
                let t1 = squares[i].innerHTML;
                let t2 = squares[i+1*b].innerHTML;
                let t3 = squares[i+2*b].innerHTML;
                let t4 = squares[i+3*b].innerHTML;
                let column = [parseInt(t1),parseInt(t2),parseInt(t3),parseInt(t4)];
                //console.log(row);
                let filtered_column = column.filter(num=>num);
                let missing = 4- filtered_column.length;
                let zeros = Array(missing).fill(null);
                new_column = filtered_column.concat(zeros);
                //console.log(new_row);
                squares[i].innerHTML = new_column[0];
                squares[i+1*b].innerHTML = new_column[1];
                squares[i+2*b].innerHTML = new_column[2];
                squares[i+3*b].innerHTML = new_column[3];
            
        } 
    }
    
    function move_down(){
        for(i = 0; i < b; i++){
                let t1 = squares[i].innerHTML;
                let t2 = squares[i+1*b].innerHTML;
                let t3 = squares[i+2*b].innerHTML;
                let t4 = squares[i+3*b].innerHTML;
                let column = [parseInt(t1),parseInt(t2),parseInt(t3),parseInt(t4)];
                //console.log(row);
                let filtered_column = column.filter(num=>num);
                let missing = 4- filtered_column.length;
                let zeros = Array(missing).fill(null);
                new_column = zeros.concat(filtered_column);
                //console.log(new_row);
                squares[i].innerHTML = new_column[0];
                squares[i+1*b].innerHTML = new_column[1];
                squares[i+2*b].innerHTML = new_column[2];
                squares[i+3*b].innerHTML = new_column[3];
            
        } 
    }
    
    function combine_row(){
        //console.log("entered combine_row");
        let t = score;
        for(i = 0; i < b*b-1; i++){
            if((squares[i].innerHTML===squares[i+1].innerHTML)){
                let combined_total = parseInt(squares[i].innerHTML)+parseInt(squares[i+1].innerHTML);
                squares[i].innerHTML = combined_total;
                squares[i+1].innerHTML = null;
                combined_total = Number.isNaN(combined_total) ? 0 : combined_total;
                score += parseInt(combined_total);
                score_display.innerHTML =score;
            }
        }
        if(t==score){
            return 0;
        }
        return 1;
    }

    function combine_column(){
        //console.log("entered combine_row");
        let t = score;
        for(i = 0; i < b*b-b; i++){
            if((squares[i].innerHTML===squares[i+b].innerHTML)){
                let combined_total = parseInt(squares[i].innerHTML)+parseInt(squares[i+b].innerHTML);
                squares[i].innerHTML = combined_total;
                squares[i+b].innerHTML = null;
                combined_total = Number.isNaN(combined_total) ? 0 : combined_total;
                score += parseInt(combined_total);
                score_display.innerHTML =score;
            }
        }
        if(t==score){
            return 0;
        }
        return 1;
    }


    function control(e){
        switch(e.key){
            case "ArrowRight":{
                key_right();
            }break;
            case "ArrowLeft":{
                key_left();
            }break;
            case "ArrowUp":{
                key_up();
            }break;
            case "ArrowDown":{
                key_down();
            }break;
        }
    }
    document.addEventListener("keydown",control);
    //document.getElementById("redo").onclick = function() {redo_function(prev)};

    function redo_function(buffer){
        
        for(i=0;i<b*b;i++){
            if(i%4===0){
            let t1 = buffer[i].innerHTML;
            let t2 = buffer[i+1].innerHTML;
            let t3 = buffer[i+2].innerHTML;
            let t4 = buffer[i+3].innerHTML;
            let row = [parseInt(t1),parseInt(t2),parseInt(t3),parseInt(t4)];
            console.log(row);}}
    }
    function key_right(){

    move_right();

        generate();
    
    combine_row();
    move_right();
    }

    function key_left(){
        move_left();
        
            generate();
                
        combine_row();
        move_left();
    }
        
    function key_up(){
        move_up();
        generate();
        
        combine_column();
        move_up();
    }
            
    function key_down(){
        move_down();
        
        generate();
        
        combine_column();
        move_down();
    }
            
})
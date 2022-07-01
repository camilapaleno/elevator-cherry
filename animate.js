window.onload = () => {

    let buttons = document.querySelectorAll(".elevator__button");
    let upArrow = document.querySelector(".elevator__arrow_up");
    let downArrow = document.querySelector(".elevator__arrow_down"); 
    let leftDoor = document.querySelector(".elevator__door_l");
    let rightDoor = document.querySelector(".elevator__door_r");
    let currentFloor = null;
    queue = [4];
    
  
    //When each button is clicked, get floor # from id.
    buttons.forEach(button => {
      button.addEventListener("click", function () {
        let pressedFloor = parseInt(this.getAttribute("id"));
        document.getElementById(pressedFloor).classList.add('pressed'); 
        
        
        //If there is a queue, check if in queue.
        //If not in queue, push to queue.
        //If no queue, push to queue and run.
        if(queue.length > 0) {
            if(queue.indexOf(pressedFloor) == -1) { 
                queue.push(pressedFloor); 
                console.log(queue);
            };
        } else {
            queue.push(pressedFloor);
            runQueue();
        }       
      });
    });

    //If queue exists, run.
    function runQueue() {
        if(queue.length > 0) {
            setTimeout(scrollElevator, 1000, queue[0]);
        }
      } 

    //Activate correct arrows, run closeDoors.
    function scrollElevator(toFloor) {
        //If selected floor if greater than current, activate up arrow.
        if (toFloor > currentFloor) {
            upArrow.classList.add('active');
            downArrow.classList.remove('active');
        }
        //If selected floor if less than current, activate down arrow.
        else if (toFloor < currentFloor) {
            upArrow.classList.remove('active');
            downArrow.classList.add('active');
        }
        setTimeout(closeDoors, 500);
        setTimeout(scrollToFloor, 1000, toFloor);
    }  

    //Scroll to first floor in queue, set number, run openDoors.
    function scrollToFloor(floor) { 
        currentFloor = floor; 
        queue.splice(queue.indexOf(floor), 1);
        document.getElementById("floor__" + currentFloor).scrollIntoView({behavior: "smooth"});
        setTimeout(openDoors, 1000, currentFloor);
        
        runQueue(); 
      }

    //Open doors, remove activated button, set displayed number, remove activated arrow.
    function openDoors(currentFloor) {
        leftDoor.classList.add('open');
        rightDoor.classList.add('open');
        document.getElementById(currentFloor).classList.remove('pressed');
        document.getElementById("elevator__display").innerHTML = '<span>' + currentFloor + '</span>' ;
        upArrow.classList.remove('active');
        downArrow.classList.remove('active');
    }

    function closeDoors() {
        leftDoor.classList.remove('open');
        rightDoor.classList.remove('open');
    }

    runQueue();

};
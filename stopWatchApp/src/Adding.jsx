import Stopwatch from "./Stopwatch"
import React, {useState, useEffect} from 'react'

function Adding(){

    const [task, setTask] = useState('');
    const [hours, setHours] = useState('');
    const [minutes, setMinutes] = useState('');
    const [seconds, setSeconds] = useState('');
    const [totalTime, setTT] = useState(60000);


    const [watches, setWatches] = useState(() => {
        if(window.localStorage.getItem('watches') !== null){
            return JSON.parse(window.localStorage.getItem('watches'));
        }else{
            return [];
        }
    });


    useEffect(() => {
        window.localStorage.setItem('watches', JSON.stringify(watches))
    },[watches])

    useEffect(() => {

        let calculatedTime = 0;

        if(!isNaN(parseInt(seconds))){
            calculatedTime += (parseInt(seconds) * 1000);
        }
        if(!isNaN(parseInt(minutes))){
            calculatedTime += (parseInt(minutes) * 60 * 1000);
        }
        if(!isNaN(parseInt(hours))){
            calculatedTime += (parseInt(hours) * 60 * 60 * 1000);
        }
        if(isNaN(parseInt(seconds)) && isNaN(parseInt(minutes)) && isNaN(parseInt(hours))){
            calculatedTime = 60000;
        } 
        setTT(calculatedTime);
        
    }, [hours, minutes, seconds]);
    
    function addWatch(){
        const newWatch = {
            taskA: task,
            timingA: totalTime,
        };

        setWatches((w) => [newWatch, ...w]);       
        setTask('');
        setHours('');
        setMinutes('');
        setSeconds('');
    }

    function handleTaskChange(event){
        setTask((event.target.value).charAt(0).toUpperCase() + (event.target.value).slice(1));    
    }

    function handleHChange(event){
        if(event.target.value < 100){
            setHours(event.target.value);
        }
    }

    function handleMChange(event){
        if(event.target.value < 61){
            setMinutes(event.target.value);
        }
    }

    function handleSChange(event){
        if(event.target.value < 61){
            setSeconds(event.target.value);
        }
    }

    function deleteListItem(index){
        setWatches(w => w.filter((watch, i) => i != index));
    }

    return (
            <>
                <div className="addingCont">
                    <div className="addingBar">
                        <p >Task:</p>
                        <input
                             type="text"
                             placeholder="Enter a task and a time..."
                             value={task}
                             onChange={handleTaskChange}
                             >
                        </input>
                    </div>
                    <div className="addingTime"> 
                        <p>H:</p>
                        <input
                            type="number"
                            placeholder="00"
                            value={hours}
                            min='0'
                            max='99'
                            onChange={handleHChange}
                        >
                        </input>
                        <p>M:</p>
                        <input
                            type="number"
                            placeholder="00"
                            value={minutes}
                            min='0'
                            max='60'
                            onChange={handleMChange}
                        >
                        </input>
                        <p>S:</p>
                        <input
                            type="number"
                            placeholder="00"
                            value={seconds}
                            min='0'
                            max='60'
                            onChange={handleSChange}
                        >
                        </input>
                        <button onClick={addWatch}>Add Task</button>
                    </div>
                </div>
                <div>
                    <ul>
                        {watches.map((watch, index) => 
                        <li key={index}>
                            <button onClick={() => deleteListItem(index)}>X</button>
                            {<Stopwatch task={watch.taskA} timing={watch.timingA}/>}
                        </li>)}  
                    </ul>
                </div>
                
            </>

    );
}

export default Adding
import React, {useState, useEffect, useRef} from 'react';

function Stopwatch(){

    const [isRunning, setIsRunning] = useState(false);
    const [formatting, setFormatting] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const intervalIdRef = useRef(null);
    const startTimeRef = useRef(0);

    useEffect(() => {

        if(isRunning){
            intervalIdRef.current = setInterval(() => {
                setElapsedTime(Date.now() - startTimeRef.current);
            }, 10);
        }

        return () => {
            clearInterval(intervalIdRef.current);
        };

    }, [isRunning]);

    function start(){
        setIsRunning(true);
        startTimeRef.current = Date.now() - elapsedTime;
    }

    function stop(){
        setIsRunning(false);
    }

    function reset(){
        setElapsedTime(0);
        setIsRunning(false);
    }

    function formatTime1(){

        let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
        let minutes = Math.floor(elapsedTime / (1000 * 60) % 60);
        let seconds = Math.floor(elapsedTime / (1000) % 60);
        let milliseconds = Math.floor((elapsedTime % 1000) / 1);

        hours = String(hours).padStart(2, "0");
        minutes = String(minutes).padStart(2, "0");
        seconds = String(seconds).padStart(2, "0");
        milliseconds = String(milliseconds).padStart(3, "0");

        return (
                    <>
                        {hours}:{minutes}:{seconds}.{Math.floor(milliseconds/100)}
                        <span className="smallText">{padZeros(milliseconds % 100)}</span>
                    </>
                );
    }

    function formatTime2(){

        let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
        let minutes = Math.floor(elapsedTime / (1000 * 60) % 60);
        let seconds = Math.floor(elapsedTime / (1000) % 60);
        let milliseconds = Math.floor((elapsedTime % 1000) / 10);

        hours = String(hours).padStart(2, "0");
        minutes = String(minutes).padStart(2, "0");
        seconds = String(seconds).padStart(2, "0");
        milliseconds = String(milliseconds).padStart(2, "0");

        return `${minutes}:${seconds}:${milliseconds}`;
    }

    function padZeros(val){
        return val > 9 ? val : "0" + val;
    }

    function pickFormat(){
        if(formatting){
            return formatTime1();
        }
        return formatTime2();
    }

    function setMat(){
        setFormatting(!formatting);
    }

    return(
        <>
            <div className="stopWatch">
                <div className="display">{pickFormat()}</div>
                <div className="controls">
                    <button onClick={start} className="start">Start</button>
                    <button onClick={stop} className="stop">Stop</button>
                    <button onClick={reset} className="reset">Reset</button>
                </div>
            </div>
            <div className="styleCont">
                <button onClick={setMat} className="format">Expand</button>
            </div>
        </>
    );
}

export default Stopwatch
import { useState, useEffect } from "react";
import styles from "./PadText.module.css"
import { actionNames } from "../../../constants/actionNames";

const { MODE_CAR, CONFIG_1, CONFIG_2, CONFIG_3, CONFIG_4 } = actionNames.CONTROLS;

const PadText = ({strings, mode, config}) => {
    const isCar = mode === MODE_CAR;
    const [ L1Text, setL1Text ] = useState("")
    const [ L2Text, setL2Text ] = useState("")
    const [ L2R2Text, setL2R2Text ] = useState("")
    const [ R2Text, setR2Text ] = useState("")
    const [ R1Text, setR1Text ] = useState("")
    const [ TriangleText, setTriangleText ] = useState("")
    const [ CircleText, setCircleText ] = useState("")
    const [ XText, setXText ] = useState("")
    const [ SquareText, setSquareText ] = useState("")
    const [ StartText, setStartText ] = useState(strings.pause)
    const [ SelectText, setSelectText ] = useState("")
    const [ R3Text, setR3Text] = useState("");
    const [ RightAnalogText, setRightAnalogText] = useState("");
    const [ LeftAnalogText, setLeftAnalogText] = useState("");
    const [ L3Text, setL3Text] = useState("");
    const [ DPadText, setDPadText] = useState("");

    const getPadMapping = () => {
        if (isCar) {
            setL2Text(strings.lookleft);
            setR2Text(strings.lookright);
            setL2R2Text(strings.lookbehind);
            switch (config) {
                case CONFIG_1:
                setL1Text(strings.radio);
                setR1Text(strings.handbrake);
                setSquareText(strings.brake);
                setTriangleText(strings.enterexit);
                setCircleText(strings.fire);
                setXText(strings.accel);
                setRightAnalogText(strings.turret);
                setR3Text(`${strings.submission} ${strings.r3}`);
                setSelectText(strings.camera);
                setLeftAnalogText(strings.vehicle);
                setL3Text(`${strings.horn} ${strings.l3}`);
                setDPadText(strings.vehicle);    
                break;
                case CONFIG_2:
                setL1Text(strings.horn);
                setR1Text(strings.handbrake);
                setSquareText(strings.brake);
                setTriangleText(strings.enterexit);
                setCircleText(strings.fire);
                setXText(strings.accel);
                setRightAnalogText(strings.turret);
                setR3Text(`${strings.submission} ${strings.r3}`);
                setSelectText(strings.radio);
                setLeftAnalogText(strings.vehicle);
                setL3Text(strings.NA);
                setDPadText(strings.camera);
                break;
                case CONFIG_3:
                setL1Text(strings.enterexit);
                setR1Text(strings.horn);
                setSquareText(strings.brake);
                setTriangleText(strings.handbrake);
                setCircleText(strings.fire);
                setXText(strings.accel);
                setRightAnalogText(strings.turret);
                setR3Text(`${strings.submission} ${strings.r3}`);
                setSelectText(strings.camera);
                setLeftAnalogText(strings.vehicle);
                setL3Text(`${strings.radio2} ${strings.l3}`);
                setDPadText(strings.vehicle);
                break;
                case CONFIG_4:
                setL1Text(strings.handbrake);
                setR1Text(strings.fire);
                setSquareText(strings.submission);
                setTriangleText(strings.enterexit);
                setCircleText(strings.radio);
                setXText(strings.NA);
                setRightAnalogText(strings.abr);
                setR3Text("");
                setSelectText(strings.camera);
                setLeftAnalogText(strings.vehicle);
                setL3Text(`${strings.horn} ${strings.l3}`);
                setDPadText(strings.turret);
                break;
            }
        }
        else {
            setL2Text(strings.prev);
            setR2Text(strings.next);
            switch (config) {
                case CONFIG_1:
                setL1Text(strings.lookforward);
                setR1Text(strings.target);
                setSquareText(strings.jump);
                setTriangleText(strings.enter);
                setCircleText(strings.attack);
                setXText(strings.run);
                setRightAnalogText(strings.fp);
                setR3Text(`${strings.lookbehind} ${strings.r3}`);
                setSelectText(strings.camera);
                setLeftAnalogText(strings.move);
                setL3Text(`${strings.crouch} ${strings.l3}`);
                setDPadText(strings.move);    
                break;
                case CONFIG_2:
                setL1Text(strings.lookforward);
                setR1Text(strings.target);
                setSquareText(strings.jump);
                setTriangleText(strings.enter);
                setCircleText(strings.attack);
                setXText(strings.run);
                setRightAnalogText(strings.fp);
                setR3Text(`${strings.lookbehind} ${strings.r3}`);
                setSelectText(strings.NA);
                setLeftAnalogText(strings.move);
                setL3Text(`${strings.crouch} ${strings.l3}`);
                setDPadText(strings.camera);    
                break;
                case CONFIG_3:
                setL1Text(strings.enter);
                setR1Text(strings.target);
                setSquareText(strings.jump);
                setTriangleText(strings.lookforward);
                setCircleText(strings.run);
                setXText(strings.attack);
                setRightAnalogText(strings.fp);
                setR3Text(`${strings.lookbehind} ${strings.r3}`);
                setSelectText(strings.camera);
                setLeftAnalogText(strings.move);
                setL3Text(`${strings.crouch} ${strings.l3}`);
                setDPadText(strings.move);    
                break;
                case CONFIG_4:
                setL1Text(strings.target);
                setR1Text(strings.attack);
                setSquareText(strings.jump);
                setTriangleText(strings.enter);
                setCircleText(strings.lookforward);
                setXText(strings.run);
                setRightAnalogText(strings.fp);
                setR3Text(`${strings.lookbehind} ${strings.r3}`);
                setSelectText(strings.camera);
                setLeftAnalogText(strings.move);
                setL3Text(`${strings.crouch} ${strings.l3}`);
                setDPadText(strings.NA);    
                break;
            }
        }
        
    }

    const L1Style = {top: isCar ? "23%" : "21%", left: "5%", width:"19%", textAlign:"end"};
    const L2Style = {top: "0%", left: "12%", width:"30%", textAlign:"end"};
    
    const R1Style = {top: "21%", right: "-5%", width:"28%", textAlign:"start"};
    const R2Style = {top: "0%", right: "-10%", width:"50%", textAlign:"start"};
    
    const L2R2Style = {top: "5%", left: "35.5%", width:"30%", textAlign:"center"};
    
    const SquareStyle = {top: isCar ? "13%" : "17.5%", left: isCar ? "43%" : "45%", width:"15%", textAlign:"center"};
    const TriangleStyle = {top: "34.7%", right: "-27%", width:"50%", textAlign:"start"};
    const CircleStyle = {top: "40.5%", right: "-22%", width:"45%", textAlign:"start"};
    const XStyle = {top: "46%", right: "-22%", width:"45%", textAlign:"start"};
    
    const RightAnalogStyle = {top: "53%", right: "-17%", width:"40%", textAlign:"start"};
    const R3Style = {top: "58%", right: "-17%", width:"40%", textAlign:"start"};
    
    const StartStyle = {top: "69%", left: "53%", width:"10%", textAlign:"left"};
    const SelectStyle = {top: "75%", left: isCar ? "47%" : "35%", width: isCar? "10%" :"25%", textAlign:"center"};
    
    const L3Style = isCar ? {top: "84.5%", left: "12%", width:"33%", textAlign:"end"} : 
    {top: "60%", left: "3%", width:"15%", textAlign:"center"};
    const LeftAnalogStyle = {top: "54.5%", left: "-3%", width:"20%", textAlign:"end"};
    
    const DPadStyle = {top: "40%", left: "-8%", width:"32%", textAlign:"end"};

    const label = (posStyle, text) => <label className={styles.padTextSize} style={{position:"absolute", ...posStyle}}>{text}</label>
    
    useEffect(() => {
        getPadMapping();
    }, [config, isCar])

    return(
        <div className={`${styles.padTextContainer} arborcrest`}>
        {label(L1Style, L1Text)}
        {label(R1Style, R1Text)}
        {label(L2Style, L2Text)}
        {label(R2Style, R2Text)}
        {isCar && label(L2R2Style, L2R2Text)}
        {label(SquareStyle, SquareText)}
        {label(TriangleStyle, TriangleText)}
        {label(CircleStyle, CircleText)}
        {label(XStyle, XText)}
        {label(RightAnalogStyle, RightAnalogText)}
        {label(R3Style, R3Text)}
        {label(StartStyle, StartText)}
        {label(SelectStyle, SelectText)}
        {label(LeftAnalogStyle, LeftAnalogText)}
        {label(L3Style, L3Text)}
        {label(DPadStyle, DPadText)}
        </div>
    )
}

export default PadText;
import { execAsync } from "astal"

export default function HyprPicker(){
    const onClick = async () => {
        await execAsync('hyprpicker -a')
    }
    
    return  <button 
        className={"control-center-btn"}
        onClick={onClick}
    >
        <icon icon="color-select-symbolic" />
    </button>
}

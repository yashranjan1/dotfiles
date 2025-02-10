import { execAsync } from "astal"

export default function HyprPicker(){
    const onClick = async () => {
        const color = await execAsync('../scripts/color_picker.sh')
        print(color)
    }
    
    return  <button 
        className={"control-center-btn"}
        onClick={onClick}
    >
        <icon icon="color-select-symbolic" />
    </button>
}

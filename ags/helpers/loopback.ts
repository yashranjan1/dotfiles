import { exec } from "astal"

const run_loopback = (state: boolean) => {
    try {
        exec(`sudo ../scripts/manage_loopback.sh ${state}`)
    }
    catch (error) {
        console.log(error)
    }
}

export default run_loopback;
import { Loader2 } from "lucide-react"

export const Loader = () => {
    return (
        <div className="w-full h-[100vh] bg-black fixed top-0 z-50 bg-opacity-40 flex justify-center items-center">
            <Loader2 className="h-8 w-8 animate-spin" />
        </div>
    )
}

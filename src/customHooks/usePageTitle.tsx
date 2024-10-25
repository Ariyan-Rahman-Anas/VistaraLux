import { useEffect } from "react";

function usePageTitle(title:string) {
    useEffect(() => {
        document.title = title ? `${title} | VistaraLux` : "VistaraLux";
    }, [title]);
}
export default usePageTitle;
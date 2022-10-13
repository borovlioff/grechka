import api from "./config";



export async function getSlides(params = {offset:0, limit : 3 }){
    try {
        const res = await api.get("/slides",{
            params: {...params},
        });

        if(res.status == 200){
            return res;
        }
        
        throw new Error("Server error");
    } catch (error) {
        console.log(error)
        return error;
        
    }
}
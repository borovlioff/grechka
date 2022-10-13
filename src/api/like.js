import api from "./config";



export async function addLike({id}){
    try {
        const res = await api.post(`/slides/${id}/like`);

        return res;
    } catch (error) {
        console.log(error)
        return error;
        
    }
}
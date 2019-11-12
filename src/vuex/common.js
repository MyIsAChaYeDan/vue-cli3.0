export default {
    state: {
        token:'',
        userId:'',
    },
    mutations: {
        changeToken(state,data){ 
            state.token=data;
        },
        setUserId(state,data){
            state.userId=data;
        }
    }
}

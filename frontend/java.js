const url = "http://localhost:3000/users";
const vm = new Vue({
    el: "#people",
    data: {
        results: [],
        n_object: {
            first_name: null,
            last_name: null,
            rank: null, 
            avatar: null,
        },
    },
    mounted() {
        axios.get(url).then(res => {
            this.results = res.data;
        });
    },
    
    methods: {
        async del(index) {
            let id = this.results[index].id
            this.results.splice(index, 1)
            alert(`Player with ID: ${id} was deleted`)
            await axios.delete("http://localhost:3000/users/" + id)
        },
        async postttt(){
            //alert(this.n_object.first_name)
            //alert(this.n_object.last_name)
            //alert(this.n_object.rank)
            //alert(this.n_object.avatar)
            //let obj = JSON.stringify(n_object)
            axios.post(url,this.n_object).then(res => {
                console.log(res);
            })
        }
    }
});

const url = "http://localhost:3000/users";
const vm = new Vue({
    el: "#people",
    data: {
        results: [],
        n_object: {
            first_name: null,
            last_name: null,
            avatar: null,
            wiki: null
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
            axios.post(url,this.n_object).then(res => {
                console.log(res);
            })
        },
        async putRequest(index) {
            let id = this.results[index].id;
            var parentDOM = document.getElementById("people");
            let inputs = parentDOM.children[index].getElementsByClassName("change_form")[0].getElementsByTagName("input");
            var tempObj = {
                first_name: inputs[0].value,
                last_name: inputs[1].value,
                avatar: inputs[2].value,
                wiki: inputs[3].value
            };
            console.log(tempObj)
            await axios.put(url + "/" + id, tempObj)
            .then(res => {
                alert("Вы изменили информацию. ПОЗДРАВЛЯЕМ!")
                location.reload();
            })
            .catch(function (error) {
                alert(error);
            });
        },
    }
});

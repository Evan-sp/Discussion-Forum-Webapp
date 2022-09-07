<template>
    <sui-form  style="margin-top: 20px;" @submit.prevent="handleSubmit">
    <sui-input type="text" v-model="username" placeholder="name" style="margin: 5px"/><br/>
    <sui-input type="text" v-model="password" placeholder="name" style="margin: 5px"/><br/>
    <sui-button type="submit" style="margin: 5px">Submit</sui-button>
  </sui-form>
</template>

<script>
export default {
    data() {
        return {
            username: '',
            password: ''
        }
    },
    methods: {
        handleSubmit: function(){
            axios.post("http://localhost:5000/admin/login", {username: this.username, password: this.password, userId: $cookies.get('id')})
            .then(response => {
                console.log(response.data);
            });
        }
    }
}
</script>

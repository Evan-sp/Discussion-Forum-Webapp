<template>
    <div>
        <a style="cursor: pointer; margin-left: 10px" v-on:click="showForm">Create Post</a>
        <sui-form style="margin-top: 10px"  v-if="formVisible"  @submit.prevent="handleSubmit" >
            <sui-input type="text" v-model="thread.name" placeholder="name" style="margin: 5px; " /><br/>
            <sui-input type="text" v-model="thread.subject" placeholder="subject" style="margin: 5px; width: 100%" /><br/>
            <textarea @keydown.tab.prevent type="text" v-model="thread.comment" style="margin: 5px" placeholder="comment..."/>
            <sui-button type="submit" style="margin: 5px">Submit</sui-button>
            <transition name="fade">
            <sui-message
                negative
                v-if="errorVisible"
                content="Input is empty"
                dismissable
                @dismiss="handleDismiss"
            />
            </transition>
        </sui-form>
    </div>
</template>

<script>
export default {
    data() {
        return{
           thread: {
               name: '',
               subject: '',
               comment: '',
           },
           errorVisible: false,
           formVisible: false
        }
    },
    mounted() {
        if($cookies.get('name') != null)
            this.thread.name = $cookies.get('name');
    },
    methods: {
        showForm(){
            this.formVisible = !this.formVisible;
        },
        handleDismiss() {
            this.errorVisible = false;
        },
        handleSubmit() {

            if(this.thread.subject == '' || this.thread.comment == '') {
                this.errorVisible = true;
                return;
            }

            $cookies.set('name', this.thread.name);

            axios.post('http://localhost:5000/threads/post', {
                name: this.thread.name,
                subject: this.thread.subject,
                comment: this.thread.comment,
                userId: $cookies.get('id'),
                userColor: $cookies.get('color')
            })
            this.$router.go()
        },


    }
}
</script>


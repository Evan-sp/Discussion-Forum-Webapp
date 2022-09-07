<template>
  <div> 
  <a style="cursor: pointer;" v-on:click="showForm">[Reply]</a>
  <sui-form  style="margin-top: 20px;" @submit.prevent="handleSubmit" v-if="formVisible">
    <sui-input type="text" v-model="comment.name" placeholder="name" style="margin: 5px"/><br/>
    <textarea @keydown.tab.prevent id="commentInput" type="text" v-model="comment.text" placeholder="comment..." style="margin: 5px"/>
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
           comment: {
               name: '',
               text: ''
           },
           errorVisible: false,
           formVisible: false
        }
    },
    mounted() {
        if($cookies.get('name') != null)
            this.comment.name = $cookies.get('name');
    },
    methods: {
        handleDismiss() {
            this.errorVisible = false;
        },  
        handleSubmit() {

            if(this.comment.text == '') {
                this.errorVisible = true;
                return;
            }

            $cookies.set('name', this.comment.name);

            axios.put('http://localhost:5000/threads/' + this.$route.params.id, {
                name: this.comment.name,
                text: this.comment.text,
                userId: $cookies.get('id'),
                userColor: $cookies.get('color')
            })
            this.$router.go()
        },
        showForm(){
            this.formVisible = !this.formVisible;
        },
        quote(text, id){
            this.formVisible = true;
            this.comment.text += '[quote]\n    [from]' + id + '[/from]' + ': ' + text + '\n[/quote]\n';
        }
    }
}
</script>



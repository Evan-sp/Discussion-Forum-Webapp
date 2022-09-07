<template>
<div style="background-color: #fafafb; padding: 15px" >
    <portal-target name="semantic-ui-vue"></portal-target>
    <div style="margin-bottom: 50px"> 
    <div class="post" id="post1">
        <div class="header">
            <p  class="name" style="display: inline-block; color: #007d9c; font-weight: bold;">{{thread.user.name}}</p>
            <p style="float: right; margin-right: 10px; color: #8c8c8c;">#1</p>
            <p style="display: inline-block; color: #8c8c8c; font-size: 0.8em; margin-left: 5px">{{ timeSince(thread.date)}} ago</p>
        </div>
        <div class="post-content">
            <sui-label size="tiny" style="float: right; cursor: pointer" v-on:mousedown="quote(thread.comment, 1)">Quote</sui-label>
            <h1>{{thread.subject}}</h1>
            <p style="font-size: 1.1em">{{thread.comment}}</p>
        </div> 
    </div>

    <div class="post"  v-for="comment in thread.comments" v-bind:id="'post' + comment.id">
        <div class="header">
            <p  class="name" style="color: #007d9c; font-weight: bold; margin-left: 10px">{{comment.user.name}}</p>
            <p  style="float: right; margin-right: 10px; font-size: 0.9em; margin-top: 2px; color: #8c8c8c;">#{{comment.id}}</p>
            <p style="display: inline-block; color: #8c8c8c; font-size: 0.8em; margin-left: 5px">{{ timeSince(comment.date)}} ago</p>
        </div>
        <div class="post-content">
            <sui-label size="tiny" style="float: right; cursor: pointer" v-on:mousedown="quote(comment.text, comment.id)">Quote</sui-label>
            <p style="font-size: 1.1em;" v-html="comment.html" ></p>
        </div>
    </div>
    <commentForm style="margin-top: 20px"  ref="cFormRef"></commentForm>
    </div>
    <sui-segment id="popup" raised style="position: fixed; display: none" > 
        <div style="" v-html="htmlT"></div>
    </sui-segment>
</div>
</template>
<script>
import cForm from './CommentInput';

export default {
    components: {
        "commentForm": cForm,
    },
    data() {
        return {
            thread: {},
            htmlT: '',
        }
    },
    created() {
        this.fetchData();
    },
    updated() {
            var quoteFroms = document.getElementsByClassName('reply-quote-from');
            for(var i  = 0; i < quoteFroms.length; i++){

                const q = quoteFroms[i].innerHTML;

                quoteFroms[i].onmouseover = (e) => this.quoteHover(e, q);
                quoteFroms[i].onmouseout = () => this.quoteLeave(q);

            }
    },
    mounted() {
    },
    methods: {
        fetchData(){
            axios.get("http://localhost:5000/threads/" + this.$route.params.id)
            .then(response => {this.thread = response.data.thread})
        },
        quote: function (text, id) {
           var selected = window.getSelection().toString();
           console.log(selected);
           if(selected != "") text = selected;
           this.$refs.cFormRef.quote(text, id);
        },
        getSelectionText: function() {
            var text = "";
            if (window.getSelection) {
                text = window.getSelection().toString();
            } else if (document.selection && document.selection.type != "Control") {
                text = document.selection.createRange().text;
            }
            console.log(text);
        },
        quoteHover: function(e, id){
            document.getElementById('popup').style.display = '';

            var x = e.clientX,
            y = e.clientY;
            document.getElementById('popup').style.top = (y + 20) + 'px';
            document.getElementById('popup').style.left = (x + 20) + 'px';

            this.htmlT = document.getElementById('post' + id).innerHTML;
            document.getElementById('post' + id).style.backgroundColor = '#e7eefe';
        },
        quoteLeave: function(id){
            document.getElementById('popup').style.display = 'none';
            document.getElementById('post' + id).style.backgroundColor = '';
        },
        timeSince: function(date) {

            var seconds = Math.floor((new Date() - date) / 1000);

            var interval = Math.floor(seconds / 31536000);

            if (interval > 1) {
                return interval + " years";
            }
            interval = Math.floor(seconds / 2592000);
            if (interval > 1) {
                return interval + " months";
            }
            interval = Math.floor(seconds / 86400);
            if (interval > 1) {
                return interval + " days";
            }
            interval = Math.floor(seconds / 3600);
            if (interval > 1) {
                return interval + " hours";
            }
            interval = Math.floor(seconds / 60);
            if (interval > 1) {
                return interval + " minutes";
            }
            return Math.floor(seconds) + " seconds";
        }
    },
    computed: {

    }
}
</script>

<style>
.reply-quote{
    color: #6b95f5;
    margin-left: 10px;
}
.reply-quote-from{
    color: #cddbfc;
    display: inline;
    cursor: pointer;
}
.reply-quote-from:hover{
    color: #6b95f5;
}
.name{
    color: #a7a7a7;
    display: inline-block;
}
.popup{

}
.header{
    border-width: 0px; 
    border-style: solid; 
    border-color: #dfdfdf; 
    background-color: #e0ebf5; 
    padding: 3px; 
    height: 30px;
    border-radius: 3px;
}
.post{
    margin-bottom: 10px; 
    box-shadow: 0 2px 2px -2px rgba(0, 0, 0, 0.19);
}
.post-content{
    margin-top: 3px;
    border-width: 1px; 
    border-style: solid;
    border-radius: 3px; 
    padding: 15px; 
    border-color: #dfdfdf; 
}
</style>

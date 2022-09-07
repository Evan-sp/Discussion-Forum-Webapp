<template>
    <div id="home" style="background-color: #fafafb; padding: 15px">
        <div style="margin-bottom: 20px">
                <threadInput></threadInput>
        </div>

          <sui-dropdown
                placeholder="sort by"
                selection
                :options="options"
                v-model="soryBy"
                v-on:click="sortThreads"
            />
        <sui-table celled striped>
            <sui-table-body >
                <sui-table-row v-for="thread in threads.slice().reverse()">
                    <sui-table-cell>
                        <router-link :to="{name: 'thread', params: {id: thread.id} }" style="font-size: 1.2em">{{thread.subject}}</router-link>
                        <p style="color: #8c8c8c">{{ thread.comment | truncate(100, '...') }}</p>
                        <sui-button v-if="isAdmin" @click="deleteThread(thread.id)" size="mini" color="red">Remove</sui-button>
                    </sui-table-cell>
                    <sui-table-cell collapsing>
                       <p  class="name" style="display: inline-block; color: #007d9c; font-weight: bold;">{{thread.user.name}}</p>
                    </sui-table-cell>
                    <sui-table-cell collapsing text-align="right">
                       <p style="display: inline-block; color: #8c8c8c; font-size: 0.8em; margin-left: 5px">Uploaded: {{ timeSince(thread.date)}} ago</p><br/>
                       <p style="display: inline-block; color: #8c8c8c; font-size: 0.8em; margin-left: 5px">Last updated: {{ timeSince(thread.lastUpdate)}} ago</p><br/>
                        <p style="display: inline-block" >replies:</p><p style="display: inline-block; margin-left: 10px">{{thread.comments.length}}</p>
                    </sui-table-cell>
                </sui-table-row>
            </sui-table-body>
        </sui-table>
    </div>
</template>

<script>
import Input from './components/Thread/ThreadInput';

export default {
    components: {
        "threadInput": Input
    },
    data() {
        return {
            threads: [],
            soryBy: null,
            isAdmin: false,
            options: [{
                text: 'Upload',
                value: 'upload',
            }, {
                text: 'Update',
                value: 'update',
            }],
        }
    },
    mounted() {
        axios.post("http://localhost:5000/threads/", 
             {userId: $cookies.get('id')})
        .then(response => {
            this.threads = response.data.threads,
            this.isAdmin = response.data.isAdmin
        });
    },
    filters: {
        truncate: function (text, length, suffix) {
            if (text.length > length) {
                return text.substring(0, length) + suffix;
            } else {
                return text;
            }
        },
    },
    methods: {
        sortThreads: function(){
            if(this.soryBy == 'update')
                this.threads = this.threads.sort(this.byUpdate);
            else if(this.soryBy == 'upload')
                this.threads = this.threads.sort(this.byUpload);
        },
        byUpdate: function(a, b){
            if ( a.lastUpdate < b.lastUpdate ){
                return -1;
            }
            if ( a.lastUpdate > b.lastUpdate ){
                return 1;
            }
            return 0;
        },
        byUpload: function(a, b){
            if ( a.date < b.date ){
                return -1;
            }
            if ( a.date > b.date ){
                return 1;
            }
            return 0;
        },
        deleteThread: function(id){
           axios.delete("http://localhost:5000/threads/" + id).then(() => {
               this.threads.splice(id, 1);
           });
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
    }
}
</script>
<style>

</style>

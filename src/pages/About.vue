<template>
    <div class="about"></div>
</template>

<script>
import Axios from "axios";
export default {
    mounted() {
      console.log("???");
        Axios.get("http://127.0.0.1:9527/DSCF2022.JPG", {
            responseType: "arraybuffer",
            onDownloadProgress: function(progressEvent) {
                console.log(progressEvent);
            }
        }).then(res=>{
          console.log(res);
        }).catch(err=>{
          console.log(err);
        });
    }
};
</script>

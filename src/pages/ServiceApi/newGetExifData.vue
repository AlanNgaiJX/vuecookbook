<template>
    <div id="newGetExifData">
        <button class="btn" @click="chooseImage">选择图片</button>
        <!-- <div class="shootime" v-text="shootTime"></div> -->
        <div class="output" v-if="output">
            <div class="ouputItem" v-for="(item, key) in output" :key="key" v-text="item"></div>
        </div>
        <!-- <input type="text" v-model="base64str"><button @click="getFromStr">getFromStr</button> -->
        <input
            type="file"
            id="newGetExifData_fileInput"
            v-show="false"
            @change="handleInputChange3"
        />
    </div>
</template>

<script>
import exifr from "exifr";
import MP4Box from "mp4box";
import HEICexif from "@/assets/js/exif-heic.js";

export default {
    name: "newGetExifData",
    data() {
        return {
            shootTime: "???",
            output: [],
            base64str: ""
        };
    },
    methods: {
        chooseImage() {
            var clickEvent = new MouseEvent("click");
            var input = document.getElementById("newGetExifData_fileInput");
            input.dispatchEvent(clickEvent);
        },

        handleInputChange(e) {
            var file = e.target.files[0];
            var that = this;
            exifr.parse(file).then(output => {
                console.log(output);
                that.output = output;
            });
        },

        handleInputChange2(e) {
            var file = e.target.files[0];
            var fileReader = new FileReader();
            fileReader.readAsArrayBuffer(file);
            fileReader.onload = () => {
                var mp4boxfile = MP4Box.createFile();
                mp4boxfile.onError = function(e) {};
                mp4boxfile.onReady = function(info) {
                    console.log(info);
                };
                var buffer = fileReader.result;
                buffer.fileStart = 0;
                mp4boxfile.appendBuffer(buffer);
                mp4boxfile.flush();
            };
        },

        handleInputChange3(e) {
            // if (e.target.files[0].name.toLowerCase().endsWith(".heic")) {
                this.output.push(`${e.target.files[0].name}`)
                var reader = new FileReader();

                reader.onload = () => {
                    var tags = HEICexif.findEXIFinHEIC(reader.result);
                    var DateTime = tags["DateTime"];
                    var DateTimeDigitized = tags["DateTimeDigitized"];
                    var DateTimeOriginal = tags["DateTimeOriginal"];


                    this.output.push(`DateTime:${DateTime}`);
                    this.output.push(`DateTimeDigitized:${DateTimeDigitized}`);
                    this.output.push(`DateTimeOriginal:${DateTimeOriginal}`);
                };

                reader.readAsArrayBuffer(e.target.files[0]);
            // }else{
            //     // alert("ain't a heic photo")
            //                         this.output.push(`不是heic照片`);

            // }
        },

        getFromStr() {
            var that = this;

            exifr.parse(this.base64str).then(output => {
                console.log(output);
                that.output = output;
            });
        }
    }
};
</script>

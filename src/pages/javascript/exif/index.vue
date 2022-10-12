<template>
    <div>
        <button @click="testBasicExif">test basic exif</button>
        <button @click="testBasicExif">test improve exif</button>
    </div>
</template>

<script>
import { result } from "lodash";
import BasicExif from "./basicExif.js";
import ImproveExif from "./improveExif";
import FujifilmExif from "./fujifilmExif";
const img1 = require("@/assets/image/test/DSCF0209.JPG");
// WhiteBalanceFineTune 100 1500 -2 -4       -40 -80
// WhiteBalanceFineTune 100 1500 0 0          0 0
// WhiteBalanceFineTune 100 3000 0 0         0 0

const img0 = require("@/assets/image/testWB/DSCF1158.JPG"); // 100 5600
const img11 = require("@/assets/image/testWB/DSCF1159.JPG"); // 100 5600
const img22 = require("@/assets/image/testWB/DSCF1160.JPG");
const img33 = require("@/assets/image/testWB/DSCF1161.JPG");
const img44 = require("@/assets/image/testWB/DSCF1162.JPG");
const img55 = require("@/assets/image/testWB/DSCF1163.JPG");
const img66 = require("@/assets/image/testWB/DSCF1164.JPG");
const img77 = require("@/assets/image/testWB/DSCF1165.JPG");
const img88 = require("@/assets/image/testWB/DSCF1166.JPG");
const img99 = require("@/assets/image/testWB/DSCF1167.JPG");

const img888 = require("@/assets/image/testWB/DSCF1197.JPG");

export default {
    name: "exif",
    methods: {
        getImage(url) {
            return new Promise(resolve => {
                const image = new Image();
                image.src = url;
                image.onload = () => {
                    resolve(image);
                };
            });
        },
        testBasicExif() {
            this.getImage(img99).then(image => {
                new BasicExif(image).then(result => {
                    console.log(result);
                });
            });
        },
        testImproveExif() {
            // new ImproveExif({
            //   src: "https://alanngai1996.xyz/screenshot/1591954406051-178901ba-4f7c-4f1f-8e0a-74a552505776.png"
            // }).then(result=>{
            //   console.log(result);
            // })
            // this.getImage(img99).then(image => {
            //     new ImproveExif(image).then(result => {
            //         console.log(result);
            //     });
            // });

            this.getImage(img1).then(image => {
                new FujifilmExif(image).then(result => {
                    console.log(result);
                });
            });
        }
    },
    mounted() {
        this.testImproveExif();
        // this.testBasicExif();
    }
};
</script>

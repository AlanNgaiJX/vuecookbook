<template>
    <div id="testWebAudio">
        <button @click="playNetWorkAudio">播放网络音频</button>
        <button @click="select('fileInput')">播放本地音频</button>
        <button @click="select('fileInput2')">选择两个音频</button>
        <button @click="playAudio(decodeAudioDatas[0])">播放音频1</button>
        <button @click="playAudio(decodeAudioDatas[1])">播放音频2</button>
        <button @click="cutAudio2s">裁切两秒音频</button>
        <button @click="merge2Audio">合并两个音频</button>
        <button @click="test2">test2</button>
        <button @click="test3">test3</button>
        <button @click="testBiquadFilterNode">testBiquadFilterNode</button>
        <button @click="testOscillator">testOscillator</button>
        <button @click="metronomeSound1">metronomeSound1</button>
        <button @click="getSoundWithSpeed(120)">getSoundWithSpeed</button>

        <input type="file" id="fileInput" accept="audio/mpeg" @change="selectFile" v-show="false" />
        <input
            type="file"
            id="fileInput2"
            accept="audio/mpeg"
            multiple="multiple"
            @change="selectFiles"
            v-show="false"
        />
        <audio controls></audio>
    </div>
</template>

<script>
import toWav from "audiobuffer-to-wav";
import { saveAs } from "file-saver";

export default {
    name: "testWebAudio",
    data() {
        return {
            num: 0,
            decodeAudioDatas: {}
        };
    },
    methods: {
        // 【 播放本地音频 】
        selectFile(e) {
            var file = e.target.files[0];

            this.readMp3File(file).then(decodedBuffer => {
                this.playAudio(decodedBuffer);
            });
        },

        // 【选择两个本地音频】
        selectFiles(e) {
            var files = [];
            for (let i = 0; i < 2; i++) {
                //选取两个
                files.push(e.target.files[i]);
            }

            files.forEach((file, index) => {
                this.readMp3File(file).then(decodeAudioData => {
                    this.decodeAudioDatas[index] = decodeAudioData;
                });
            });
        },

        // 【 播放网络音频 】
        playNetWorkAudio() {
            const URL = "http://mmdesign.oss-cn-qingdao.aliyuncs.com/mv/media/gentle.mp3";

            this.getBufferByUrl(URL).then(buffer => {
                this.playAudio(buffer);
            });
        },

        // 网络请求音频地址，获取音频编码文件流
        getBufferByUrl(url) {
            return new Promise((resolve, reject) => {
                const request = new XMLHttpRequest();
                request.open("GET", url, true);
                request.responseType = "arraybuffer";

                request.onload = () => {
                    const audioContext = new AudioContext();
                    audioContext.decodeAudioData(request.response, buffer =>
                        buffer ? resolve(buffer) : reject("decoding error")
                    );
                };

                request.onerror = error => reject(error);
                request.send();
            });
        },

        // 触发fileInput
        select(id) {
            var fileInput = document.getElementById(id);
            var clickEvent = document.createEvent("MouseEvents");
            clickEvent.initEvent("click", true, true);
            clickEvent.stopPropagation();
            fileInput.dispatchEvent(clickEvent);
        },

        // 读取本地mp3文件,返回解码音频
        readMp3File(file) {
            return new Promise((resolve, reject) => {
                var fileReader = new FileReader();
                fileReader.readAsArrayBuffer(file);
                fileReader.onload = e => {
                    var encodedBuffer = e.currentTarget.result;
                    var audioContext = new AudioContext();
                    audioContext
                        .decodeAudioData(encodedBuffer)
                        .then(decodedBuffer => {
                            resolve(decodedBuffer);
                        })
                        .catch(err => {
                            reject(err);
                        });
                };
            });
        },

        // 播放音频，入参为已解码的音频
        playAudio(decodedBuffer) {
            console.log("音频长度:", decodedBuffer.length);
            console.log("音频时长", decodedBuffer.duration);
            console.log("音频采样率", decodedBuffer.sampleRate);

            const audioContext = new AudioContext();
            const source = audioContext.createBufferSource();
            source.buffer = decodedBuffer;
            source.connect(audioContext.destination);
            source.start();
        },

        //裁切音频
        cutAudio(originalAudioBuffer, start, end) {
            var sampleRate = originalAudioBuffer.sampleRate;
            var numberOfChannels = originalAudioBuffer.numberOfChannels;
            const lengthInSamples = (end - start) * sampleRate;

            // offlineAudioContext相对AudioContext更加节省资源
            const offlineAudioContext = new OfflineAudioContext(
                numberOfChannels,
                numberOfChannels,
                sampleRate
            );

            // 存放截取的数据
            const cutAudioBuffer = offlineAudioContext.createBuffer(
                numberOfChannels,
                lengthInSamples,
                sampleRate
            );

            // 存放截取后的数据
            const newAudioBuffer = offlineAudioContext.createBuffer(
                numberOfChannels,
                originalAudioBuffer.length - lengthInSamples,
                originalAudioBuffer.sampleRate
            );

            for (let channel = 0; channel < numberOfChannels; channel++) {
                var cutChannelData = cutAudioBuffer.getChannelData(channel);
                var newChannelData = newAudioBuffer.getChannelData(channel);
                var originalChannelData = originalAudioBuffer.getChannelData(channel);

                // 切割操作
                const beforeData = originalChannelData.subarray(0, start * sampleRate - 1);
                const midData = originalChannelData.subarray(
                    start * sampleRate,
                    end * sampleRate - 1
                );
                const afterData = originalChannelData.subarray(end * sampleRate);

                cutChannelData.set(midData);

                if (start > 0) {
                    newChannelData.set(beforeData);
                    newChannelData.set(afterData, start * sampleRate);
                } else {
                    newChannelData.set(afterData);
                }
            }

            return {
                // 截取后的数据
                newAudioBuffer,
                // 截取部分的数据
                cutSelection: cutAudioBuffer
            };
        },

        // 拼接音频
        mergeAudio(queueAudioBuffer) {
            var totalBufferLength = 0;
            var sampleRate = null;
            var numberOfChannels = null;

            queueAudioBuffer.forEach(audioBuffer => {
                totalBufferLength += audioBuffer.length;
                if (sampleRate === null) sampleRate = audioBuffer.sampleRate;

                if (sampleRate !== audioBuffer.sampleRate) sampleRate = false;

                if (numberOfChannels === null) numberOfChannels = audioBuffer.numberOfChannels;

                if (numberOfChannels != audioBuffer.numberOfChannels) numberOfChannels = false;
            });

            if (!sampleRate || !numberOfChannels) {
                alert("所选片段采样率 或 声道数 不一致，无法拼接");
                return;
            }

            const offlineAudioContext = new OfflineAudioContext(
                numberOfChannels,
                numberOfChannels,
                sampleRate
            );

            var resultBuffer = offlineAudioContext.createBuffer(
                numberOfChannels,
                totalBufferLength,
                sampleRate
            );

            var index = 0;
            queueAudioBuffer.forEach(audioBuffer => {
                for (let channel = 0; channel < numberOfChannels; channel++) {
                    var resultBufferChannelData = resultBuffer.getChannelData(channel);
                    var audioBufferChannelData = audioBuffer.getChannelData(channel);

                    resultBufferChannelData.set(audioBufferChannelData, index);
                }
                index += audioBuffer.length;
            });

            return {
                resultBuffer
            };
        },

        cutAudio2s() {
            var cutRes = this.cutAudio(this.decodeAudioDatas[0], 0, 1);
            this.playAudio(cutRes.cutSelection);
        },

        merge2Audio() {
            var mergeRes = this.mergeAudio([this.decodeAudioDatas[0], this.decodeAudioDatas[1]]);
            // this.playAudio(mergeRes.resultBuffer);
            this.buffer2WavDownload(mergeRes.resultBuffer);
            console.log("开始播放");
        },

        // buffer转wav并下载
        buffer2WavDownload(buffer) {
            var wav = toWav(buffer);
            var blob = new window.Blob([new DataView(wav)], {
                type: "audio/wav"
            });

            var url = window.URL.createObjectURL(blob);
            var anchor = document.createElement("a");
            document.body.appendChild(anchor);
            anchor.href = url;
            anchor.download = "audio.wav";
            anchor.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(anchor);
        },

        test2() {
            var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

            // Stereo
            var channels = 2;
            // Create an empty two second stereo buffer at the
            // sample rate of the AudioContext
            var frameCount = audioCtx.sampleRate * 2.0; //创建两秒的音频

            var myArrayBuffer = audioCtx.createBuffer(2, frameCount, audioCtx.sampleRate);

            // Fill the buffer with white noise;
            //just random values between -1.0 and 1.0
            var a = Math.random() * 2 - 1;

            for (var channel = 0; channel < channels; channel++) {
                // This gives us the actual ArrayBuffer that contains the data
                var nowBuffering = myArrayBuffer.getChannelData(channel);
                for (var i = 0; i < frameCount; i++) {
                    // Math.random() is in [0; 1.0]
                    // audio needs to be in [-1.0; 1.0]
                    // nowBuffering[i] = Math.random() * 2  - 1;
                    nowBuffering[i] = a;
                    // nowBuffering[i] = ;
                }
            }

            // Get an AudioBufferSourceNode.
            // This is the AudioNode to use when we want to play an AudioBuffer
            var source = audioCtx.createBufferSource();
            // set the buffer in the AudioBufferSourceNode
            source.buffer = myArrayBuffer;
            // connect the AudioBufferSourceNode to the
            // destination so we can hear the sound
            source.connect(audioCtx.destination);
            // start the source playing
            source.start();
        },

        test3() {
            const URL = "http://mmdesign.oss-cn-qingdao.aliyuncs.com/mv/media/gentle.mp3";
            const audioContext = new AudioContext();
            const source = audioContext.createBufferSource();

            const gainNode = audioContext.createGain();
            source.connect(gainNode);
            gainNode.gain.value = 1; //0-1
            gainNode.connect(audioContext.destination);

            this.getBufferByUrl(URL).then(buffer => {
                source.buffer = buffer;
                source.start();
            });
        },

        // 【低通滤波器】
        testBiquadFilterNode() {
            var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

            //set up the different audio nodes we will use for the app
            var analyser = audioCtx.createAnalyser();
            var distortion = audioCtx.createWaveShaper();
            var gainNode = audioCtx.createGain();
            var biquadFilter = audioCtx.createBiquadFilter();
            var convolver = audioCtx.createConvolver();

            // connect the nodes together
            const source = audioCtx.createBufferSource();
            source.connect(biquadFilter);
            biquadFilter.connect(audioCtx.destination);

            biquadFilter.type = "lowshelf";
            biquadFilter.frequency.setValueAtTime(1000, audioCtx.currentTime);
            biquadFilter.gain.setValueAtTime(25, audioCtx.currentTime);

            this.getBufferByUrl(
                "http://mmdesign.oss-cn-qingdao.aliyuncs.com/mv/media/gentle.mp3"
            ).then(buffer => {
                source.buffer = buffer;
                source.start();
                console.log("开始播放");
            });
        },

        testOscillator() {
            // 创建音频上下文
            var audioCtx = new AudioContext();
            // 创建音调控制对象
            var oscillator = audioCtx.createOscillator();
            // 创建音量控制对象
            var gainNode = audioCtx.createGain();
            // 音调音量关联
            oscillator.connect(gainNode);
            // 音量和设备关联
            gainNode.connect(audioCtx.destination);
            // 音调类型指定为正弦波
            oscillator.type = "sine";
            // 设置音调频率
            oscillator.frequency.value = 196.0;
            // 先把当前音量设为0
            gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
            // 0.01秒时间内音量从刚刚的0变成1，线性变化
            gainNode.gain.linearRampToValueAtTime(1, audioCtx.currentTime + 0.01);
            // 声音走起
            oscillator.start(audioCtx.currentTime);
            // 1秒时间内音量从刚刚的1变成0.001，指数变化
            gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1);
            // 1秒后停止声音
            oscillator.stop(audioCtx.currentTime + 1);
        },

        metronomeSound1() {
            var audioCtx = new AudioContext();
            var oscillator = audioCtx.createOscillator();
            var gainNode = audioCtx.createGain();
            var analyserNode = audioCtx.createAnalyser();
            var mediaStreamDestination = audioCtx.createMediaStreamDestination();
            var mediaRecorder = new MediaRecorder(mediaStreamDestination.stream);

            var chunks = [];
            mediaRecorder.ondataavailable = function(evt) {
                chunks.push(evt.data);
            };
            mediaRecorder.onstop = function(evt) {
                var blob = new Blob(chunks, { type: "audio/wav" });
                document.querySelector("audio").src = URL.createObjectURL(blob);

                // var url = window.URL.createObjectURL(blob);
                // var anchor = document.createElement("a");
                // document.body.appendChild(anchor);
                // anchor.href = url;
                // anchor.download = "audio.wav";
                // anchor.click();
                // window.URL.revokeObjectURL(url);
                // document.body.removeChild(anchor);
            };

            oscillator.connect(gainNode);
            gainNode.connect(analyserNode);
            analyserNode.connect(mediaStreamDestination);
            analyserNode.connect(audioCtx.destination);

            // 振荡器波形
            oscillator.type = "triangle"; //[ sine正弦波，square方波，triangle三角波，sawtooth锯齿波
            // 振荡器频率
            oscillator.frequency.value = 1600.0;

            var duration = 1000; //100ms
            // 音量变化
            gainNode.gain.setValueAtTime(1, audioCtx.currentTime);
            // gainNode.gain.linearRampToValueAtTime(1, audioCtx.currentTime + 0.01); //0.1秒内，音量从0~1线性变化

            gainNode.gain.exponentialRampToValueAtTime(
                0.01,
                audioCtx.currentTime + duration * 0.001
            ); //1秒内，音量从1~0.01指数变化

            mediaRecorder.start();
            oscillator.start(audioCtx.currentTime);
            oscillator.stop(audioCtx.currentTime + duration * 0.001); //停止声音
            oscillator.addEventListener("ended", () => {
                console.log("stop");
                mediaRecorder.stop();
            });
        },

        getSoundWithSpeed(speed) {
            var timeSignture = 4; //假设是4/4拍
            var audioCtx = new AudioContext();
            var oscillator = audioCtx.createOscillator();
            var gainNode = audioCtx.createGain();
            var analyserNode = audioCtx.createAnalyser();

            oscillator.connect(gainNode);
            gainNode.connect(analyserNode);
            analyserNode.connect(audioCtx.destination);

            var duration = 60000 / 150;
            var count = 0;

            oscillator.type = "triangle";
            oscillator.start(audioCtx.currentTime);

            var beep = function() {
                if (count % timeSignture !== 0) {
                    oscillator.frequency.value = 800.0;
                } else {
                    oscillator.frequency.value = 1600.0;
                }
                gainNode.gain.setValueAtTime(1, audioCtx.currentTime);
                gainNode.gain.setValueAtTime(0, audioCtx.currentTime + duration * 0.001 * 0.1);
                count++;
            };

            beep();
            setInterval(() => {
                beep();
            }, duration);
        }
    },

    mounted() {}
};
</script>

<style lang="scss" scoped>
#testWebAudio {
    button {
        display: block;
    }
}
</style>
